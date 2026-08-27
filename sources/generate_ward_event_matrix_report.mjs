import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const matrix = JSON.parse(fs.readFileSync(path.join(root, 'data', 'ward_event_source_matrix.json'), 'utf8'));
const reportPath = path.join(root, 'WARD_EVENT_SOURCE_MATRIX_2026-08-11.md');
const supersededPath = path.join(root, 'WARD_EVENT_SOURCE_MATRIX_2026-08-10.md');

const statusLabels = {complete: '完整', partial: '部分', missing: '缺失', unverified: '待核'};
const statusMarks = {complete: '完', partial: '部', missing: '缺', unverified: '待'};
const capabilityLabels = matrix.definitions.capabilities;
const capabilityKeys = Object.keys(capabilityLabels);
const capabilityValueLabels = {yes: '是', no: '否', unknown: '未知', not_applicable: '不适用'};
const eventPrefixes = {moving: 'M', childbirth: 'C', death: 'D'};

const escapeCell = (value) => String(value ?? '—').replaceAll('|', '\\|').replaceAll('\r', ' ').replaceAll('\n', ' ');
const link = (label, url) => `[${escapeCell(label)}](${url})`;
const allCoverage = matrix.wards.flatMap((ward) => ward.coverage);
const embeddedSources = matrix.wards.flatMap((ward) => ward.sources);
const wardSources = embeddedSources.filter((source) => source.authority_level === 'ward');
const nationalSources = embeddedSources.filter((source) => source.authority_level === 'national');
const tokyoSources = embeddedSources.filter((source) => source.authority_level === 'tokyo');
const unknownUpdated = embeddedSources.filter((source) => source.official_updated_at == null);
const unknownWardUpdated = wardSources.filter((source) => source.official_updated_at == null);
const statusCounts = Object.fromEntries(Object.keys(statusLabels).map((status) => [
  status,
  allCoverage.filter((record) => record.coverage_status === status).length
]));

const subflowMeta = new Map();
for (const event of matrix.events) {
  event.subflows.forEach((subflow, index) => {
    subflowMeta.set(subflow.id, {
      ...subflow,
      event_id: event.id,
      code: `${eventPrefixes[event.id]}${String(index + 1).padStart(2, '0')}`
    });
  });
}

const lines = [];
const add = (...values) => lines.push(...values);
add(
  '# 东京23区 × 三条主线 × 子流程 × 官方来源矩阵',
  '',
  `核验与复核日期：${matrix.verified_on}（JST）  `,
  '机器可读数据：`data/ward_event_source_matrix.json`  ',
  '粒度：`区 × 事件 × 子流程`；每一项引用一个或多个已打开核验的官方来源或区政府明确链接的外部服务。',
  '',
  '## 结论',
  '',
  `- 23区、3个事件、33个子流程，共759项；覆盖键无重复。`,
  `- 复核后状态：完整${statusCounts.complete}、部分${statusCounts.partial}、缺失${statusCounts.missing}、待核${statusCounts.unverified}。`,
  `- 嵌入来源记录${embeddedSources.length}条＝区级${wardSources.length}＋全国${nationalSources.length}${tokyoSources.length ? `＋都级${tokyoSources.length}` : ''}；另有全国共通规范来源${matrix.common_sources.length}条。`,
  `- ${unknownUpdated.length}条嵌入来源未显示官方更新时间，其中区级来源${unknownWardUpdated.length}条；均保留为 \`official_updated_at = null\`，不以本项目核验日期代替。`,
  `- 唯一的“缺失”是涩谷区“身后手续窗口预约与协助”：已找到手册和手续索引，但未找到专门预约制身后手续窗口。`,
  '- 独立审阅抽查74个原“完整”样本后，纠正了预约/预填/窗口协助混标，并将保险、出产给付、遗属年金等跨承办方分支保守降为“部分”。',
  '',
  '状态图例：`完`=完整，`部`=部分，`缺`=搜索后未找到，`待`=已发现但尚未充分核验。',
  '',
  '## 三条主线与具体子流程',
  ''
);

