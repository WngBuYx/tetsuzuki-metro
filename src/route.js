/**
 * てつづきメトロ — 経路計算エンジン
 *
 * 入力: シナリオID + 回答 → 出力: 通る駅、必要な書類の通数、窓口ごとのまとめ、期限の時間軸
 * バックエンド無し・依存ライブラリ無し。回答は一切外部へ送らない。
 */

/* ────────────────────────────────────────────────
 * 1. 条件評価（3値論理）
 *
 * 遺族や来日直後の人に全問回答を強いない。未回答は「不明」として扱い、
 * 駅を消さずにグレーで残す。「自分には不要」と分かることも安心につながるため、
 * 判定できないものを勝手に消さないことを原則とする。
 * ──────────────────────────────────────────────── */

export const YES = 'yes', NO = 'no', UNKNOWN = 'unknown';

const CMP = {
  '==': (a, b) => a === b,
  '!=': (a, b) => a !== b,
  '>=': (a, b) => Number(a) >= Number(b),
  '<=': (a, b) => Number(a) <= Number(b),
  '>':  (a, b) => Number(a) >  Number(b),
  '<':  (a, b) => Number(a) <  Number(b),
};

/** 単項の式（`insurance==kokuho` など）を評価する */
function evalTerm(term, answers) {
  const m = /^([A-Za-z_][A-Za-z0-9_]*)\s*(==|!=|>=|<=|>|<)\s*(.+)$/.exec(term.trim());
  if (!m) throw new Error(`式を解析できません: ${term}`);
  const [, key, op, rawVal] = m;
  if (!(key in answers) || answers[key] === undefined || answers[key] === null) return UNKNOWN;

  let actual = answers[key];
  let expect = rawVal.trim();
  if (expect === 'true')  expect = true;
  else if (expect === 'false') expect = false;
  else if (/^-?\d+(\.\d+)?$/.test(expect)) expect = Number(expect);

  // 選択肢型で「わからない」を選んだ場合は、判定不能として扱う
  if (actual === 'unknown' && typeof expect === 'string') return UNKNOWN;

  return CMP[op](actual, expect) ? YES : NO;
}

/** `a==1 || b==2` / `a==1 && b==2` を含む式を評価する */
export function evalExpr(expr, answers) {
  if (expr.includes('||')) {
    const rs = expr.split('||').map(t => evalTerm(t, answers));
    if (rs.includes(YES)) return YES;              // 1つでも真なら真
    return rs.includes(UNKNOWN) ? UNKNOWN : NO;
  }
  if (expr.includes('&&')) {
    const rs = expr.split('&&').map(t => evalTerm(t, answers));
    if (rs.includes(NO)) return NO;                // 1つでも偽なら偽
    return rs.includes(UNKNOWN) ? UNKNOWN : YES;
  }
  return evalTerm(expr, answers);
}

/** appears_when（AND結合）をまとめて評価する */
function evalAll(exprs, answers) {
  if (!exprs || exprs.length === 0) return YES;    // 条件が無い＝常に必要
  const rs = exprs.map(e => evalExpr(e, answers));
  if (rs.includes(NO)) return NO;
  return rs.includes(UNKNOWN) ? UNKNOWN : YES;
}

/* ────────────────────────────────────────────────
 * 2. 経路の決定
 * ──────────────────────────────────────────────── */

/** 駅の状態: required(必要) / maybe(判定不能) / skip(急行通過) / hidden(不要) */
export function resolveRoute(db, scenarioId, answers = {}) {
  const scenario = db.scenarios.scenarios.find(s => s.id === scenarioId);
  if (!scenario) throw new Error(`未知のシナリオ: ${scenarioId}`);
  const byId = new Map(db.procedures.procedures.map(p => [p.id, p]));

  const stations = [];
  for (const pid of scenario.procedures) {
    const p = byId.get(pid);
    if (!p) throw new Error(`シナリオ ${scenarioId} が未定義の手続を参照: ${pid}`);

    const appears = evalAll(p.appears_when, answers);
    if (appears === NO) { stations.push({ ...p, status: 'hidden' }); continue; }

    // 急行通過（マイナンバー登録済みで年金の死亡届が不要、など）
    const skip = p.skippable_when ? evalAll(p.skippable_when, answers) : NO;
    const status = skip === YES ? 'skip' : (appears === YES ? 'required' : 'maybe');
    stations.push({ ...p, status });
  }
  return { scenario, stations };
}

