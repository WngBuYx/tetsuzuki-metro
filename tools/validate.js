/**
 * データ整合性チェック。`npm run validate` で実行。エラーがあれば exit 1。
 *
 * JSON Schema ライブラリを入れず、このプロジェクトが実際に壊れうる点だけを検査する:
 *  - 必須フィールドと列挙値
 *  - 参照整合性（scenario→procedure、requires→documents、depends_on→procedure、
 *    requires_detail のキーが requires の部分集合か、条件式の変数が conditions に在るか）
 *  - 条件式が構文として評価可能か
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { evalExpr, SEVERITY } from '../src/route.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf-8'));

const procedures = load('data/procedures.json').procedures;
const documents  = load('data/documents.json').documents;
const conditions = load('data/conditions.json');
const scenarios  = load('data/scenarios.json').scenarios;
const lines      = load('data/procedures.json').lines;

const errors = [];
const warns  = [];
const err  = m => errors.push(m);
const warn = m => warns.push(m);

/* ── id 集合 ── */
const procIds = new Set();
for (const p of procedures) {
  if (procIds.has(p.id)) err(`procedures: id 重複 ${p.id}`);
  procIds.add(p.id);
}
const docIds = new Set(documents.map(d => d.id));
const lineIds = new Set((lines ?? []).map(l => l.id));
const condIds = new Set((conditions.conditions ?? conditions).map?.(c => c.id) ?? []);
if (condIds.size === 0) {
  // conditions.json の構造が {conditions:[...]} でない場合に備える
  const arr = Array.isArray(conditions) ? conditions : conditions.conditions ?? [];
  for (const c of arr) condIds.add(c.id);
}

const DETAIL_VALUES = new Set(['submit', 'show', 'copy']);
const UNIT_VALUES = new Set(['day', 'month', 'year']);
const JUR_VALUES = new Set(['same', 'old', 'new', 'both']);

/* ── 手続 ── */
for (const p of procedures) {
  const at = `procedures[${p.id}]`;
  if (!p.name?.ja) err(`${at}: name.ja が無い`);
  if (!p.line || !lineIds.has(p.line)) err(`${at}: line "${p.line}" が lines に無い`);
  if (!p.window?.authority) err(`${at}: window.authority が無い`);
  if (!p.window?.label?.ja) err(`${at}: window.label.ja が無い`);
  if (p.window?.jurisdiction && !JUR_VALUES.has(p.window.jurisdiction)) {
    err(`${at}: window.jurisdiction "${p.window.jurisdiction}" は ${[...JUR_VALUES]} のいずれか`);
  }
  if (!p.source) warn(`${at}: source(出典URL)が無い`);

  if (p.deadline && p.deadline.value != null) {
    if (!UNIT_VALUES.has(p.deadline.unit)) err(`${at}: deadline.unit "${p.deadline.unit}" が不正`);
    if (!(p.deadline.kind in SEVERITY)) err(`${at}: deadline.kind "${p.deadline.kind}" が SEVERITY に無い`);
  }

  for (const d of p.requires ?? []) {
    if (!docIds.has(d)) err(`${at}: requires "${d}" が documents.json に無い`);
  }
  for (const [d, v] of Object.entries(p.requires_detail ?? {})) {
    if (!(p.requires ?? []).includes(d)) err(`${at}: requires_detail のキー "${d}" が requires に無い`);
    if (!DETAIL_VALUES.has(v)) err(`${at}: requires_detail["${d}"]="${v}" は ${[...DETAIL_VALUES]} のいずれか`);
  }
  for (const d of p.depends_on ?? []) {
    if (!procIds.has(d)) err(`${at}: depends_on "${d}" が存在しない`);
  }
  for (const expr of [...(p.appears_when ?? []), ...(p.skippable_when ?? [])]) {
    try {
      evalExpr(expr, {});
    } catch (e) {
      err(`${at}: 条件式を解析できない: "${expr}" (${e.message})`);
      continue;
    }
    // 条件式で使う変数が conditions.json に定義されているか
    for (const m of expr.matchAll(/([A-Za-z_][A-Za-z0-9_]*)\s*(?:==|!=|>=|<=|>|<)/g)) {
      if (condIds.size > 0 && !condIds.has(m[1])) warn(`${at}: 条件式の変数 "${m[1]}" が conditions.json に無い`);
    }
  }
}

/* ── 書類 ── */
for (const d of documents) {
  const at = `documents[${d.id}]`;
  if (!d.name?.ja) err(`${at}: name.ja が無い`);
  if (d.fee != null && typeof d.fee !== 'number') err(`${at}: fee が数値でない`);
  if (d.lead_time_days != null && typeof d.lead_time_days !== 'number') err(`${at}: lead_time_days が数値でない`);
}

/* ── シナリオ ── */
for (const s of scenarios) {
  for (const pid of s.procedures) {
    if (!procIds.has(pid)) err(`scenarios[${s.id}]: 手続 "${pid}" が存在しない`);
  }
}

/* ── 自治体ファイル ── */
for (const f of fs.readdirSync(path.join(root, 'data/municipalities'))) {
  if (!f.endsWith('.json')) continue;
  const m = load(`data/municipalities/${f}`);
  for (const pid of Object.keys(m.windows ?? {})) {
    if (!procIds.has(pid)) err(`municipalities/${f}: windows のキー "${pid}" が procedures に無い`);
  }
}

/* ── 結果 ── */
console.log(`検査対象: 手続${procedures.length} / 書類${documents.length} / シナリオ${scenarios.length}`);
if (warns.length) {
  console.log(`\n⚠ 警告 ${warns.length}件`);
  for (const w of warns.slice(0, 20)) console.log('  - ' + w);
  if (warns.length > 20) console.log(`  … ほか${warns.length - 20}件`);
}
if (errors.length) {
  console.error(`\n✗ エラー ${errors.length}件`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log('\n✓ 整合性エラーなし');
