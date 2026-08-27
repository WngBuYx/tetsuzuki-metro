/**
 * 路線図レンダラ — Mini Metro 風のオクトリニア（0°/45°/90°のみ）作図
 *
 * 地下鉄路線図が路線図に見えるのは、線が水平・垂直・45度しか走らないから。
 * ここでは x=期限までの日数（対数）、y=路線 に配置したうえで、
 * 同じ x に駅が重なるときだけ縦にずらし、その分を 45 度で繋ぐ。
 */

const NS = 'http://www.w3.org/2000/svg';
const el = (name, attrs = {}) => {
  const n = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) if (v != null) n.setAttribute(k, v);
  return n;
};

export const LAYOUT = {
  padL: 96, padR: 300, padT: 64, padB: 84,
  laneH: 78,          // 路線どうしの縦間隔
  stackH: 26,         // 同じ期限の駅を縦にずらす量
  lineW: 11,          // 路線の太さ
  rStation: 9,        // 駅の半径
  rHub: 13,           // 乗換駅
};

/** 期限までの日数 → x。対数目盛。期限なしは右端の専用レーンへ */
export function makeXScale(width) {
  const { padL, padR } = LAYOUT;
  const w = width - padL - padR;
  const maxDays = 1095;                        // 3年
  const lg = d => Math.log10(Math.max(d, 1) + 1);
  const span = lg(maxDays);
  return {
    of(days) {
      if (days == null) return padL + w + 62;  // 「期限なし」レーン
      const clamped = Math.min(Math.max(days, 0), maxDays);
      return padL + (lg(clamped) / span) * w;
    },
    ticks: [0, 7, 14, 30, 90, 180, 365, 1095],
    noDeadlineX: padL + w + 62,
  };
}

/** 2点をオクトリニアに結ぶ（水平 → 45度、または 45度 → 垂直） */
function octoSegment(x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  if (Math.abs(dy) < 0.5) return ` L ${x2} ${y2}`;
  const adx = Math.abs(dx), ady = Math.abs(dy);
  if (adx >= ady) {
    const bendX = x2 - Math.sign(dx) * ady;
    return ` L ${bendX} ${y1} L ${x2} ${y2}`;
  }
  const bendY = y1 + Math.sign(dy) * adx;
  return ` L ${x2} ${bendY} L ${x2} ${y2}`;
}

export function octoPath(points) {
  if (points.length === 0) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    d += octoSegment(points[i - 1].x, points[i - 1].y, points[i].x, points[i].y);
  }
  return d;
}

/**
 * 駅の配置を決める。
 * plan.timeline（期限順）と plan.stations（状態つき）を突き合わせる。
 */
export function layoutStations(plan, lines, xScale, lang = 'ja') {
  const { padT, laneH, stackH } = LAYOUT;
  const lineIndex = new Map(lines.map((l, i) => [l.id, i]));
  const byId = new Map(plan.stations.map(s => [s.id, s]));

  // 描画対象は「必要 / 不明 / 通過」。hidden も薄く残す（自分に不要と分かるのも情報）
  const rows = plan.timeline.map(t => ({ t, s: byId.get(t.id) })).filter(r => r.s);

  // 同じ路線・同じ x に固まる駅を縦にずらす。
  // 「期限なし」は1本の柱に全部集まってしまうので、横にも少し散らす。
  const seen = new Map();
  const nodes = rows.map(({ t, s }) => {
    const li = lineIndex.get(s.line) ?? 0;
    let x = Math.round(xScale.of(t.days));
    const key = `${s.line}:${Math.round(x / 18)}`;
    const n = seen.get(key) ?? 0;
    seen.set(key, n + 1);
    if (t.days == null) x += n * 34;          // 期限なしレーンは階段状に
    const offset = n === 0 ? 0 : (n % 2 === 1 ? 1 : -1) * Math.ceil(n / 2) * stackH;
    return {
      id: s.id,
      station: s,
      row: t,
      line: s.line,
      lineIdx: li,
      x,
      y: Math.round(padT + li * laneH + offset),
      label: s.name[lang] || s.name.ja,
      status: s.status,
      kind: t.kind,
      critical: !!s.critical,
    };
  });

  // hidden も同じ座標系に置く（薄く描くため）
  const placed = new Set(nodes.map(n => n.id));
  for (const s of plan.stations) {
    if (placed.has(s.id) || s.status !== 'hidden') continue;
    const li = lineIndex.get(s.line) ?? 0;
    nodes.push({
      id: s.id, station: s, row: null, line: s.line, lineIdx: li,
      x: Math.round(xScale.noDeadlineX), y: Math.round(padT + li * laneH),
      label: s.name[lang] || s.name.ja, status: 'hidden', kind: 'none', critical: false,
    });
  }
  return nodes;
}