/** 実際に行く必要のある駅（グレー表示の「不明」も含める） */
export const activeStations = stations =>
  stations.filter(s => s.status === 'required' || s.status === 'maybe');

/* ────────────────────────────────────────────────
 * 3. 書類の必要通数
 *
 * 本サービスの中核。遺族が消耗するのは手続の数ではなく役所への往復回数であり、
 * その最大の原因が「戸籍謄本を何通取ればいいか誰も教えてくれない」こと。
 * requires_detail が submit(原本提出・返却なし)か show(提示のみ・使い回せる)かで
 * 必要通数が決まる。これはグラフの性質から計算でき、一覧表には原理的に出せない。
 * ──────────────────────────────────────────────── */

export function countDocuments(db, stations) {
  const docs = new Map(db.documents.documents.map(d => [d.id, d]));
  const need = new Map();

  for (const s of activeStations(stations)) {
    for (const docId of s.requires || []) {
      if (!need.has(docId)) need.set(docId, { doc: docs.get(docId), submit: [], show: [], unknown: [] });
      // 提出方法が一次情報で未確認の手続は unknown として別勘定にする。
      // 勝手に show 扱いにすると必要通数を過少に見積もり、遺族を出直しさせてしまう。
      const detail = (s.requires_detail || {})[docId];
      const bucket = detail === 'submit' ? 'submit'
                   : (detail === 'show' || detail === 'copy') ? 'show'
                   : 'unknown';
      need.get(docId)[bucket].push(s);
    }
  }

  const result = [];
  for (const [docId, v] of need) {
    if (!v.doc) continue;
    // 最少 = 確認済みの原本提出ぶん（提示のみは1通を使い回す）
    // 最多 = 未確認ぶんが全て原本提出だった場合
    const copiesMin = Math.max(v.submit.length, (v.show.length > 0 || v.unknown.length > 0) ? 1 : 0);
    const copiesMax = Math.max(v.submit.length + v.unknown.length, copiesMin);
    result.push({
      id: docId,
      name: v.doc.name,
      fee: v.doc.fee,
      leadTimeDays: v.doc.lead_time_days ?? 0,
      copies: copiesMin,
      copiesMax,
      cost: (v.doc.fee ?? 0) * copiesMin,
      costMax: (v.doc.fee ?? 0) * copiesMax,
      submittedAt: v.submit,       // 原本を出す＝その分の通数が要る
      shownAt: v.show,             // 提示のみ＝1通を使い回せる
      unconfirmedAt: v.unknown,    // 要確認＝提出方法が一次情報で未確認
      warning: v.doc.warning,
      alternative: v.doc.reusable ? null : suggestAlternative(db, docId, v.submit.length),
    });
  }
  result.sort((a, b) => b.copiesMax - a.copiesMax || b.cost - a.cost);
  return result;
}

/**
 * 「10通4,500円」で終わらせず、代替手段を出す。
 * 法定相続情報一覧図は無料で必要枚数交付され、戸籍謄本の束の提出を置き換えられる
 * ——新宿区の公式ガイドブック自身が推奨している。
 */
function suggestAlternative(db, docId, submitCount) {
  if (docId !== 'koseki-tohon' || submitCount < 3) return null;
  const alt = db.documents.documents.find(d => d.id === 'houtei-sozoku-ichiranzu');
  if (!alt) return null;
  return {
    id: alt.id,
    name: alt.name,
    fee: alt.fee,
    message: {
      ja: `戸籍謄本を${submitCount}通取る代わりに、法定相続情報一覧図（無料・必要枚数交付）を1回取得すれば、${submitCount}回の提出が1回の取得で済みます。`,
      easy: `こせきとうほんを ${submitCount}つう とる かわりに、「ほうてい そうぞく じょうほう いちらんず」を 1かい とれば すみます。ただ です。`,
      en: `Instead of ${submitCount} family-register copies, one free legal-heir information list covers all of them.`,
    },
  };
}

/* ────────────────────────────────────────────────
 * 4. 窓口ごとのまとめ ＝ 路線図でいう「同一駅の乗り換え」
 *
 * 「この4つは同じ日に、同じ建物で片づく」——遺族が本当に知りたいのはこれ。
 * ──────────────────────────────────────────────── */

