import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const matrix = JSON.parse(fs.readFileSync(path.join(root, 'data', 'ward_event_source_matrix.json'), 'utf8'));
const reportPath = path.join(root, 'WARD_EVENT_SOURCE_MATRIX_2026-08-11.md');

assert.ok(fs.existsSync(reportPath), 'final reviewed report must exist');
const report = fs.readFileSync(reportPath, 'utf8');
const coverage = matrix.wards.flatMap((ward) => ward.coverage);
const statusCounts = Object.fromEntries(['complete', 'partial', 'missing', 'unverified'].map((status) => [
  status,
  coverage.filter((record) => record.coverage_status === status).length
]));
const embeddedSources = matrix.wards.flatMap((ward) => ward.sources);
const wardSources = embeddedSources.filter((source) => source.authority_level === 'ward');
const nationalSources = embeddedSources.filter((source) => source.authority_level === 'national');

assert.ok(report.includes('核验与复核日期：2026-08-11'), 'report must show the reviewed date');
assert.ok(report.includes(`完整${statusCounts.complete}、部分${statusCounts.partial}、缺失${statusCounts.missing}、待核${statusCounts.unverified}`), 'report status summary must match JSON');
assert.ok(report.includes(`嵌入来源记录${embeddedSources.length}条＝区级${wardSources.length}＋全国${nationalSources.length}`), 'report must use the corrected source-count terminology');
assert.ok(!report.includes('区级来源318个'), 'report must not call all embedded records ward-level sources');
assert.ok(report.includes('## 23区逐项来源明细'), 'report must expose a human-readable ward × subflow × source appendix');
assert.ok(report.includes('data/ward_event_matrix_review_corrections.json'), 'report must link the review correction ledger');

for (const ward of matrix.wards) {
  assert.ok(report.includes(`### ${ward.ward_code} ${ward.ward_name}`), `report must include detail section for ${ward.ward_code}`);
  const usedSourceIds = new Set(ward.coverage.flatMap((record) => record.source_ids));
  for (const source of ward.sources) {
    if (!usedSourceIds.has(source.source_id)) continue;
    assert.ok(report.includes(source.url), `report must include used official source URL ${source.source_id}`);
  }
}

console.log(`PASS report=${path.basename(reportPath)} statuses=${JSON.stringify(statusCounts)}`);
