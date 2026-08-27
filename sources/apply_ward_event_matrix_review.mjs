import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const matrixPath = path.join(root, 'data', 'ward_event_source_matrix.json');
const commonPath = path.join(root, 'data', 'common_event_sources.json');
const correctionsPath = path.join(root, 'data', 'ward_event_matrix_review_corrections.json');

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const clone = (value) => JSON.parse(JSON.stringify(value));
const writeJson = (filePath, value) => fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');

const matrix = readJson(matrixPath);
const common = readJson(commonPath);
const corrections = readJson(correctionsPath);

const commonById = new Map(common.sources.map((source) => [source.source_id, source]));
for (const override of corrections.common_source_capability_overrides) {
  const source = commonById.get(override.source_id);
  if (!source) throw new Error(`Missing common source: ${override.source_id}`);
  Object.assign(source, clone(override.set));
}
common.verified_on = corrections.reviewed_on;

matrix.common_sources = clone(common.sources);
const canonicalByUrl = new Map(common.sources.map((source) => [source.url, source]));
for (const ward of matrix.wards) {
  for (const source of ward.sources) {
    const canonical = canonicalByUrl.get(source.url);
    if (canonical) source.capabilities = clone(canonical.capabilities);
  }
}

for (const addition of corrections.source_additions ?? []) {
  const ward = matrix.wards.find((candidate) => candidate.ward_code === addition.ward_code);
  if (!ward) throw new Error(`Missing ward for source addition: ${addition.ward_code}`);
  const existing = ward.sources.find((source) => source.source_id === addition.source.source_id);
  if (!existing) ward.sources.push(clone(addition.source));
}

const allSources = matrix.wards.flatMap((ward) => ward.sources);
const sourceById = new Map(allSources.map((source) => [source.source_id, source]));
for (const override of corrections.source_overrides) {
  const source = sourceById.get(override.source_id);
  if (!source) throw new Error(`Missing ward source: ${override.source_id}`);
  if (override.set_capabilities) Object.assign(source.capabilities, override.set_capabilities);
  if (override.set) Object.assign(source, clone(override.set));
  if (override.evidence_note) source.evidence_note = override.evidence_note;
}

const wardByCode = new Map(matrix.wards.map((ward) => [ward.ward_code, ward]));
const findCoverage = (wardCode, subflowId) => {
  const ward = wardByCode.get(wardCode);
  if (!ward) throw new Error(`Missing ward: ${wardCode}`);
  const record = ward.coverage.find((candidate) => candidate.subflow_id === subflowId);
  if (!record) throw new Error(`Missing coverage: ${wardCode}/${subflowId}`);
  return record;
};

for (const override of corrections.coverage_overrides) {
  const record = findCoverage(override.ward_code, override.subflow_id);
  record.coverage_status = override.coverage_status;
  record.status_reason = override.status_reason;
  record.gap_note = override.gap_note;
}

for (const override of corrections.coverage_source_overrides) {
  const record = findCoverage(override.ward_code, override.subflow_id);
  if (override.replace_source_id) {
    record.source_ids = record.source_ids.map((sourceId) =>
      sourceId === override.replace_source_id ? override.with_source_id : sourceId
    );
  }
  if (override.remove_source_id) {
    record.source_ids = record.source_ids.filter((sourceId) => sourceId !== override.remove_source_id);
  }
  if (override.add_source_id) {
    record.source_ids.push(override.add_source_id);
  }
  record.source_ids = [...new Set(record.source_ids)];
}

for (const rule of corrections.global_coverage_downgrades) {
  for (const ward of matrix.wards) {
    const record = findCoverage(ward.ward_code, rule.subflow_id);
    if (record.coverage_status !== rule.from) continue;
    record.coverage_status = rule.to;
    record.status_reason = rule.status_reason;
    record.gap_note = rule.gap_note;
  }
}

const embeddedSources = matrix.wards.flatMap((ward) => ward.sources);
const countAuthority = (authority) => embeddedSources.filter((source) => source.authority_level === authority).length;
matrix.generated_on = corrections.reviewed_on;
matrix.verified_on = corrections.reviewed_on;
matrix.counts.embedded_sources = embeddedSources.length;
matrix.counts.ward_sources = countAuthority('ward');
matrix.counts.national_sources = countAuthority('national');
matrix.counts.tokyo_sources = countAuthority('tokyo');
matrix.counts.common_sources = common.sources.length;
matrix.review = {
  reviewed_on: corrections.reviewed_on,
  correction_ledger: 'data/ward_event_matrix_review_corrections.json',
  independent_complete_samples_checked: 74,
  result: 'corrected_after_independent_review'
};

writeJson(commonPath, common);
writeJson(matrixPath, matrix);
console.log(`APPLIED corrections=${corrections.source_overrides.length + corrections.coverage_overrides.length + corrections.coverage_source_overrides.length + corrections.global_coverage_downgrades.length}`);