for (const event of matrix.events) {
  add(`### ${event.name.zh} / ${event.name.ja} / ${event.name.en}`, '', '| 代码 | 子流程（中文） | 日本语 | English | 管辖 |', '|---|---|---|---|---|');
  for (const subflow of event.subflows) {
    const meta = subflowMeta.get(subflow.id);
    add(`| ${meta.code} | ${escapeCell(subflow.name.zh)} | ${escapeCell(subflow.name.ja)} | ${escapeCell(subflow.name.en)} | ${escapeCell(subflow.jurisdiction)} |`);
  }
  add('');
}

add('## 23区状态总览', '');
for (const event of matrix.events) {
  const codes = event.subflows.map((subflow) => subflowMeta.get(subflow.id).code);
  add(`### ${event.name.zh}`, '', `| 区 | ${codes.join(' | ')} |`, `|---|${codes.map(() => '---').join('|')}|`);
  for (const ward of matrix.wards) {
    const bySubflow = new Map(ward.coverage.map((record) => [record.subflow_id, record]));
    add(`| ${ward.ward_name} | ${event.subflows.map((subflow) => statusMarks[bySubflow.get(subflow.id).coverage_status]).join(' | ')} |`);
  }
  add('');
}

add('## 七种能力的严格区分', '', '| 字段 | 显示名 | 本矩阵判定边界 |', '|---|---|---|');
const capabilityRules = {
  information: '有说明页或指南；不代表能判断个人适用性，也不代表能提交。',
  questionnaire: '根据回答缩小适用手续；普通搜索、FAQ和聊天入口不自动算问答判定。',
  reservation: '能预约窗口或时段；仅发送来厅予定、取号或查看拥挤度不算预约。',
  prefill: '到厅前输入资料并生成可复用数据、二维码或申请书；空白PDF不算预填。',
  online_submission: '能正式电子提交申报或申请；预约、预填和资料传送不能替代此项。',
  mandatory_visit: '来源明确显示某主要分支仍须到窗口；可与其他分支在线提交同时为“是”。',
  assisted_counter: '专门窗口协助判断、制表、受理或跨部门引导；普通受理、家庭访问和健康咨询不算。'
};
for (const key of capabilityKeys) add(`| \`${key}\` | ${capabilityLabels[key]} | ${capabilityRules[key]} |`);
add('', '### 各区来源中明确为“是”的能力数量', '', '| 区 | 看说明 | 问答判定 | 预约 | 预填 | 正式在线提交 | 必须到厅 | 窗口协助 |', '|---|---:|---:|---:|---:|---:|---:|---:|');
for (const ward of matrix.wards) {
  const counts = capabilityKeys.map((key) => ward.sources.filter((source) => source.capabilities[key] === 'yes').length);
  add(`| ${ward.ward_name} | ${counts.join(' | ')} |`);
}
const capabilityTotals = capabilityKeys.map((key) => embeddedSources.filter((source) => source.capabilities[key] === 'yes').length);
add('', `全区嵌入来源记录合计：看说明${capabilityTotals[0]}、问答判定${capabilityTotals[1]}、预约${capabilityTotals[2]}、预填${capabilityTotals[3]}、正式在线提交${capabilityTotals[4]}、必须到厅${capabilityTotals[5]}、窗口协助${capabilityTotals[6]}。同一来源可同时证明多种能力。`, '');

