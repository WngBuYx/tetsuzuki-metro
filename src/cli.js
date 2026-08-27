/** 経路計算エンジンの動作確認用 CLI。`node src/cli.js` で実行する。 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildPlan, SEVERITY } from './route.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf-8'));
const db = {
  procedures: load('data/procedures.json'),
  documents:  load('data/documents.json'),
  conditions: load('data/conditions.json'),
  scenarios:  load('data/scenarios.json'),
};
const shinjuku = load('data/municipalities/131041_shinjuku.json');

const yen = n => '¥' + n.toLocaleString('ja-JP');
const bar = (n, ch = '─') => ch.repeat(n);
const head = t => console.log('\n' + '━'.repeat(74) + '\n' + t + '\n' + '━'.repeat(74));

/** 想定利用者 */
const personas = [
  {
    label: '① 高齢の親を亡くした遺族（国保・国民年金・持ち家あり・借金は不明）',
    scenario: 'death',
    // 起算日: 死亡日=8/1。「知った日」も同日と仮定。期限は暦で計算される
    events: { death: new Date('2026-08-01'), known: new Date('2026-08-01'), 'inheritance-known': new Date('2026-08-01'), funeral: new Date('2026-08-03') },
    answers: {
      is_foreign_resident: false, deceased_was_head: true, household_members_15plus: 2,
      insurance: 'kokuho', nenkin_type: 'kokumin', has_real_estate: true,
      possible_debt: 'unknown', age: 82, kaigo_nintei: true,
      has_mynumber_card: true, has_inkan_toroku: true, estate_over_threshold: 'unknown',
      needs_tax_return: false, had_resident_tax: true, has_life_insurance: true,
      received_pension: true, had_dependents: false, was_foreign_resident: false,
      mynumber_linked_to_nenkin: false,
    },
  },
  {
    label: '② 来日1年目の留学生（3か月超・アルバイト予定・在留更新の審査中）',
    scenario: 'arrival',
    answers: {
      is_foreign_resident: true, stay_over_3months: true, has_employer_insurance: false,
      has_employer_pension: false, will_work_part_time: true, age: 24,
      has_mynumber_card: true, renewal_pending_at_card_expiry: true,
      name_or_nationality_changed: false, leaving_japan: false,
    },
  },
  {
    label: '③ 区外へ引っ越す外国人（子どもあり・国保・犬あり）',
    scenario: 'moving',
    answers: {
      is_foreign_resident: true, moving_across_municipality: 'across',
      insurance: 'kokuho', has_children: true, has_mynumber_card: true,
      nenkin_type: 'kokumin', kaigo_nintei: false, has_drivers_license: true,
      has_dog: true, needs_inkan_shomei: false, has_employer_insurance: false,
    },
  },
  {
    label: '④ 何も答えずに開いた人（全問未回答＝不明のまま）',
    scenario: 'death',
    answers: {},
  },
];

