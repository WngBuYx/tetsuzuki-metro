import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const matrix = JSON.parse(fs.readFileSync(path.join(root, 'data', 'ward_event_source_matrix.json'), 'utf8'));
const wardByCode = new Map(matrix.wards.map((ward) => [ward.ward_code, ward]));

function source(wardCode, sourceId) {
  const value = wardByCode.get(wardCode)?.sources.find((candidate) => candidate.source_id === sourceId);
  assert.ok(value, `missing source ${wardCode}/${sourceId}`);
  return value;
}

function coverage(wardCode, subflowId) {
  const value = wardByCode.get(wardCode)?.coverage.find((candidate) => candidate.subflow_id === subflowId);
  assert.ok(value, `missing coverage ${wardCode}/${subflowId}`);
  return value;
}

const chiyodaPregnancy = source('13101', '13101_pregnancy_notification');
assert.equal(chiyodaPregnancy.url, 'https://www.city.chiyoda.lg.jp/koho/kosodate/kosodate/ninshin/boshitecho.html');
assert.equal(chiyodaPregnancy.capabilities.online_submission, 'yes');
assert.equal(chiyodaPregnancy.capabilities.mandatory_visit, 'yes');
assert.ok(coverage('13101', 'pregnancy_notification_handbook').source_ids.includes('13101_pregnancy_notification'));

assert.equal(source('13101', '13101_counter').capabilities.prefill, 'yes');
assert.equal(source('13101', '13101_counter').official_updated_at, '2026-07-03');
assert.equal(source('13104', '13104_pregnancy').capabilities.online_submission, 'yes');
assert.equal(source('13112', '13112_pregnancy').capabilities.online_submission, 'yes');
assert.equal(coverage('13115', 'mandatory_visit_summary').coverage_status, 'partial');
assert.equal(source('13119', '13119_preg').capabilities.mandatory_visit, 'no');
assert.equal(source('13119', '13119_death_counter').capabilities.prefill, 'no');
assert.equal(source('13123', '13123_preg').capabilities.mandatory_visit, 'yes');

console.log('PASS second_review_findings=8');
