/**
 * てつづきメトロ — 画面制御
 *
 * 状態は URL ハッシュにのみ持つ。サーバーへは一切送らない。
 * 計算は全て src/route.js（Node の CLI と同じコード）に委ねる。
 */
import { buildPlan, SEVERITY } from '../src/route.js?v=2';
import { renderMetro } from './metro.js?v=2';
import { T, pick } from './i18n.js?v=2';

const $ = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];

const state = {
  lang: 'ja',
  scenario: null,
  answers: {},
  eventDates: {},
  showDetailed: false,
  municipality: '131041',   // 自治体ファイル（6桁の団体コード）
  wardCode: '13104',        // 23区ソースマトリクス側は5桁。桁数が違うので別に持つ
};

let db = null, online = null, onlineDoc = null, muni = null, plan = null;

/* ── データ読み込み ─────────────────────────── */
async function loadAll() {
  const j = async p => (await fetch(p)).json();
  const [procedures, documents, conditions, scenarios, onlineCap, shinjuku] = await Promise.all([
    j('data/procedures.json'), j('data/documents.json'),
    j('data/conditions.json'), j('data/scenarios.json'),
    j('data/online_capability.json').catch(() => null),
    j('data/municipalities/131041_shinjuku.json').catch(() => null),
  ]);
  db = { procedures, documents, conditions, scenarios };
  muni = shinjuku;
  onlineDoc = onlineCap;
  online = onlineCap?.wards?.[state.wardCode]?.procedures ?? {};
}

/* ── URL ハッシュ ───────────────────────────── */
function saveHash() {
  const payload = { s: state.scenario, a: state.answers,
    d: Object.fromEntries(Object.entries(state.eventDates).map(([k, v]) => [k, v.toISOString().slice(0, 10)])),
    l: state.lang };
  location.replace('#' + btoa(encodeURIComponent(JSON.stringify(payload))));
}
function loadHash() {
  if (!location.hash || location.hash.length < 2) return false;
  try {
    const p = JSON.parse(decodeURIComponent(atob(location.hash.slice(1))));
    state.scenario = p.s ?? null;
    state.answers = p.a ?? {};
    state.lang = p.l ?? 'ja';
    state.eventDates = Object.fromEntries(Object.entries(p.d ?? {}).map(([k, v]) => [k, new Date(v)]));
    return !!state.scenario;
  } catch { return false; }
}