const partialGroups = new Map();
for (const record of allCoverage.filter((item) => item.coverage_status === 'partial')) {
  const key = `${record.event_id}/${record.subflow_id}`;
  partialGroups.set(key, (partialGroups.get(key) ?? 0) + 1);
}
add('## 最常见的部分覆盖', '', '| 事件 / 子流程 | 区数 |', '|---|---:|');
for (const [key, count] of [...partialGroups.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
  add(`| ${key} | ${count} |`);
}
add('', '“部分”不是资料质量差，而是明确暴露边界：区国保与雇主保险、不同年金制度、国家机关与区政府、以及银行/保险/公共事业等民间手续不能被一个区级页面穷尽。', '');

add('## 全国共通规范来源', '', '| 来源 | 发布方 | 看说明 | 问答 | 预约 | 预填 | 在线提交 | 必须到厅 | 窗口协助 |', '|---|---|---|---|---|---|---|---|---|');
for (const source of matrix.common_sources) {
  const values = capabilityKeys.map((key) => capabilityValueLabels[source.capabilities[key]]);
  add(`| ${link(source.title, source.url)} | ${escapeCell(source.publisher)} | ${values.join(' | ')} |`);
}
add('');

add('## 23区逐项来源明细', '', '这一部分是给人工复核、线下走访和前端取数使用的完整明细。来源标题可直接打开；“部分/缺失”的差额不会被静默推断。', '');
for (const ward of matrix.wards) {
  const sourceById = new Map(ward.sources.map((source) => [source.source_id, source]));
  add(`### ${ward.ward_code} ${ward.ward_name}`, '', '| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |', '|---|---|---|---|---|');
  for (const event of matrix.events) {
    for (const subflow of event.subflows) {
      const meta = subflowMeta.get(subflow.id);
      const record = ward.coverage.find((candidate) => candidate.subflow_id === subflow.id);
      const sources = record.source_ids.map((sourceId) => {
        const source = sourceById.get(sourceId);
        if (!source) throw new Error(`Missing source ${ward.ward_code}/${sourceId}`);
        const main = link(source.title, source.url);
        if (source.host_type === 'vendor_hosted' && source.official_wrapper_url) {
          return `${main}（[区官方入口](${source.official_wrapper_url})）`;
        }
        return main;
      });
      const note = record.gap_note || (record.coverage_status === 'complete' ? '主要公开分支已覆盖；不等于一次到厅即可全部办结。' : record.status_reason);
      add(`| ${meta.code} | ${escapeCell(subflow.name.zh)} | ${statusLabels[record.coverage_status]} | ${sources.length ? sources.join('<br>') : '—'} | ${escapeCell(note)} |`);
    }
  }
  add('');
}

add(
  '## 使用限制与下一步线下核验',
  '',
  '- `complete` 只表示公开来源对定义中的主要分支有直接证据，不表示现场一定一次办完。',
  '- `unknown` 表示来源没有足够证据；不能自动解释为“没有此能力”。',
  '- 实际等待时间、原件返还、跨科室联办、代理人例外、现场口译和无障碍支持仍需线下确认。',
  '- 页面、SaaS导航和制度会更新；后续应按 `official_updated_at`、`verified_on` 和URL变更做增量复核。',
  '',
  '## 文件',
  '',
  '- `CORE_SUBFLOWS_2026-08-10.md`：33个子流程及现有引擎ID映射。',
  '- `data/ward_event_subflows.json`：三语言子流程定义。',
  '- `data/common_event_sources.json`：12个全国共通规范来源。',
  '- `data/ward_event_source_matrix.json`：23区、759项覆盖与七能力字段。',
  '- `data/ward_event_matrix_review_corrections.json`：独立审阅后的修正账本。',
  '- `data/research_parts/`：三个原始研究分片，保留审计轨迹。',
  '- `sources/apply_ward_event_matrix_review.mjs` 与两个 `validate_*.mjs`：可重复应用及验收。',
  ''
);

fs.writeFileSync(reportPath, `${lines.join('\n')}\n`, 'utf8');
fs.writeFileSync(
  supersededPath,
  '# 已由复核版取代\n\n本文件是复核前报告。请改看 [WARD_EVENT_SOURCE_MATRIX_2026-08-11.md](WARD_EVENT_SOURCE_MATRIX_2026-08-11.md)。\n',
  'utf8'
);
console.log(`WROTE ${path.basename(reportPath)} lines=${lines.length}`);