/** 駅マーカーの形。期限の「種類」を形で表す */
function stationShape(node, r, online) {
  const { x, y } = node;
  // 取り返しがつかない → ひし形（警告）
  if (node.kind === 'irreversible') {
    const p = `${x},${y - r - 1} ${x + r + 1},${y} ${x},${y + r + 1} ${x - r - 1},${y}`;
    return el('polygon', { points: p });
  }
  // 請求しないともらえない → 三角
  if (node.kind === 'claim') {
    const p = `${x},${y - r - 1} ${x + r + 1},${y + r * 0.8} ${x - r - 1},${y + r * 0.8}`;
    return el('polygon', { points: p });
  }
  // 事前に済ませる／窓が開く → 四角
  if (node.kind === 'before_action' || node.kind === 'window_opens') {
    return el('rect', { x: x - r, y: y - r, width: r * 2, height: r * 2, rx: 2 });
  }
  return el('circle', { cx: x, cy: y, r });
}

/**
 * 描画本体。
 * @param {SVGElement} svg
 * @param {object} plan          buildPlan の戻り値
 * @param {Array}  lines         procedures.json の lines
 * @param {object} opts          { lang, online, onSelect, width, height }
 */
export function renderMetro(svg, plan, lines, opts = {}) {
  const { lang = 'ja', online = {}, onSelect = () => {} } = opts;
  const width = opts.width || 1480;
  const usedLines = lines.filter(l => plan.stations.some(s => s.line === l.id));
  const height = LAYOUT.padT + usedLines.length * LAYOUT.laneH + LAYOUT.padB;

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', height);
  svg.replaceChildren();

  const xScale = makeXScale(width);
  const nodes = layoutStations(plan, usedLines, xScale, lang);

  const gGrid = el('g', { class: 'mm-grid' });
  const gLines = el('g', { class: 'mm-lines' });
  const gLinks = el('g', { class: 'mm-links' });
  const gStations = el('g', { class: 'mm-stations' });
  const gLabels = el('g', { class: 'mm-labels' });
  svg.append(gGrid, gLines, gLinks, gStations, gLabels);

  // ── 時間目盛 ──────────────────────────────
  const gridTop = LAYOUT.padT - 34;
  const gridBottom = height - LAYOUT.padB + 16;
  for (const d of xScale.ticks) {
    const x = Math.round(xScale.of(d));
    gGrid.append(el('line', { x1: x, y1: gridTop, x2: x, y2: gridBottom, class: 'mm-gridline' }));
    const t = el('text', { x, y: gridTop - 8, class: 'mm-ticklabel' });
    t.textContent = d === 0 ? (lang === 'en' ? 'today' : 'その日') :
      d >= 365 ? `${Math.round(d / 365)}${lang === 'en' ? 'y' : '年'}` :
      d >= 30 ? `${Math.round(d / 30)}${lang === 'en' ? 'mo' : 'か月'}` :
      `${d}${lang === 'en' ? 'd' : '日'}`;
    gGrid.append(t);
  }
  {
    const x = Math.round(xScale.noDeadlineX);
    gGrid.append(el('line', { x1: x, y1: gridTop, x2: x, y2: gridBottom, class: 'mm-gridline mm-gridline-soft' }));
    const t = el('text', { x, y: gridTop - 8, class: 'mm-ticklabel' });
    t.textContent = lang === 'en' ? 'no limit' : '期限なし';
    gGrid.append(t);
  }

  // ── 路線（太い色つきの線）────────────────────
  for (const line of usedLines) {
    // x が同じ駅は y 順に並べる。x だけで並べると同一 x 内で上下に跳ねて
    // ジグザグした線になり、路線図に見えなくなる。
    const pts = nodes
      .filter(n => n.line === line.id && n.status !== 'hidden')
      .sort((a, b) => a.x - b.x || a.y - b.y);
    if (pts.length === 0) continue;

    // 路線名を左端に
    const y0 = LAYOUT.padT + usedLines.indexOf(line) * LAYOUT.laneH;
    const nameEl = el('text', { x: LAYOUT.padL - 18, y: y0 + 5, class: 'mm-linename', fill: line.color });
    nameEl.textContent = line.name[lang] || line.name.ja;
    gLabels.append(nameEl);

    if (pts.length === 1) {
      gLines.append(el('circle', { cx: pts[0].x, cy: pts[0].y, r: LAYOUT.lineW / 2,
        fill: line.color, class: 'mm-linestub' }));
      continue;
    }
    gLines.append(el('path', {
      d: octoPath(pts), stroke: line.color, 'stroke-width': LAYOUT.lineW,
      fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'mm-line',
    }));
  }

  // ── 依存関係＝乗換通路（細い点線）──────────────
  const nodeById = new Map(nodes.map(n => [n.id, n]));
  for (const n of nodes) {
    if (n.status === 'hidden') continue;
    for (const depId of n.station.depends_on || []) {
      const from = nodeById.get(depId);
      if (!from || from.status === 'hidden') continue;
      if (from.line === n.line) continue;   // 同一路線内は本線が繋いでいる
      gLinks.append(el('path', {
        d: octoPath([{ x: from.x, y: from.y }, { x: n.x, y: n.y }]),
        class: 'mm-transfer', fill: 'none',
      }));
    }
  }

  // ── 駅 ────────────────────────────────────
  const lineColor = new Map(usedLines.map(l => [l.id, l.color]));
  const labelQueue = [];
  for (const n of nodes) {
    const cap = online[n.id];
    const isOnline = cap?.mode === 'online';
    const r = n.station.critical ? LAYOUT.rHub : LAYOUT.rStation;

    const g = el('g', {
      class: `mm-station is-${n.status}${n.critical ? ' is-critical' : ''}`,
      tabindex: n.status === 'hidden' ? -1 : 0,
      role: 'button',
      'aria-label': n.label,
    });

    const shape = stationShape(n, r, isOnline);
    shape.setAttribute('class', 'mm-marker');
    shape.setAttribute('stroke', lineColor.get(n.line) || '#2b2b2b');
    g.append(shape);

    // オンラインで完結できる駅は中に点を打つ（Mini Metro の乗換駅の見立て）
    if (isOnline) {
      g.append(el('circle', { cx: n.x, cy: n.y, r: Math.max(3, r - 5),
        class: 'mm-online-dot', fill: lineColor.get(n.line) || '#2b2b2b' }));
    }

    g.addEventListener('click', () => onSelect(n.id));
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(n.id); } });
    gStations.append(g);

    if (n.status === 'hidden') continue;
    labelQueue.push({ n, r });
  }

  // ── 駅名（実測して衝突を避ける）──────────────
  // 文字幅の見積もりは全角・半角が混ざると外す。いったん置いてから
  // getBBox で実寸を測り、空いている段へ動かす。
  const LINE_H = 20;
  // 取り返しがつかない駅を先に確保する（重なるなら他方を動かす）
  labelQueue.sort((a, b) => (b.n.critical ? 1 : 0) - (a.n.critical ? 1 : 0));

  const entries = labelQueue.map(({ n, r }) => {
    const text = n.label.length > 10 ? n.label.slice(0, 9) + '…' : n.label;
    const label = el('text', {
      x: n.x, y: n.y - (r + 9),
      class: `mm-stationlabel${n.critical ? ' is-critical' : ''}`,
    });
    label.textContent = text;
    const title = el('title');
    title.textContent = n.label;
    label.append(title);
    gLabels.append(label);
    return { n, r, label };
  });

  const grow = (b, m = 2) => ({ x1: b.x - m, x2: b.x + b.width + m, y1: b.y - m, y2: b.y + b.height + m });
  const hit = (a, b) => a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
  const placed = [];

  for (const { n, r, label } of entries) {
    const candidates = [-(r + 9), r + 19, -(r + 9 + LINE_H), r + 19 + LINE_H,
                        -(r + 9 + LINE_H * 2), r + 19 + LINE_H * 2,
                        -(r + 9 + LINE_H * 3), r + 19 + LINE_H * 3];
    let chosen = candidates[0], chosenBox = null;
    for (const c of candidates) {
      label.setAttribute('y', n.y + c);
      let box;
      try { box = grow(label.getBBox()); } catch { box = null; }
      if (!box) { chosen = c; break; }
      if (!placed.some(p => hit(box, p))) { chosen = c; chosenBox = box; break; }
      chosenBox = box; chosen = c;   // 全部ぶつかるなら最後の候補で妥協
    }
    label.setAttribute('y', n.y + chosen);
    if (chosenBox) placed.push(chosenBox);
  }

  // ── 今日の縦線 ─────────────────────────────
  const todayX = Math.round(xScale.of(0));
  gGrid.append(el('line', { x1: todayX, y1: gridTop, x2: todayX, y2: gridBottom, class: 'mm-today' }));

  return { nodes, xScale, height };
}
