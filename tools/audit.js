/**
 * 証拠チェーン監査。`npm run audit` で実行すると EVIDENCE_TODO.md を再生成する。
 *
 * 「期限と必要書類の正確さが崩れたら作品の意味が無い」——この前提のもと、
 * 根拠が弱い箇所を機械的に洗い出し、データ担当の作業キューにする。
 * 判定基準:
 *  - 出典は官公庁ドメイン(*.go.jp / *.lg.jp / *.tokyo.jp)であるべき
 *  - 全手続に law(根拠法令)が入るべき
 *  - requires_detail(原本提出/提示のみ)は全ての手続×書類ペアで確認済みであるべき
 *  - 書類には source と lead_time_days が入るべき
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = p => JSON.parse(fs.readFileSync(path.join(root, p), 'utf-8'));

const procedures = load('data/procedures.json').procedures;
const documents  = load('data/documents.json').documents;

const OFFICIAL = /\.go\.jp$|\.lg\.jp$|\.tokyo\.jp$/;
const domain = u => { try { return new URL(u).hostname; } catch { return null; } };

const noLaw = procedures.filter(p => !p.law);
const badSource = procedures
  .map(p => ({ p, host: domain(p.source) }))
  .filter(({ host }) => host && !OFFICIAL.test(host));
const noSource = procedures.filter(p => !p.source);
const uncovered = [];
for (const p of procedures) {
  for (const d of p.requires ?? []) {
    if (!(p.requires_detail ?? {})[d]) uncovered.push({ pid: p.id, name: p.name.ja, doc: d });
  }
}
const docNoSource = documents.filter(d => !d.source);
const docNoLead = documents.filter(d => d.lead_time_days == null);

const today = new Date().toISOString().slice(0, 10);
const L = [];
L.push(`# 証拠チェーン監査 — 残作業キュー`);
L.push('');
L.push(`> このファイルは \`npm run audit\` で自動再生成される。手で編集しない。`);
L.push(`> 生成日: ${today} ／ 対象: 手続${procedures.length}件・書類${documents.length}件`);
L.push('');
L.push(`| 監査項目 | 現状 | 目標 |`);
L.push(`|---|---|---|`);
L.push(`| 根拠法令(law)なし | ${noLaw.length}件 | 0件 |`);
L.push(`| 出典が官公庁ドメイン以外 | ${badSource.length}件 | 0件 |`);
L.push(`| 出典なし | ${noSource.length}件 | 0件 |`);
L.push(`| 提出方法(原本/提示)が未確認の手続×書類 | ${uncovered.length}組 | 0組 |`);
L.push(`| 出典なしの書類 | ${docNoSource.length}件 | 0件 |`);
L.push(`| 取得リードタイム不明の書類 | ${docNoLead.length}件 | 0件 |`);
L.push('');

L.push(`## 1. 出典が官公庁以外（商用サイト・士業サイト）— 省庁/自治体の一次情報に差し替える`);
L.push('');
L.push(`| 手続 | 現在の出典 |`);
L.push(`|---|---|`);
for (const { p, host } of badSource) L.push(`| ${p.name.ja} (\`${p.id}\`) | ${host} |`);
L.push('');

L.push(`## 2. 根拠法令が未記載の手続`);
L.push('');
for (const p of noLaw) L.push(`- ${p.name.ja} (\`${p.id}\`)`);
L.push('');

L.push(`## 3. 提出方法（原本提出/提示のみ）が未確認の手続×書類`);
L.push('');
L.push(`確認したら \`requires_detail\` に \`submit\` / \`show\` / \`copy\` を記入する。`);
L.push(`未記入のままでもエンジンは「要確認」として通数を幅（最少〜最多）で出すが、幅が広いほど利用者の不安になる。`);
L.push('');
const byProc = new Map();
for (const u of uncovered) {
  if (!byProc.has(u.pid)) byProc.set(u.pid, { name: u.name, docs: [] });
  byProc.get(u.pid).docs.push(u.doc);
}
for (const [pid, v] of byProc) L.push(`- ${v.name} (\`${pid}\`): ${v.docs.join(', ')}`);
L.push('');

L.push(`## 4. 書類の出典・リードタイム`);
L.push('');
L.push(`出典なし: ${docNoSource.map(d => `\`${d.id}\``).join(', ') || '（なし）'}`);
L.push('');
L.push(`リードタイム不明: ${docNoLead.map(d => `\`${d.id}\``).join(', ') || '（なし）'}`);
L.push('');
L.push(`## 5. 記入時のルール`);
L.push('');
L.push(`- 出典には URL に加えて **確認日** を \`verified\` フィールド（YYYY-MM-DD）で残す`);
L.push(`- 期限・手数料は **適用地域**（全国共通か、区独自か）を意識して確認する`);
L.push(`- PDF を出典にする場合はページ番号まで記録する（例: \`source_note: "p.23"\`）`);
L.push('');

fs.writeFileSync(path.join(root, 'EVIDENCE_TODO.md'), L.join('\n'), 'utf-8');
console.log(`EVIDENCE_TODO.md を再生成した:`);
console.log(`  法令なし ${noLaw.length} / 非官公庁出典 ${badSource.length} / 提出方法未確認 ${uncovered.length}組 / 書類出典なし ${docNoSource.length} / リードタイム不明 ${docNoLead.length}`);