/* ── 画面切替 ─────────────────────────────── */
function show(id) {
  $$('.screen').forEach(s => s.classList.toggle('is-active', s.id === `screen-${id}`));
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ── 1. 入口 ──────────────────────────────── */
function renderEntry() {
  const grid = $('#scenarioGrid');
  grid.replaceChildren();
  for (const sc of db.scenarios.scenarios) {
    const isMain = sc.id === 'death';
    const card = document.createElement('button');
    card.className = 'scenario-card' + (isMain ? ' is-primary' : '');
    const stations = sc.procedures.length;
    card.innerHTML = `
      ${isMain ? `<span class="scenario-badge">${T(state.lang, 'mainDemo')}</span>` : ''}
      <strong>${pick(sc.name, state.lang)}</strong>
      <span>${stations} ${T(state.lang, 'stationsUnit')}</span>`;
    card.addEventListener('click', () => {
      state.scenario = sc.id;
      state.answers = {};
      state.eventDates = {};
      state.showDetailed = false;
      saveHash(); renderQuestions(); show('questions');
    });
    grid.append(card);
  }
}

/* ── 2. 質問 ──────────────────────────────── */
function scenarioConditions() {
  const sid = state.scenario;
  return db.conditions.conditions.filter(c => (c.scenarios || []).includes(sid));
}

function questionText(c) {
  const v = c.question_variants?.[state.scenario];
  return v ? pick(v, state.lang) : pick(c.question, state.lang);
}
function optionText(o) {
  const v = o.label_variants?.[state.scenario];
  return v ? pick(v, state.lang) : pick(o.label, state.lang);
}

function renderQuestions() {
  const sc = db.scenarios.scenarios.find(s => s.id === state.scenario);
  $('#qScenarioTitle').textContent = pick(sc.name, state.lang);

  const host = $('#questionList');
  host.replaceChildren();

  // 起算日（死別なら死亡日）。これが無いと全期限が「仮置き」になる
  const dateKey = { death: 'death', childbirth: 'birth', moving: 'moving',
    arrival: 'address_fixed', retirement: 'retirement', employment: 'employment' }[state.scenario];
  if (dateKey) {
    const card = document.createElement('div');
    card.className = 'q-card';
    const cur = state.eventDates[dateKey];
    card.innerHTML = `
      <p class="q-title">${T(state.lang, 'dateQ_' + state.scenario) || T(state.lang, 'dateQ_generic')}</p>
      <p class="q-note">${T(state.lang, 'dateNote')}</p>
      <div class="date-field">
        <input type="date" id="eventDate" value="${cur ? cur.toISOString().slice(0, 10) : ''}">
        <button class="btn btn-quiet" id="dateToday">${T(state.lang, 'dateToday')}</button>
      </div>`;
    host.append(card);
    const input = card.querySelector('#eventDate');
    const apply = v => {
      if (!v) { state.eventDates = {}; saveHash(); return; }
      const d = new Date(v);
      state.eventDates = { [dateKey]: d };
      // 死別は「知った日」「葬儀日」も同日で初期化（詳細で上書き可）
      if (state.scenario === 'death') {
        state.eventDates.known = d;
        state.eventDates['inheritance-known'] = d;
        state.eventDates.funeral = d;
      }
      saveHash();
    };
    input.addEventListener('change', e => apply(e.target.value));
    card.querySelector('#dateToday').addEventListener('click', () => {
      const t = new Date().toISOString().slice(0, 10);
      input.value = t; apply(t);
    });
  }

  const conds = scenarioConditions();
  const tiers = state.showDetailed ? ['profile', 'core', 'follow_up', 'detailed'] : ['profile', 'core', 'follow_up'];

  for (const c of conds) {
    if (!tiers.includes(c.tier)) continue;
    // follow_up は親の回答が真のときだけ
    if (c.tier === 'follow_up' && c.parent) {
      const pv = state.answers[c.parent];
      if (pv !== true && pv !== 'yes') continue;
    }
    const card = document.createElement('div');
    card.className = 'q-card' + (c.critical ? ' is-critical' : '');
    const note = c.note ? `<p class="q-note">${pick(c.note, state.lang)}</p>` : '';

    let controls = '';
    if (c.type === 'boolean') {
      controls = ['true', 'false'].map(v =>
        `<button data-v="${v}" aria-pressed="${String(state.answers[c.id]) === v}">${T(state.lang, v === 'true' ? 'yes' : 'no')}</button>`).join('');
    } else if (c.type === 'choice') {
      controls = (c.options || []).map(o =>
        `<button data-v="${o.value}" aria-pressed="${state.answers[c.id] === o.value}">${optionText(o)}</button>`).join('');
    } else if (c.type === 'number') {
      controls = `<input type="number" min="0" style="font:inherit;padding:9px 12px;border:1.5px solid var(--rule);border-radius:8px;width:120px"
        value="${state.answers[c.id] ?? ''}" data-num>`;
    }

    card.innerHTML = `<p class="q-title">${questionText(c)}</p>${note}<div class="q-options">${controls}</div>`;
    host.append(card);

    card.querySelectorAll('.q-options button').forEach(b => {
      b.addEventListener('click', () => {
        const raw = b.dataset.v;
        const val = raw === 'true' ? true : raw === 'false' ? false : raw;
        state.answers[c.id] = state.answers[c.id] === val ? undefined : val;
        if (state.answers[c.id] === undefined) delete state.answers[c.id];
        saveHash(); renderQuestions();
      });
    });
    const num = card.querySelector('[data-num]');
    if (num) num.addEventListener('change', e => {
      const v = e.target.value;
      if (v === '') delete state.answers[c.id]; else state.answers[c.id] = Number(v);
      saveHash();
    });
  }
}

/* ── 3. 路線図と計算結果 ─────────────────────── */
function buildAndRender() {
  const sc = db.scenarios.scenarios.find(s => s.id === state.scenario);
  $('#mapTitle').textContent = pick(sc.name, state.lang);

  plan = buildPlan(db, state.scenario, state.answers, muni, new Date(), state.eventDates);

  renderAlerts();
  const svg = $('#metroSvg');
  renderMetro(svg, plan, db.procedures.lines, {
    lang: state.lang, online,
    onSelect: id => openDrawer(id),
  });
  renderLegend();
  renderTrips();
  renderDocs();
  $('#disclaimer').textContent = T(state.lang, 'disclaimer');
}

const fmtDate = d => d ? `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}` : '';

function renderAlerts() {
  const host = $('#alertHost');
  host.replaceChildren();
  const rows = plan.timeline.filter(r => r.kind === 'irreversible' || r.critical);
  if (rows.length === 0) return;
  const div = document.createElement('div');
  div.className = 'alert';
  const items = rows.slice(0, 6).map(r => {
    const due = r.due ? `<span class="due">${fmtDate(r.due)}${r.dueAssumed ? T(state.lang, 'assumed') : ''}</span>` : '';
    const days = r.days != null ? `（${T(state.lang, 'inDays').replace('%d', r.days)}）` : '';
    const cons = r.consequence ? `<br><span class="warn-inline">${pick(r.consequence, state.lang)}</span>` : '';
    return `<li><strong>${pick(r.name, state.lang)}</strong> ${due} ${days}${cons}</li>`;
  }).join('');
  div.innerHTML = `<h3>${T(state.lang, 'irreversibleTitle')}</h3><ul>${items}</ul>`;
  host.append(div);
}

function renderLegend() {
  const L = $('#legend');
  const shape = (svgInner) => `<svg width="22" height="22" viewBox="0 0 22 22">${svgInner}</svg>`;
  const ring = 'fill="#fff" stroke="#23241f" stroke-width="3"';
  L.innerHTML = `
    <span class="legend-item">${shape(`<circle cx="11" cy="11" r="7" ${ring}/>`)}${T(state.lang, 'legNormal')}</span>
    <span class="legend-item">${shape(`<polygon points="11,3 19,11 11,19 3,11" ${ring}/>`)}${T(state.lang, 'legIrreversible')}</span>
    <span class="legend-item">${shape(`<polygon points="11,3 19,17 3,17" ${ring}/>`)}${T(state.lang, 'legClaim')}</span>
    <span class="legend-item">${shape(`<rect x="4" y="4" width="14" height="14" rx="2" ${ring}/>`)}${T(state.lang, 'legBefore')}</span>
    <span class="legend-item">${shape(`<circle cx="11" cy="11" r="7" ${ring}/><circle cx="11" cy="11" r="3" fill="#1a4fa0"/>`)}${T(state.lang, 'legOnline')}</span>
    <span class="legend-item">${shape(`<circle cx="11" cy="11" r="7" fill="#fff" stroke="#23241f" stroke-width="3" stroke-dasharray="4 3" opacity=".55"/>`)}${T(state.lang, 'legMaybe')}</span>`;
}

function renderTrips() {
  const card = $('#tripsCard');
  card.replaceChildren();
  const h = document.createElement('h2');
  h.textContent = T(state.lang, 'tripsTitle');
  card.append(h);

  const sub = document.createElement('p');
  sub.className = 'q-note';
  sub.style.margin = '0 0 10px';
  const totalTrips = plan.windows.length;
  const totalProcs = plan.windows.reduce((a, w) => a + w.total, 0);
  sub.textContent = T(state.lang, 'tripsSummary').replace('%t', totalTrips).replace('%p', totalProcs);
  card.append(sub);

  // この経路のうち何件がオンラインで完結できるか（23区ソースマトリクス由来）
  const act = plan.active ?? [];
  const nOnline = act.filter(s => online[s.id]?.mode === 'online').length;
  const nVisit = act.filter(s => online[s.id]?.mode === 'visit').length;
  if (nOnline + nVisit > 0) {
    const p = document.createElement('p');
    p.className = 'q-note';
    p.style.cssText = 'margin:0 0 12px;padding:9px 12px;background:#e7eefa;border-radius:8px;color:var(--accent)';
    p.textContent = T(state.lang, 'onlineSplit')
      .replace('%w', onlineDoc?.wards?.[state.wardCode]?.name ?? '')
      .replace('%o', nOnline).replace('%v', nVisit);
    card.append(p);
  }

  for (const w of plan.windows) {
    const d = document.createElement('div');
    d.className = 'trip';
    const jur = w.jurisdictionLabel ? `<span class="trip-jur">（${w.jurisdictionLabel}）</span>` : '';
    const badge = w.oneTripPossible && w.depts.length > 1
      ? `<span class="trip-badge">${T(state.lang, 'oneTrip').replace('%d', w.total)}</span>` : '';
    const depts = w.depts.map(dep => {
      const tel = dep.tel ? ` <span class="tel">${dep.tel}</span>` : '';
      const procs = dep.stations.map(s => `<li>${pick(s.name, state.lang)}</li>`).join('');
      return `<li><strong>${dep.dept || pick(dep.label, state.lang)}</strong>${tel}
        <ul class="proc-list">${procs}</ul></li>`;
    }).join('');
    d.innerHTML = `<div class="trip-head"><strong>${w.authority}</strong>${jur}${badge}</div>
      <ul class="trip-dept">${depts}</ul>`;
    card.append(d);
  }
}

function renderDocs() {
  const card = $('#docsCard');
  card.replaceChildren();
  const h = document.createElement('h2');
  h.textContent = T(state.lang, 'docsTitle');
  card.append(h);

  const rows = plan.documents.filter(d => (d.copiesMax ?? d.copies) > 0);
  if (rows.length === 0) {
    const p = document.createElement('p');
    p.className = 'q-note';
    p.textContent = T(state.lang, 'docsNone');
    card.append(p);
    return;
  }

  let total = 0, totalMax = 0;
  for (const d of rows) {
    const max = d.copiesMax ?? d.copies;
    const cnt = max > d.copies ? `${d.copies}〜${max}` : `${d.copies}`;
    const unconf = (d.unconfirmedAt?.length ?? 0) > 0
      ? `<span class="warn-inline">${T(state.lang, 'needCheck').replace('%d', d.unconfirmedAt.length)}</span>` : '';
    const fee = d.fee ? `¥${(d.cost ?? 0).toLocaleString('ja-JP')}` : '';
    total += d.cost ?? 0; totalMax += d.costMax ?? d.cost ?? 0;

    const row = document.createElement('div');
    row.className = 'doc-row';
    row.innerHTML = `<div>
        <div class="doc-name">${pick(d.name, state.lang)}</div>
        <div class="doc-meta">${T(state.lang, 'submitShow')
          .replace('%s', d.submittedAt?.length ?? 0).replace('%h', d.shownAt?.length ?? 0)} ${unconf}</div>
      </div>
      <div class="doc-count"><strong>${cnt}</strong>${T(state.lang, 'copiesUnit')}<br><span class="doc-meta">${fee}</span></div>`;
    card.append(row);
  }

  const sum = document.createElement('p');
  sum.style.cssText = 'text-align:right;margin:10px 0 0;font-variant-numeric:tabular-nums';
  sum.innerHTML = `<strong>${T(state.lang, 'totalCost')} ¥${total.toLocaleString('ja-JP')}${
    totalMax > total ? `〜¥${totalMax.toLocaleString('ja-JP')}` : ''}</strong>`;
  card.append(sum);

  for (const d of rows) {
    if (!d.alternative) continue;
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = pick(d.alternative.message, state.lang);
    card.append(hint);
  }
  for (const t of plan.traps ?? []) {
    const warn = document.createElement('div');
    warn.className = 'hint';
    warn.style.cssText = 'background:var(--danger-bg);border-left-color:var(--danger)';
    warn.textContent = pick(t.message, state.lang);
    card.append(warn);
  }
}

/* ── 駅詳細 ────────────────────────────────── */
function openDrawer(id) {
  const s = plan.stations.find(x => x.id === id);
  const row = plan.timeline.find(x => x.id === id);
  if (!s) return;
  const cap = online[id];
  const docs = (s.requires || []).map(did => {
    const doc = db.documents.documents.find(x => x.id === did);
    const detail = (s.requires_detail || {})[did];
    const mark = detail === 'submit' ? T(state.lang, 'submitOriginal')
      : detail === 'show' ? T(state.lang, 'showOnly') : T(state.lang, 'unconfirmed');
    return `<li>${doc ? pick(doc.name, state.lang) : did} <span class="tag">${mark}</span></li>`;
  }).join('');

  const tags = [
    row ? `<span class="tag${row.kind === 'irreversible' ? ' is-danger' : ''}">${pick(SEVERITY[row.kind] ?? SEVERITY.none, state.lang === 'en' ? 'en' : 'ja')}</span>` : '',
    cap?.mode === 'online' ? `<span class="tag is-online">${T(state.lang, 'canOnline')}</span>` : '',
    cap?.mode === 'visit' ? `<span class="tag">${T(state.lang, 'mustVisit')}</span>` : '',
  ].join('');

  const dueLine = row?.due
    ? `${fmtDate(row.due)}${row.dueAssumed ? T(state.lang, 'assumed') : ''}${row.days != null ? `（${T(state.lang, 'inDays').replace('%d', row.days)}）` : ''}`
    : T(state.lang, 'noDeadline');

  const local = muni?.windows?.[id];
  const windowLine = local?.dept
    ? `${local.dept}${local.tel ? `<br>${local.tel}` : ''}`
    : pick(s.window.label, state.lang);

  const links = (cap?.links ?? []).map(l => `<div class="src"><a href="${l.url}" target="_blank" rel="noopener">${l.title}</a></div>`).join('');

  $('#drawerBody').innerHTML = `
    <h2 style="margin-top:0">${pick(s.name, state.lang)}</h2>
    <div>${tags}</div>
    <dl>
      <dt>${T(state.lang, 'dtDeadline')}</dt><dd>${dueLine}</dd>
      <dt>${T(state.lang, 'dtWindow')}</dt><dd>${windowLine}</dd>
      ${docs ? `<dt>${T(state.lang, 'dtDocs')}</dt><dd><ul style="margin:4px 0 0;padding-left:18px">${docs}</ul></dd>` : ''}
      ${s.note ? `<dt>${T(state.lang, 'dtNote')}</dt><dd>${pick(s.note, state.lang)}</dd>` : ''}
      ${s.law ? `<dt>${T(state.lang, 'dtLaw')}</dt><dd>${s.law}</dd>` : ''}
      ${s.source ? `<dt>${T(state.lang, 'dtSource')}</dt><dd class="src"><a href="${s.source}" target="_blank" rel="noopener">${s.source}</a></dd>` : ''}
      ${links ? `<dt>${T(state.lang, 'dtOnlineSrc')}</dt><dd>${links}</dd>` : ''}
    </dl>`;
  $('#drawer').classList.add('is-open');
  $('#drawer').setAttribute('aria-hidden', 'false');
}
function closeDrawer() {
  $('#drawer').classList.remove('is-open');
  $('#drawer').setAttribute('aria-hidden', 'true');
}

/* ── i18n の適用 ───────────────────────────── */
function applyStaticI18n() {
  $$('[data-i18n]').forEach(n => {
    const v = T(state.lang, n.dataset.i18n);
    if (v) n.textContent = v;
  });
  document.documentElement.lang = state.lang === 'en' ? 'en' : 'ja';
}

/* ── 起動 ──────────────────────────────────── */
async function main() {
  await loadAll();

  $('#langToggle').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    state.lang = b.dataset.lang;
    $$('#langToggle button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    applyStaticI18n(); saveHash();
    if ($('#screen-questions').classList.contains('is-active')) renderQuestions();
    if ($('#screen-map').classList.contains('is-active')) buildAndRender();
    renderEntry();
  });

  $('#btnShowMap').addEventListener('click', () => { show('map'); buildAndRender(); });
  $('#btnBackQ').addEventListener('click', () => show('questions'));
  $('#btnMoreQ').addEventListener('click', () => { state.showDetailed = !state.showDetailed; renderQuestions(); });
  $('#btnPrint').addEventListener('click', () => window.print());
  $('#btnRestart').addEventListener('click', () => { show('entry'); });
  $('#btnClear').addEventListener('click', () => {
    state.scenario = null; state.answers = {}; state.eventDates = {};
    history.replaceState(null, '', location.pathname);
    renderEntry(); show('entry');
  });
  $('#drawerClose').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  applyStaticI18n();
  renderEntry();

  if (loadHash()) {
    $$('#langToggle button').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.lang === state.lang)));
    applyStaticI18n();
    renderQuestions();
    show('map');
    buildAndRender();
  }
}

main().catch(err => {
  document.body.insertAdjacentHTML('afterbegin',
    `<pre style="color:#d0342c;padding:20px;white-space:pre-wrap">起動に失敗しました:\n${err.stack || err}</pre>`);
});
