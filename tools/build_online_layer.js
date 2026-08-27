/**
 * 23区ソースマトリクス → 「この手続はオンラインでできるか」レイヤ
 *
 * ward_event_source_matrix.json は subflow 粒度なので、
 * ward_event_subflows.json の procedure_id マッピングを使って手続粒度に落とす。
 * 出力: data/online_capability.json
 *
 * 判定は保守的に行う。予約・予填・窓口協助を「オンラインで完結」と数えない
 * ——これは元データの定義（CORE_SUBFLOWS_2026-08-10.md）が明示している原則。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf-8'));

const matrix = read('data/ward_event_source_matrix.json');
const subflowDoc = read('data/ward_event_subflows.json');

// subflow_id → [procedure_id]
const subflowToProcs = new Map();
for (const ev of subflowDoc.events) {
  for (const sf of ev.subflows) {
    const ids = sf.procedure_id || sf.procedure_ids || [];
    subflowToProcs.set(sf.id, Array.isArray(ids) ? ids : [ids]);
  }
}

const out = { $schema_version: '1.0', generated_from: 'data/ward_event_source_matrix.json',
  note: '予約・プレフィル・窓口協助は「オンライン完結」に数えない。判定は保守的。',
  wards: {} };

for (const ward of matrix.wards) {
  const sourceById = new Map(ward.sources.map(s => [s.source_id, s]));
  const procs = {};

  for (const cov of ward.coverage) {
    const procIds = subflowToProcs.get(cov.subflow_id) || [];
    if (procIds.length === 0) continue;

    // この subflow を支える情報源の能力を集約する
    let online = false, reservation = false, prefill = false, questionnaire = false;
    let mandatoryVisit = false, assisted = false;
    const links = [];
    for (const sid of cov.source_ids || []) {
      const s = sourceById.get(sid);
      if (!s) continue;
      const c = s.capabilities || {};
      if (c.online_submission === 'yes') online = true;
      if (c.reservation === 'yes') reservation = true;
      if (c.prefill === 'yes') prefill = true;
      if (c.questionnaire === 'yes') questionnaire = true;
      if (c.mandatory_visit === 'yes') mandatoryVisit = true;
      if (c.assisted_counter === 'yes') assisted = true;
      links.push({ title: s.title, url: s.url, operator: s.operator });
    }

    // online / partial / visit / unknown の4値に落とす
    let mode = 'unknown';
    if (online) mode = 'online';
    else if (mandatoryVisit) mode = 'visit';
    else if (reservation || prefill || questionnaire) mode = 'partial';

    for (const pid of procIds) {
      // 同じ手続が複数 subflow に現れたら、より「オンラインに近い」ほうを採る
      const rank = { online: 3, partial: 2, visit: 1, unknown: 0 };
      if (!procs[pid] || rank[mode] > rank[procs[pid].mode]) {
        procs[pid] = { mode, reservation, prefill, questionnaire, mandatoryVisit,
          assisted, coverage: cov.coverage_status, links: links.slice(0, 3) };
      }
    }
  }
  out.wards[ward.ward_code] = { name: ward.ward_name, procedures: procs };
}

// 区ごとの集計（発表で使う）
const summary = [];
for (const [code, w] of Object.entries(out.wards)) {
  const modes = { online: 0, partial: 0, visit: 0, unknown: 0 };
  for (const p of Object.values(w.procedures)) modes[p.mode]++;
  summary.push({ code, name: w.name, total: Object.keys(w.procedures).length, ...modes });
}
summary.sort((a, b) => b.online - a.online || b.partial - a.partial);
out.summary = summary;

fs.writeFileSync(path.join(root, 'data/online_capability.json'),
  JSON.stringify(out, null, 2), 'utf-8');

console.log('data/online_capability.json を生成');
console.log('%-8s %5s %7s %7s %6s %7s', '区', '手続', 'オンライン', '一部', '要来庁', '不明');
for (const s of summary.slice(0, 8)) {
  console.log('%-8s %5d %7d %7d %6d %7d', s.name, s.total, s.online, s.partial, s.visit, s.unknown);
}
const shinjuku = summary.find(s => s.name === '新宿区');
console.log('...');
console.log('%-8s %5d %7d %7d %6d %7d', shinjuku.name, shinjuku.total, shinjuku.online, shinjuku.partial, shinjuku.visit, shinjuku.unknown);