for (const p of personas) {
  const plan = buildPlan(db, p.scenario, p.answers, shinjuku, new Date('2026-08-07'), p.events || {});
  head(p.label);
  const c = plan.counts;
  console.log(`経路: ${plan.active.length}駅 （必要${c.required} / 不明${c.maybe} / 通過${c.skip} / 非該当${c.hidden}）`);

  // ---- 取り返しがつかない期限 ----
  const irr = plan.timeline.filter(r => r.kind === 'irreversible' || r.critical);
  if (irr.length) {
    console.log('\n■ 過ぎると取り返しがつかない / 重い期限');
    for (const r of irr) {
      const d = r.windowOpens ? '窓が開く' : (r.days == null ? '条件つき' : `${r.days}日`);
      console.log(`   ${r.kind === 'irreversible' ? '⛔' : '⚠ '} ${d.padEnd(8)} ${r.name.ja}`);
      if (r.consequence) console.log(`       └ ${r.consequence.ja}`);
    }
  }

  // ---- 書類の必要通数 ----
  const needed = plan.documents.filter(d => d.copiesMax > 0 && d.fee);
  if (needed.length) {
    console.log('\n■ 用意する書類（通数）');
    let total = 0, totalMax = 0;
    for (const d of needed.slice(0, 4)) {
      const cnt = d.copiesMax > d.copies ? `${d.copies}〜${d.copiesMax}` : `${d.copies}`;
      const unconfirmed = d.unconfirmedAt.length ? `／要確認${d.unconfirmedAt.length}` : '';
      console.log(`   ${d.name.ja.padEnd(24)} ${cnt.padStart(4)}通  ${yen(d.cost).padStart(8)}` +
                  `  （原本提出${d.submittedAt.length}／提示のみ${d.shownAt.length}${unconfirmed}）`);
      total += d.cost; totalMax += d.costMax;
    }
    console.log(`   ${bar(24)} ${bar(20)}`);
    const totalLabel = totalMax > total ? `${yen(total)}〜${yen(totalMax)}` : yen(total);
    console.log(`   ${'合計'.padEnd(26)}${totalLabel.padStart(8)}`);
    for (const d of needed) {
      if (d.alternative) console.log(`\n   ★ ${d.alternative.message.ja}`);
    }
  }

  // ---- 窓口ごとのまとめ ----
  console.log('\n■ 窓口ごとのまとめ（1回の来庁で片づく単位）');
  for (const g of plan.windows.slice(0, 3)) {
    const jur = g.jurisdictionLabel ? `（${g.jurisdictionLabel}）` : '';
    console.log(`   ${g.authority}${jur}  計${g.total}件` + (g.oneTripPossible && g.depts.length > 1 ? `  ← 1回の来庁で${g.total}件まとめられる` : ''));
    for (const d of g.depts) {
      const tel = d.tel ? `  ${d.tel}` : '';
      console.log(`     ・${(d.dept || d.label)}${tel}  → ${d.stations.length}件`);
      for (const s of d.stations.slice(0, 3)) console.log(`         ${s.name.ja}`);
      if (d.stations.length > 3) console.log(`         …ほか${d.stations.length - 3}件`);
      if (d.restriction) console.log(`         ※ ${d.restriction.slice(0, 60)}…`);
    }
  }

  // ---- 書類の取得に間に合わない罠 ----
  if (plan.traps.length) {
    console.log('\n■ 詰みの警告');
    for (const t of plan.traps) console.log(`   ⚠ ${t.message.ja}`);
  }

  // ---- 時間軸 ----
  console.log('\n■ 時間軸（対数目盛）');
  const scale = d => d == null ? 62 : Math.round(Math.log10(Math.max(d, 1) + 1) * 20);
  for (const r of plan.timeline.slice(0, 8)) {
    const pos = Math.min(scale(r.days), 58);
    const label = r.windowOpens ? r.windowOpens.label.ja
                : r.duration    ? `${r.duration.label.ja} ${r.duration.value}${r.duration.unit === 'year' ? '年' : ''}`
                : r.days == null ? '期限なし' : `${r.days}日`;
    console.log(`   ${' '.repeat(pos)}●  ${label.padEnd(8)} ${r.name.ja.slice(0, 30)}`);
  }
  if (plan.timeline.length > 8) console.log(`   … ほか${plan.timeline.length - 8}駅`);
}

// ---- 全シナリオ横断のサマリ ----
head('全シナリオ 横断サマリ');
for (const s of db.scenarios.scenarios) {
  const plan = buildPlan(db, s.id, {}, shinjuku);
  const kinds = {};
  for (const r of plan.timeline) kinds[r.kind] = (kinds[r.kind] || 0) + 1;
  const top = Object.entries(kinds).sort((a, b) => SEVERITY[a[0]].rank - SEVERITY[b[0]].rank)
    .map(([k, v]) => `${SEVERITY[k].ja}${v}`).join(' / ');
  console.log(`  ${s.id.padEnd(9)}${String(plan.stations.length).padStart(2)}駅  ${top}`);
}
