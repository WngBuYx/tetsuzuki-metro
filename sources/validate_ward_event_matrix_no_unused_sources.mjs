import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const matrix = JSON.parse(fs.readFileSync(path.join(root, 'data', 'ward_event_source_matrix.json'), 'utf8'));

const unused = [];
for (const ward of matrix.wards) {
  const used = new Set(ward.coverage.flatMap((record) => record.source_ids));
  for (const source of ward.sources) {
    if (!used.has(source.source_id)) unused.push(`${ward.ward_code}/${source.source_id}`);
  }
}

assert.deepEqual(unused, [], `all embedded sources must support at least one coverage record; unused=${unused.join(',')}`);
console.log('PASS unused_sources=0');
