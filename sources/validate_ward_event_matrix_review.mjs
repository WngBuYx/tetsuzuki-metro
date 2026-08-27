import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const matrix = JSON.parse(fs.readFileSync(path.join(root, 'data', 'ward_event_source_matrix.json'), 'utf8'));
const common = JSON.parse(fs.readFileSync(path.join(root, 'data', 'common_event_sources.json'), 'utf8'));

const capabilityKeys = [
  'information',
  'questionnaire',
  'reservation',
  'prefill',
  'online_submission',
  'mandatory_visit',
  'assisted_counter'
];
const allowedCapabilities = new Set(['yes', 'no', 'unknown', 'not_applicable']);
const allowedStatuses = new Set(['complete', 'partial', 'missing', 'unverified']);

const wardsByCode = new Map(matrix.wards.map((ward) => [ward.ward_code, ward]));
const allSubflows = matrix.events.flatMap((event) => event.subflows.map((subflow) => ({event_id: event.id, ...subflow})));

assert.equal(matrix.wards.length, 23, 'matrix must contain 23 wards');
assert.equal(allSubflows.length, 33, 'matrix must contain 33 canonical subflows');

const coverageKeys = [];
for (const ward of matrix.wards) {
  assert.equal(ward.coverage.length, 33, `${ward.ward_code} must contain 33 coverage records`);
  const sourceIds = new Set(ward.sources.map((source) => source.source_id));
  for (const record of ward.coverage) {
    assert.ok(allowedStatuses.has(record.coverage_status), `${ward.ward_code}/${record.subflow_id} has invalid status`);
    coverageKeys.push(`${ward.ward_code}/${record.event_id}/${record.subflow_id}`);
    for (const sourceId of record.source_ids) {
      assert.ok(sourceIds.has(sourceId), `${ward.ward_code}/${record.subflow_id} references missing source ${sourceId}`);
    }
  }
  for (const source of ward.sources) {
    for (const key of capabilityKeys) {
      assert.ok(allowedCapabilities.has(source.capabilities[key]), `${source.source_id}.${key} is invalid`);
    }
  }
}
assert.equal(coverageKeys.length, 759, 'matrix must contain 759 coverage records');
assert.equal(new Set(coverageKeys).size, 759, 'coverage keys must be unique');

function commonSource(sourceId) {
  const source = common.sources.find((candidate) => candidate.source_id === sourceId);
  assert.ok(source, `missing common source ${sourceId}`);
  return source;
}

function wardSource(wardCode, sourceId) {
  const ward = wardsByCode.get(wardCode);
  assert.ok(ward, `missing ward ${wardCode}`);
  const source = ward.sources.find((candidate) => candidate.source_id === sourceId);
  assert.ok(source, `missing source ${wardCode}/${sourceId}`);
  return source;
}

function coverage(wardCode, subflowId) {
  const ward = wardsByCode.get(wardCode);
  assert.ok(ward, `missing ward ${wardCode}`);
  const record = ward.coverage.find((candidate) => candidate.subflow_id === subflowId);
  assert.ok(record, `missing coverage ${wardCode}/${subflowId}`);
  return record;
}

const canonicalMoving = commonSource('national-moving-digital-agency');
assert.equal(canonicalMoving.capabilities.reservation, 'no', 'visit-intent notice is not a reservation');
assert.equal(canonicalMoving.capabilities.prefill, 'no', 'advance data transfer is not prefill');

const canonicalForeignChild = commonSource('national-foreign-child-residence');
assert.equal(canonicalForeignChild.capabilities.online_submission, 'yes', 'foreign-child residence application has an official online channel');

for (const ward of matrix.wards) {
  for (const source of ward.sources) {
    const canonical = common.sources.find((candidate) => candidate.url === source.url);
    if (!canonical) continue;
    assert.deepEqual(source.capabilities, canonical.capabilities, `${source.source_id} must use canonical capabilities for ${source.url}`);
  }
}

assert.equal(wardSource('13102', '13102_oss').capabilities.reservation, 'no');
assert.equal(wardSource('13102', '13102_oss').capabilities.prefill, 'no');
assert.equal(wardSource('13103', '13103_visit').capabilities.assisted_counter, 'no');
assert.equal(wardSource('13106', '13106_visit').capabilities.assisted_counter, 'no');
assert.equal(wardSource('13107', '13107_pregnancy').capabilities.reservation, 'yes');
assert.equal(wardSource('13107', '13107_pregnancy').capabilities.prefill, 'no');
assert.equal(wardSource('13107', '13107_pregnancy').capabilities.assisted_counter, 'no');
assert.equal(wardSource('13117', '13117_move_form').capabilities.prefill, 'no');
assert.equal(wardSource('13117', '13117_companion').capabilities.online_submission, 'unknown');
assert.equal(wardSource('13117', '13117_death_guide').capabilities.mandatory_visit, 'not_applicable');
assert.equal(wardSource('13123', '13123_preg').capabilities.mandatory_visit, 'yes');
assert.equal(wardSource('13123', '13123_death_counter').capabilities.questionnaire, 'no');
assert.equal(wardSource('13123', '13123_death_counter').capabilities.prefill, 'no');
assert.equal(wardSource('13123', '13123_death_guide').capabilities.mandatory_visit, 'not_applicable');
assert.equal(wardSource('13123', '13123_life_guide').capabilities.mandatory_visit, 'not_applicable');

assert.equal(coverage('13109', 'move_out_notification').coverage_status, 'partial');
assert.equal(coverage('13107', 'national_health_insurance_move').coverage_status, 'partial');
assert.ok(coverage('13107', 'pregnancy_notification_handbook').source_ids.includes('13107_pregnancy'));
assert.ok(!coverage('13107', 'pregnancy_notification_handbook').source_ids.includes('13107_benefits'));
assert.ok(!coverage('13123', 'pregnancy_notification_handbook').source_ids.includes('13123_piyonavi'));

for (const ward of matrix.wards) {
  for (const subflowId of ['child_health_insurance', 'childbirth_lump_sum', 'pension_survivor_procedures']) {
    assert.notEqual(coverage(ward.ward_code, subflowId).coverage_status, 'complete', `${ward.ward_code}/${subflowId} must expose cross-authority branching as partial`);
  }
}

const embeddedSources = matrix.wards.flatMap((ward) => ward.sources);
const wardSources = embeddedSources.filter((source) => source.authority_level === 'ward');
const nationalSources = embeddedSources.filter((source) => source.authority_level === 'national');
assert.equal(matrix.counts.embedded_sources, embeddedSources.length);
assert.equal(matrix.counts.ward_sources, wardSources.length);
assert.equal(matrix.counts.national_sources, nationalSources.length);
assert.equal(matrix.review.correction_ledger, 'data/ward_event_matrix_review_corrections.json');

console.log(`PASS wards=${matrix.wards.length} subflows=${allSubflows.length} coverage=${coverageKeys.length} embedded=${embeddedSources.length}`);