/** 引っ越しのように「同じ市区町村」でも旧住所地と新住所地で別の役所になる場合の区分 */
export const JURISDICTION = {
  same: { ja: '' },
  old:  { ja: '旧住所地' },
  new:  { ja: '新住所地' },
  both: { ja: '旧住所地・新住所地の両方' },
};

export function groupByWindow(db, stations, municipality = null) {
  const groups = new Map();
  for (const s of activeStations(stations)) {
    const local = municipality?.windows?.[s.id];
    const jur = s.window.jurisdiction ?? 'same';
    const key = jur + '|' + (local?.dept || s.window.label.ja);
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: local?.dept || s.window.label.ja,
        authority: s.window.authority,
        type: s.window.type,
        jurisdiction: jur,
        dept: local?.dept ?? null,
        tel: local?.tel ?? null,
        also: local?.also ?? null,
        restriction: local?.restriction ?? null,
        stations: [],
      });
    }
    groups.get(key).stations.push(s);
  }
  // 同じ機関の中の課をまとめる（1回の来庁で片づく単位）。
  // type ではなく authority で束ねること——民間はどれも type=minkan だが、
  // 郵便局・電力会社・銀行は別々の場所であり、まとめて行けるわけではない。
  // さらに jurisdiction で分けること——転出届（旧住所地）と転入届（新住所地）は
  // 同じ「市区町村」でも別の役所であり、1回の来庁にはまとめられない。
  const byAuthority = new Map();
  for (const g of groups.values()) {
    const k = g.authority + '|' + g.jurisdiction;
    if (!byAuthority.has(k)) {
      byAuthority.set(k, {
        authority: g.authority,
        jurisdiction: g.jurisdiction,
        jurisdictionLabel: JURISDICTION[g.jurisdiction]?.ja ?? '',
        type: g.type,
        depts: [],
        total: 0,
      });
    }
    const b = byAuthority.get(k);
    b.depts.push(g);
    b.total += g.stations.length;
    // 「1回の来庁でまとめられる」と言えるのは同一自治体の庁舎に限る。
    // both（旧・新の両方で手続が要る）はそもそも1回では済まない。
    b.oneTripPossible = b.type === 'kuyakusho' && b.jurisdiction !== 'both';
  }
  return [...byAuthority.values()].sort((a, b) => b.total - a.total);
}

/* ────────────────────────────────────────────────
 * 5. 時間軸
 *
 * 横軸は期限までの日数（対数）。左に密集し右へ広がる分布そのものが
 * 「最初の2週間が地獄で、そのあとは間隔が開く」というメッセージになる。
 * ──────────────────────────────────────────────── */

/**
 * 期限は暦（カレンダー）で計算する。「3か月」は90日ではない。
 * 民法140〜143条の期間計算に倣い、起算日の応当日をもって満了とする
 * （応当日が無い場合＝1/31の1か月後などは月末に丸める）。
 * 末日が閉庁日のときの繰り延べまでは扱わないため、画面には「目安」と明記すること。
 */
export function addCalendar(base, value, unit) {
  const d = new Date(base.getTime());
  if (unit === 'day' || unit == null) { d.setDate(d.getDate() + value); return d; }
  const months = unit === 'year' ? value * 12 : value;
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + months);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return d;
}

/**
 * deadline.from（death=死亡日 / known=知った日 / moving=転居日 …）ごとに起算日を解決する。
 * 準確定申告の4か月は「相続を知った日」から、転入届の14日は「転居日」から——
 * 全てを「今日」から数えると期限を実際より長く見せてしまう。
 * eventDates に該当の日付が無ければ baseDate で仮置きし、assumed=true を返す。
 * UI 側はこのフラグで「起算日は仮置きです」と明示する。
 */
export function computeDue(deadline, baseDate = new Date(), eventDates = {}) {
  if (!deadline || deadline.value == null) return null;
  const from = deadline.from ?? null;
  const known = from != null && eventDates[from] instanceof Date;
  const start = known ? eventDates[from] : baseDate;
  return { due: addCalendar(start, deadline.value, deadline.unit), from, assumed: !known };
}

/** baseDate から期限満了までの残り日数（暦ベース）。時間軸の横位置に使う */
export function daysUntil(deadline, baseDate = new Date(), eventDates = {}) {
  const dd = computeDue(deadline, baseDate, eventDates);
  if (!dd) return null;
  return Math.ceil((dd.due.getTime() - baseDate.getTime()) / 86400000);
}

/** 期限の重さ。irreversible は「過ぎると選択肢が消える」＝最優先 */
export const SEVERITY = {
  irreversible:  { rank: 0, ja: '過ぎると取り返しがつかない', en: 'Cannot be undone' },
  before_action: { rank: 1, ja: '行動の前に済ませる必要がある', en: 'Must be done beforehand' },
  legal:         { rank: 2, ja: '法律で決まった期限',           en: 'Statutory deadline' },
  claim:         { rank: 3, ja: '請求しないともらえない',       en: 'Must be claimed' },
  window_opens:  { rank: 4, ja: 'この時期からしか申請できない', en: 'Application window' },
  practical:     { rank: 5, ja: '早めが望ましい',               en: 'Recommended early' },
  none:          { rank: 6, ja: '期限の定めなし',               en: 'No deadline' },
};

export function timeline(stations, baseDate = new Date(), eventDates = {}) {
  const rows = activeStations(stations).map(s => {
    const dd = computeDue(s.deadline, baseDate, eventDates);
    const days = dd ? Math.ceil((dd.due.getTime() - baseDate.getTime()) / 86400000) : null;
    const kind = s.deadline?.kind ?? 'none';
    return {
      id: s.id, name: s.name, line: s.line, status: s.status,
      days, kind, severity: SEVERITY[kind] ?? SEVERITY.none,
      due: dd?.due ?? null,
      dueFrom: dd?.from ?? null,      // 起算日の種類（death / moving / known …）
      dueAssumed: dd?.assumed ?? null, // true = 起算日が仮置き（「目安」表示にする）
      critical: !!s.critical,
      // 「いつまでに」ではなく「いつから」。満了日の3か月前から申請できる、など。
      // 時間軸では締切ではなく“開いている窓”として描く。
      windowOpens: s.window_opens ?? null,
      // 期限ではなく効果の持続期間（郵便の転送は1年間続く、など）
      duration: s.duration ?? null,
      leadTimeRisk: null,
      consequence: s.consequence_if_missed ?? null,
    };
  });
  rows.sort((a, b) => {
    if (a.days == null) return 1;
    if (b.days == null) return -1;
    return a.days - b.days || a.severity.rank - b.severity.rank;
  });
  return rows;
}

/**
 * 「7日以内の手続なのに、必要書類の取得に7日かかる」という詰みを事前に警告する。
 * 本籍地が遠方だと戸籍謄本の郵送請求に往復1週間前後かかるため、実際に起こりうる。
 */
export function detectLeadTimeTraps(db, stations, baseDate = new Date(), eventDates = {}) {
  const docs = new Map(db.documents.documents.map(d => [d.id, d]));
  const traps = [];
  for (const s of activeStations(stations)) {
    const days = daysUntil(s.deadline, baseDate, eventDates);
    if (days == null) continue;
    for (const docId of s.requires || []) {
      const d = docs.get(docId);
      const lead = d?.lead_time_days ?? 0;
      if (lead > 0 && lead >= days) {
        traps.push({
          station: s, document: d, deadlineDays: days, leadTimeDays: lead,
          message: {
            ja: `「${s.name.ja}」の期限は${days}日ですが、必要な「${d.name.ja}」の取得に最大${lead}日かかります。書類の請求を最優先で始めてください。`,
            en: `"${s.name.en}" is due in ${days} days, but obtaining "${d.name.en}" can take up to ${lead} days. Request the document first.`,
          },
        });
      }
    }
  }
  return traps;
}

/* ────────────────────────────────────────────────
 * 6. まとめ
 * ──────────────────────────────────────────────── */

export function buildPlan(db, scenarioId, answers = {}, municipality = null, baseDate = new Date(), eventDates = {}) {
  const { scenario, stations } = resolveRoute(db, scenarioId, answers);
  const active = activeStations(stations);
  const tl = timeline(stations, baseDate, eventDates);
  return {
    scenario, stations, active,
    counts: {
      total: stations.length,
      required: stations.filter(s => s.status === 'required').length,
      maybe:    stations.filter(s => s.status === 'maybe').length,
      skip:     stations.filter(s => s.status === 'skip').length,
      hidden:   stations.filter(s => s.status === 'hidden').length,
    },
    documents: countDocuments(db, stations),
    windows:   groupByWindow(db, stations, municipality),
    timeline:  tl,
    traps:     detectLeadTimeTraps(db, stations, baseDate, eventDates),
    irreversible: tl.filter(r => r.kind === 'irreversible' || r.critical),
  };
}
