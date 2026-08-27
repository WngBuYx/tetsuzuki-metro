# 东京23区 × 三条主线 × 子流程 × 官方来源矩阵

核验与复核日期：2026-08-11（JST）  
机器可读数据：`data/ward_event_source_matrix.json`  
粒度：`区 × 事件 × 子流程`；每一项引用一个或多个已打开核验的官方来源或区政府明确链接的外部服务。

## 结论

- 23区、3个事件、33个子流程，共759项；覆盖键无重复。
- 复核后状态：完整570、部分188、缺失1、待核0。
- 嵌入来源记录319条＝区级219＋全国100；另有全国共通规范来源12条。
- 134条嵌入来源未显示官方更新时间，其中区级来源72条；均保留为 `official_updated_at = null`，不以本项目核验日期代替。
- 唯一的“缺失”是涩谷区“身后手续窗口预约与协助”：已找到手册和手续索引，但未找到专门预约制身后手续窗口。
- 独立审阅抽查74个原“完整”样本后，纠正了预约/预填/窗口协助混标，并将保险、出产给付、遗属年金等跨承办方分支保守降为“部分”。

状态图例：`完`=完整，`部`=部分，`缺`=搜索后未找到，`待`=已发现但尚未充分核验。

## 三条主线与具体子流程

### 搬家 / 引っ越し / Moving

| 代码 | 子流程（中文） | 日本语 | English | 管辖 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 引越し手続案内 | Moving procedure guidance | ward |
| M02 | 迁出申报 | 転出届 | Moving-out notification | ward |
| M03 | MyNa在线迁出 | マイナポータル転出届 | MyNa Portal online moving-out | national_ward |
| M04 | 迁入申报 | 転入届 | Moving-in notification | ward |
| M05 | 区内迁居申报 | 転居届 | Intra-ward move notification | ward |
| M06 | My Number地址更新与继续使用 | マイナンバー住所変更・継続利用 | My Number address update and continued use | ward |
| M07 | 国民健康保险迁移手续 | 国民健康保険の異動 | National Health Insurance move procedures | ward |
| M08 | 儿童津贴迁移手续 | 児童手当の異動 | Child allowance move procedures | ward |
| M09 | 介护保险迁移手续 | 介護保険の異動 | Long-term care insurance move procedures | ward |
| M10 | 印鉴登记迁移手续 | 印鑑登録の異動 | Seal registration move procedures | ward |
| M11 | 必须到厅事项 | 来庁必須事項 | Mandatory visit summary | derived |

### 妊娠、出生、育儿 / 妊娠・出産・子育て / Pregnancy, birth and child-rearing

| 代码 | 子流程（中文） | 日本语 | English | 管辖 |
|---|---|---|---|---|
| C01 | 妊娠申报与母子健康手册 | 妊娠届・母子健康手帳 | Pregnancy notification and handbook | ward |
| C02 | 孕妇面谈与伴走支援 | 妊婦面接・伴走支援 | Pregnancy interview and support | ward |
| C03 | 出生申报 | 出生届 | Birth notification | ward |
| C04 | 孩子加入健康保险 | 子どもの健康保険加入 | Child health insurance enrollment | ward_employer |
| C05 | 儿童津贴 | 児童手当 | Child allowance | ward |
| C06 | 儿童医疗费补助 | 子ども医療費助成 | Child medical subsidy | ward |
| C07 | 出产育儿一时金 | 出産育児一時金 | Childbirth lump-sum benefit | insurer |
| C08 | 新生儿访问与保健指导 | 新生児訪問・保健指導 | Newborn visit and health guidance | ward |
| C09 | 外国籍孩子取得在留资格 | 外国籍児の在留資格取得 | Residence status for a foreign-national child | national |
| C10 | 育儿支援导航 | 子育て支援案内 | Child-rearing support navigation | ward_tokyo |

### 死亡与身后手续 / 死亡・おくやみ / Death and bereavement

| 代码 | 子流程（中文） | 日本语 | English | 管辖 |
|---|---|---|---|---|
| D01 | 身后手续导航 | おくやみ手続案内 | Bereavement procedure guidance | ward |
| D02 | 死亡申报与火葬许可 | 死亡届・火葬許可 | Death notification and cremation permit | ward |
| D03 | 住民记录与户主变更 | 住民記録・世帯主変更 | Resident register and household-head change | ward |
| D04 | My Number与印鉴登记证处理 | マイナンバー・印鑑登録証 | My Number and seal-registration-card handling | ward |
| D05 | 健康保险资料返还 | 健康保険資格確認書等の返納 | Health insurance document return | ward |
| D06 | 葬祭费 | 葬祭費 | Funeral benefit | ward |
| D07 | 介护保险资料返还 | 介護保険証等の返納 | Long-term care insurance document return | ward |
| D08 | 年金与遗属给付 | 年金・遺族給付 | Pension and survivor benefits | ward_national |
| D09 | 住民税继承人代表 | 住民税相続人代表者 | Resident-tax heir representative | ward |
| D10 | 在留卡等返还 | 在留カード等の返納 | Residence-card return | national |
| D11 | 身后手续窗口预约与协助 | おくやみ窓口予約・支援 | Bereavement counter reservation and assistance | ward |
| D12 | 继承及民间手续转介 | 相続・民間手続への案内 | Inheritance and private-procedure referrals | mixed |

## 23区状态总览

### 搬家

| 区 | M01 | M02 | M03 | M04 | M05 | M06 | M07 | M08 | M09 | M10 | M11 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 千代田区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 |
| 中央区 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 部 | 部 | 完 |
| 港区 | 部 | 完 | 完 | 完 | 完 | 部 | 完 | 部 | 部 | 部 | 完 |
| 新宿区 | 部 | 完 | 完 | 完 | 完 | 部 | 部 | 部 | 部 | 部 | 完 |
| 文京区 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 部 | 完 | 完 |
| 台東区 | 部 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 完 | 完 |
| 墨田区 | 部 | 完 | 完 | 完 | 完 | 部 | 部 | 部 | 部 | 部 | 完 |
| 江東区 | 部 | 完 | 完 | 完 | 完 | 部 | 部 | 部 | 部 | 部 | 完 |
| 品川区 | 完 | 部 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 |
| 目黒区 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 部 | 部 | 部 | 完 |
| 大田区 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 部 | 部 | 部 | 完 |
| 世田谷区 | 部 | 部 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 |
| 渋谷区 | 部 | 部 | 完 | 完 | 部 | 完 | 部 | 部 | 完 | 部 | 部 |
| 中野区 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 部 | 部 | 完 |
| 杉並区 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 部 | 部 | 部 | 部 |
| 豊島区 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 部 | 部 | 部 | 完 |
| 北区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 完 | 完 |
| 荒川区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 |
| 板橋区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 |
| 練馬区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 |
| 足立区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 完 | 完 |
| 葛飾区 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 部 | 完 | 完 |
| 江戸川区 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 完 | 完 |

### 妊娠、出生、育儿

| 区 | C01 | C02 | C03 | C04 | C05 | C06 | C07 | C08 | C09 | C10 |
|---|---|---|---|---|---|---|---|---|---|---|
| 千代田区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 中央区 | 完 | 部 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 港区 | 部 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 新宿区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 文京区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 台東区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 墨田区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 江東区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 品川区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 部 | 完 | 部 |
| 目黒区 | 完 | 部 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 大田区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 世田谷区 | 完 | 完 | 部 | 部 | 部 | 部 | 部 | 部 | 完 | 部 |
| 渋谷区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 中野区 | 完 | 部 | 完 | 部 | 完 | 部 | 部 | 完 | 完 | 完 |
| 杉並区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 豊島区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 北区 | 完 | 完 | 完 | 部 | 部 | 部 | 部 | 完 | 完 | 完 |
| 荒川区 | 完 | 部 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 板橋区 | 完 | 完 | 部 | 部 | 部 | 部 | 部 | 完 | 完 | 完 |
| 練馬区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 足立区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 葛飾区 | 完 | 完 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |
| 江戸川区 | 完 | 部 | 完 | 部 | 完 | 完 | 部 | 完 | 完 | 完 |

### 死亡与身后手续

| 区 | D01 | D02 | D03 | D04 | D05 | D06 | D07 | D08 | D09 | D10 | D11 | D12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 千代田区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 完 | 完 | 部 |
| 中央区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 完 | 完 | 部 |
| 港区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 完 | 完 | 部 |
| 新宿区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 完 | 完 | 部 |
| 文京区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 部 |
| 台東区 | 完 | 完 | 部 | 完 | 完 | 完 | 完 | 部 | 部 | 完 | 完 | 部 |
| 墨田区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 部 | 完 | 完 | 部 |
| 江東区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 部 |
| 品川区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 完 |
| 目黒区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 部 |
| 大田区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 完 |
| 世田谷区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 部 |
| 渋谷区 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 部 | 部 | 完 | 缺 | 部 |
| 中野区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 部 |
| 杉並区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 部 |
| 豊島区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 部 |
| 北区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 完 |
| 荒川区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 完 |
| 板橋区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 完 |
| 練馬区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 完 |
| 足立区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 完 |
| 葛飾区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 完 |
| 江戸川区 | 完 | 完 | 完 | 完 | 完 | 完 | 完 | 部 | 完 | 完 | 完 | 完 |

## 七种能力的严格区分

| 字段 | 显示名 | 本矩阵判定边界 |
|---|---|---|
| `information` | 看说明 | 有说明页或指南；不代表能判断个人适用性，也不代表能提交。 |
| `questionnaire` | 问答判定 | 根据回答缩小适用手续；普通搜索、FAQ和聊天入口不自动算问答判定。 |
| `reservation` | 预约 | 能预约窗口或时段；仅发送来厅予定、取号或查看拥挤度不算预约。 |
| `prefill` | 预填 | 到厅前输入资料并生成可复用数据、二维码或申请书；空白PDF不算预填。 |
| `online_submission` | 正式在线提交 | 能正式电子提交申报或申请；预约、预填和资料传送不能替代此项。 |
| `mandatory_visit` | 必须到窗口 | 来源明确显示某主要分支仍须到窗口；可与其他分支在线提交同时为“是”。 |
| `assisted_counter` | 窗口协助 | 专门窗口协助判断、制表、受理或跨部门引导；普通受理、家庭访问和健康咨询不算。 |

### 各区来源中明确为“是”的能力数量

| 区 | 看说明 | 问答判定 | 预约 | 预填 | 正式在线提交 | 必须到厅 | 窗口协助 |
|---|---:|---:|---:|---:|---:|---:|---:|
| 千代田区 | 16 | 1 | 2 | 2 | 3 | 7 | 2 |
| 中央区 | 13 | 2 | 1 | 0 | 3 | 6 | 1 |
| 港区 | 14 | 1 | 3 | 1 | 2 | 5 | 2 |
| 新宿区 | 13 | 0 | 2 | 1 | 4 | 4 | 2 |
| 文京区 | 13 | 1 | 2 | 1 | 3 | 5 | 1 |
| 台東区 | 12 | 0 | 2 | 1 | 3 | 4 | 1 |
| 墨田区 | 13 | 0 | 3 | 1 | 5 | 6 | 1 |
| 江東区 | 14 | 1 | 2 | 1 | 3 | 5 | 2 |
| 品川区 | 11 | 0 | 2 | 0 | 3 | 8 | 1 |
| 目黒区 | 11 | 2 | 2 | 0 | 2 | 6 | 1 |
| 大田区 | 12 | 2 | 3 | 1 | 3 | 6 | 1 |
| 世田谷区 | 12 | 2 | 2 | 0 | 3 | 6 | 1 |
| 渋谷区 | 16 | 2 | 1 | 0 | 4 | 6 | 0 |
| 中野区 | 17 | 2 | 1 | 1 | 6 | 8 | 2 |
| 杉並区 | 16 | 3 | 3 | 0 | 4 | 7 | 2 |
| 豊島区 | 16 | 1 | 2 | 0 | 4 | 9 | 1 |
| 北区 | 12 | 2 | 1 | 1 | 4 | 4 | 2 |
| 荒川区 | 13 | 2 | 1 | 1 | 4 | 5 | 2 |
| 板橋区 | 15 | 2 | 1 | 2 | 6 | 5 | 3 |
| 練馬区 | 16 | 2 | 1 | 0 | 7 | 3 | 2 |
| 足立区 | 14 | 1 | 3 | 2 | 8 | 6 | 3 |
| 葛飾区 | 15 | 0 | 2 | 1 | 6 | 6 | 2 |
| 江戸川区 | 13 | 1 | 1 | 0 | 7 | 4 | 2 |

全区嵌入来源记录合计：看说明317、问答判定30、预约43、预填17、正式在线提交97、必须到厅131、窗口协助37。同一来源可同时证明多种能力。

## 最常见的部分覆盖

| 事件 / 子流程 | 区数 |
|---|---:|
| childbirth/child_health_insurance | 23 |
| childbirth/childbirth_lump_sum | 23 |
| death/pension_survivor_procedures | 23 |
| moving/care_insurance_move | 16 |
| moving/child_allowance_move | 15 |
| death/inheritance_referral | 14 |
| moving/national_health_insurance_move | 12 |
| moving/seal_registration_move | 11 |
| moving/mynumber_address_continued_use | 10 |
| death/resident_tax_heir_representative | 7 |
| moving/moving_guidance | 7 |
| childbirth/pregnancy_interview_support | 5 |
| childbirth/child_medical_subsidy | 4 |
| childbirth/child_allowance_birth | 3 |
| moving/move_out_notification | 3 |
| childbirth/birth_notification | 2 |
| childbirth/childcare_support_navigation | 2 |
| childbirth/newborn_visit_health_guidance | 2 |
| moving/mandatory_visit_summary | 2 |
| childbirth/pregnancy_notification_handbook | 1 |
| death/household_register_change | 1 |
| death/mynumber_seal_return | 1 |
| moving/intra_ward_move_notification | 1 |

“部分”不是资料质量差，而是明确暴露边界：区国保与雇主保险、不同年金制度、国家机关与区政府、以及银行/保险/公共事业等民间手续不能被一个区级页面穷尽。

## 全国共通规范来源

| 来源 | 发布方 | 看说明 | 问答 | 预约 | 预填 | 在线提交 | 必须到厅 | 窗口协助 |
|---|---|---|---|---|---|---|---|---|
| [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | デジタル庁 | 是 | 否 | 否 | 否 | 是 | 是 | 不适用 |
| [引越し関連手続一覧](https://myna.go.jp/html/moving_oss_procedure_list.html) | マイナポータル | 是 | 否 | 不适用 | 不适用 | 不适用 | 是 | 不适用 |
| [子育て支援制度レジストリ](https://www.digital.go.jp/policies/childrearing-support-registry) | デジタル庁 | 是 | 不适用 | 不适用 | 不适用 | 不适用 | 不适用 | 不适用 |
| [在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 出入国在留管理庁 | 是 | 否 | 否 | 否 | 是 | 未知 | 未知 |
| [在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 出入国在留管理庁 | 是 | 否 | 不适用 | 否 | 否 | 否 | 未知 |
| [出産育児一時金等について](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html) | 厚生労働省 | 是 | 否 | 不适用 | 未知 | 未知 | 未知 | 未知 |
| [年金を受けている方が亡くなったとき](https://www.nenkin.go.jp/service/jukyu/tetsuduki/kyotsu/jukyu/20140731-01.html) | 日本年金機構 | 是 | 否 | 未知 | 未知 | 是 | 否 | 是 |
| [納税者が死亡したときの確定申告（準確定申告）](https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/2022.htm) | 国税庁 | 是 | 否 | 不适用 | 未知 | 是 | 否 | 是 |
| [相続税の申告手続](https://www.nta.go.jp/taxes/tetsuzuki/shinsei/annai/sozoku-zoyo/annai/2223-01.htm) | 国税庁 | 是 | 否 | 不适用 | 未知 | 未知 | 未知 | 是 |
| [相続の放棄の申述](https://www.courts.go.jp/saiban/syurui/syurui_kazi/kazi_06_13/index.html) | 裁判所 | 是 | 否 | 未知 | 是 | 未知 | 未知 | 是 |
| [相続登記の申請義務化について](https://www.moj.go.jp/MINJI/minji05_00599.html) | 法務省 | 是 | 否 | 未知 | 未知 | 未知 | 未知 | 是 |
| [法定相続情報証明制度について](https://houmukyoku.moj.go.jp/homu/page7_000013.html) | 法務局 | 是 | 否 | 未知 | 是 | 未知 | 未知 | 是 |

## 23区逐项来源明细

这一部分是给人工复核、线下走访和前端取数使用的完整明细。来源标题可直接打开；“部分/缺失”的差额不会被静默推断。

### 13101 千代田区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [千代田区手続きガイド～あなたに必要な手続きや持ち物が確認できます～](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/tetsuzukiguide.html)<br>[千代田区 手続きガイド](https://ttzk.graffer.jp/ward-chiyoda)（[区官方入口](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/tetsuzukiguide.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [転入・転出](https://www.city.chiyoda.lg.jp/lifeevent/tennyu/index.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [転入・転出](https://www.city.chiyoda.lg.jp/lifeevent/tennyu/index.html)<br>[転居届（千代田区内で住所を異動するとき）](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/jumintoroku/tenkyo.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [転入・転出](https://www.city.chiyoda.lg.jp/lifeevent/tennyu/index.html)<br>[転居届（千代田区内で住所を異動するとき）](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/jumintoroku/tenkyo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [転入・転出](https://www.city.chiyoda.lg.jp/lifeevent/tennyu/index.html)<br>[転居届（千代田区内で住所を異動するとき）](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/jumintoroku/tenkyo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 完整 | [転居届（千代田区内で住所を異動するとき）](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/jumintoroku/tenkyo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 完整 | [国民健康保険のしくみと手続き（加入・脱退・再交付・資格確認書交付申請）](https://www.city.chiyoda.lg.jp/koho/kurashi/hoken/kenkohoken/kokuho.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M08 | 儿童津贴迁移手续 | 完整 | [児童手当に関する各種届出ほか](https://www.city.chiyoda.lg.jp/koho/kosodate/teate/jidoteate/kakushu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M09 | 介护保险迁移手续 | 部分 | [千代田区 手続きガイド](https://ttzk.graffer.jp/ward-chiyoda)（[区官方入口](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/tetsuzukiguide.html)）<br>[転入・転出](https://www.city.chiyoda.lg.jp/lifeevent/tennyu/index.html) | 証類・受給資格等の転入・転出・区内転居全分岐を専用詳細ページで揃えていない。 |
| M10 | 印鉴登记迁移手续 | 完整 | [転入・転出](https://www.city.chiyoda.lg.jp/lifeevent/tennyu/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M11 | 必须到厅事项 | 完整 | [転入・転出](https://www.city.chiyoda.lg.jp/lifeevent/tennyu/index.html)<br>[転居届（千代田区内で住所を異動するとき）](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/jumintoroku/tenkyo.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠・出産](https://www.city.chiyoda.lg.jp/lifeevent/ninshin/index.html)<br>[妊娠届・母子健康手帳の交付](https://www.city.chiyoda.lg.jp/koho/kosodate/kosodate/ninshin/boshitecho.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [ままぱぱ面談（妊婦の全数面談事業）](https://www.city.chiyoda.lg.jp/koho/kosodate/kosodate/ninshin/chiyomama.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [妊娠・出産](https://www.city.chiyoda.lg.jp/lifeevent/ninshin/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [妊娠・出産](https://www.city.chiyoda.lg.jp/lifeevent/ninshin/index.html)<br>[国民健康保険のしくみと手続き（加入・脱退・再交付・資格確認書交付申請）](https://www.city.chiyoda.lg.jp/koho/kurashi/hoken/kenkohoken/kokuho.html) | 被用者保険は勤務先・健保組合が主体で、全保険者の様式・オンライン可否を区ページで完結できない。 |
| C05 | 儿童津贴 | 完整 | [妊娠・出産](https://www.city.chiyoda.lg.jp/lifeevent/ninshin/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [妊娠・出産](https://www.city.chiyoda.lg.jp/lifeevent/ninshin/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [妊娠・出産](https://www.city.chiyoda.lg.jp/lifeevent/ninshin/index.html)<br>[出産育児一時金等について](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html) | 実様式と提出先は加入保険者・医療機関で異なり個別保険者まで一括確認できない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [妊娠・出産](https://www.city.chiyoda.lg.jp/lifeevent/ninshin/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [妊娠・出産](https://www.city.chiyoda.lg.jp/lifeevent/ninshin/index.html)<br>[在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [妊娠・出産](https://www.city.chiyoda.lg.jp/lifeevent/ninshin/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [千代田区 手続きガイド](https://ttzk.graffer.jp/ward-chiyoda)（[区官方入口](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/tetsuzukiguide.html)）<br>[千代田区おくやみガイドブック2025](https://www.city.chiyoda.lg.jp/documents/4739/okuyami-guidebook2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [千代田区おくやみガイドブック2025](https://www.city.chiyoda.lg.jp/documents/4739/okuyami-guidebook2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [千代田区おくやみガイドブック2025](https://www.city.chiyoda.lg.jp/documents/4739/okuyami-guidebook2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [千代田区おくやみガイドブック2025](https://www.city.chiyoda.lg.jp/documents/4739/okuyami-guidebook2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [千代田区おくやみガイドブック2025](https://www.city.chiyoda.lg.jp/documents/4739/okuyami-guidebook2025.pdf)<br>[おくやみコーナー](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/okuyamicorner.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [千代田区おくやみガイドブック2025](https://www.city.chiyoda.lg.jp/documents/4739/okuyami-guidebook2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [千代田区おくやみガイドブック2025](https://www.city.chiyoda.lg.jp/documents/4739/okuyami-guidebook2025.pdf)<br>[おくやみコーナー](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/okuyamicorner.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [千代田区おくやみガイドブック2025](https://www.city.chiyoda.lg.jp/documents/4739/okuyami-guidebook2025.pdf)<br>[身近な方が亡くなったとき](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 加入制度・受給状況・遺族要件により年金事務所・共済等へ分岐し、個別提出先を一律確定できない。 |
| D09 | 住民税继承人代表 | 部分 | [千代田区おくやみガイドブック2025](https://www.city.chiyoda.lg.jp/documents/4739/okuyami-guidebook2025.pdf) | 相続人代表者届の要否、様式、提出チャネルを専用ページで再確認できていない。 |
| D10 | 在留卡等返还 | 完整 | [千代田区おくやみガイドブック2025](https://www.city.chiyoda.lg.jp/documents/4739/okuyami-guidebook2025.pdf)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみコーナー](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/okuyamicorner.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [千代田区おくやみガイドブック2025](https://www.city.chiyoda.lg.jp/documents/4739/okuyami-guidebook2025.pdf) | 銀行、証券、保険、公共料金、不動産登記等は状況で変わり、区資料だけで網羅・完結できない。 |

### 13102 中央区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [手続きナビ](https://www.city.chuo.lg.jp/tetsuduki/index.php) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [住民の異動の届出（転入・転出など）](https://www.city.chuo.lg.jp/kurashi/touroku/juuminidou/index.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越しワンストップサービスの利用](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/juuminidou/hikkoshioss.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [住民の異動の届出（転入・転出など）](https://www.city.chuo.lg.jp/kurashi/touroku/juuminidou/index.html)<br>[引越しワンストップサービスの利用](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/juuminidou/hikkoshioss.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [住民の異動の届出（転入・転出など）](https://www.city.chuo.lg.jp/kurashi/touroku/juuminidou/index.html)<br>[引越しワンストップサービスの利用](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/juuminidou/hikkoshioss.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 完整 | [転入届：マイナンバーカードを使って本人または同じ世帯の方が手続きするとき](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/juuminidou/tennyuu/mynocd-ari/tokureitennnyuu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 部分 | [手続きナビ](https://www.city.chuo.lg.jp/tetsuduki/index.php)<br>[住民の異動の届出（転入・転出など）](https://www.city.chuo.lg.jp/kurashi/touroku/juuminidou/index.html) | 加入・喪失・世帯変更の全分岐と提出チャネルを同一精度で確認できていない。 |
| M08 | 儿童津贴迁移手续 | 部分 | [手続きナビ](https://www.city.chuo.lg.jp/tetsuduki/index.php)<br>[子育てガイドブック](https://www.city.chuo.lg.jp/a0020/kosodate/kosodate/shien/sasshi/kosodateguidebook.html) | 転入・転出・区内転居、受給者のみ移動等の全条件を専用詳細ページで揃えていない。 |
| M09 | 介护保险迁移手续 | 部分 | [手続きナビ](https://www.city.chuo.lg.jp/tetsuduki/index.php) | 証類・受給資格等の転入・転出・区内転居全分岐を専用詳細ページで揃えていない。 |
| M10 | 印鉴登记迁移手续 | 部分 | [手続きナビ](https://www.city.chuo.lg.jp/tetsuduki/index.php)<br>[住民の異動の届出（転入・転出など）](https://www.city.chuo.lg.jp/kurashi/touroku/juuminidou/index.html) | 転出失効、区内転居の自動変更、転入後登録を同一精度で確認できていない。 |
| M11 | 必须到厅事项 | 完整 | [引越しワンストップサービスの利用](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/juuminidou/hikkoshioss.html)<br>[住民の異動の届出（転入・転出など）](https://www.city.chuo.lg.jp/kurashi/touroku/juuminidou/index.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [子育てガイドブック](https://www.city.chuo.lg.jp/a0020/kosodate/kosodate/shien/sasshi/kosodateguidebook.html)<br>[手続きナビ：出生](https://www.city.chuo.lg.jp/tetsuduki/question.php?cate=shussho) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 部分 | [子育てガイドブック](https://www.city.chuo.lg.jp/a0020/kosodate/kosodate/shien/sasshi/kosodateguidebook.html) | 予約、オンライン可否、給付との関係を専用ページで再確認できていない。 |
| C03 | 出生申报 | 完整 | [子育てガイドブック](https://www.city.chuo.lg.jp/a0020/kosodate/kosodate/shien/sasshi/kosodateguidebook.html)<br>[手続きナビ：出生](https://www.city.chuo.lg.jp/tetsuduki/question.php?cate=shussho) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [子育てガイドブック](https://www.city.chuo.lg.jp/a0020/kosodate/kosodate/shien/sasshi/kosodateguidebook.html)<br>[手続きナビ：出生](https://www.city.chuo.lg.jp/tetsuduki/question.php?cate=shussho)<br>[手続きナビ](https://www.city.chuo.lg.jp/tetsuduki/index.php)<br>[住民の異動の届出（転入・転出など）](https://www.city.chuo.lg.jp/kurashi/touroku/juuminidou/index.html) | 被用者保険は勤務先・健保組合が主体で、全保険者の様式・オンライン可否を区ページで完結できない。 |
| C05 | 儿童津贴 | 完整 | [子育てガイドブック](https://www.city.chuo.lg.jp/a0020/kosodate/kosodate/shien/sasshi/kosodateguidebook.html)<br>[手続きナビ：出生](https://www.city.chuo.lg.jp/tetsuduki/question.php?cate=shussho) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [子育てガイドブック](https://www.city.chuo.lg.jp/a0020/kosodate/kosodate/shien/sasshi/kosodateguidebook.html)<br>[手続きナビ：出生](https://www.city.chuo.lg.jp/tetsuduki/question.php?cate=shussho) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [子育てガイドブック](https://www.city.chuo.lg.jp/a0020/kosodate/kosodate/shien/sasshi/kosodateguidebook.html)<br>[手続きナビ：出生](https://www.city.chuo.lg.jp/tetsuduki/question.php?cate=shussho)<br>[出産育児一時金等について](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html) | 実様式と提出先は加入保険者・医療機関で異なり個別保険者まで一括確認できない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [子育てガイドブック](https://www.city.chuo.lg.jp/a0020/kosodate/kosodate/shien/sasshi/kosodateguidebook.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [子育てガイドブック](https://www.city.chuo.lg.jp/a0020/kosodate/kosodate/shien/sasshi/kosodateguidebook.html)<br>[手続きナビ：出生](https://www.city.chuo.lg.jp/tetsuduki/question.php?cate=shussho)<br>[在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [子育てガイドブック](https://www.city.chuo.lg.jp/a0020/kosodate/kosodate/shien/sasshi/kosodateguidebook.html)<br>[手続きナビ：出生](https://www.city.chuo.lg.jp/tetsuduki/question.php?cate=shussho) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [手続きナビ](https://www.city.chuo.lg.jp/tetsuduki/index.php)<br>[おくやみハンドブック](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [おくやみハンドブック](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [おくやみハンドブック](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [おくやみハンドブック](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [おくやみハンドブック](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/koseki/okuyami.html)<br>[おくやみコーナーのご案内](https://www.city.chuo.lg.jp/a0012/syohisikatsu/20240621.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [おくやみハンドブック](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [おくやみハンドブック](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/koseki/okuyami.html)<br>[おくやみコーナーのご案内](https://www.city.chuo.lg.jp/a0012/syohisikatsu/20240621.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [おくやみハンドブック](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/koseki/okuyami.html)<br>[身近な方が亡くなったとき](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 加入制度・受給状況・遺族要件により年金事務所・共済等へ分岐し、個別提出先を一律確定できない。 |
| D09 | 住民税继承人代表 | 部分 | [おくやみハンドブック](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/koseki/okuyami.html) | 相続人代表者届の要否、様式、提出チャネルを専用ページで再確認できていない。 |
| D10 | 在留卡等返还 | 完整 | [おくやみハンドブック](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/koseki/okuyami.html)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみコーナーのご案内](https://www.city.chuo.lg.jp/a0012/syohisikatsu/20240621.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [おくやみハンドブック](https://www.city.chuo.lg.jp/a0012/kurashi/touroku/koseki/okuyami.html) | 銀行、証券、保険、公共料金、不動産登記等は状況で変わり、区資料だけで網羅・完結できない。 |

### 13103 港区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 部分 | [引越しに関する手続き](https://www.city.minato.tokyo.jp/kurashi/todokede/index-todokede02.html) | 個人条件に応じた質問分岐ではなく静的ナビ。 |
| M02 | 迁出申报 | 完整 | [引越しに関する手続き](https://www.city.minato.tokyo.jp/kurashi/todokede/index-todokede02.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越しに関する手続き](https://www.city.minato.tokyo.jp/kurashi/todokede/index-todokede02.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引越しに関する手続き](https://www.city.minato.tokyo.jp/kurashi/todokede/index-todokede02.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引越しに関する手続き](https://www.city.minato.tokyo.jp/kurashi/todokede/index-todokede02.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 部分 | [引越しに関する手続き](https://www.city.minato.tokyo.jp/kurashi/todokede/index-todokede02.html) | 継続利用期限、暗証番号、代理人等の例外条件を専用詳細ページで揃えていない。 |
| M07 | 国民健康保险迁移手续 | 完整 | [届出が必要なとき](https://www.city.minato.tokyo.jp/shikaku/kurashi/hoken/kenkohoken/todokede.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M08 | 儿童津贴迁移手续 | 部分 | [引越しに関する手続き](https://www.city.minato.tokyo.jp/kurashi/todokede/index-todokede02.html)<br>[出産したら](https://www.city.minato.tokyo.jp/kodomokyufu/kenko/ninshin/shussan/shussanshitara.html) | 転入・転出・区内転居、受給者のみ移動等の全条件を専用詳細ページで揃えていない。 |
| M09 | 介护保险迁移手续 | 部分 | [引越しに関する手続き](https://www.city.minato.tokyo.jp/kurashi/todokede/index-todokede02.html) | 証類・受給資格等の転入・転出・区内転居全分岐を専用詳細ページで揃えていない。 |
| M10 | 印鉴登记迁移手续 | 部分 | [引越しに関する手続き](https://www.city.minato.tokyo.jp/kurashi/todokede/index-todokede02.html) | 転出失効、区内転居の自動変更、転入後登録を同一精度で確認できていない。 |
| M11 | 必须到厅事项 | 完整 | [引越しに関する手続き](https://www.city.minato.tokyo.jp/kurashi/todokede/index-todokede02.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 部分 | [出産したら](https://www.city.minato.tokyo.jp/kodomokyufu/kenko/ninshin/shussan/shussanshitara.html) | 妊娠届の提出チャネル、母子手帳交付の持ち物・代理条件を専用ページで揃えていない。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [みなとプレママ応援事業（妊婦全員面接）](https://www.city.minato.tokyo.jp/chiikihoken/puremama.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [出産したら](https://www.city.minato.tokyo.jp/kodomokyufu/kenko/ninshin/shussan/shussanshitara.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [出産したら](https://www.city.minato.tokyo.jp/kodomokyufu/kenko/ninshin/shussan/shussanshitara.html)<br>[届出が必要なとき](https://www.city.minato.tokyo.jp/shikaku/kurashi/hoken/kenkohoken/todokede.html) | 被用者保険は勤務先・健保組合が主体で、全保険者の様式・オンライン可否を区ページで完結できない。 |
| C05 | 儿童津贴 | 完整 | [出産したら](https://www.city.minato.tokyo.jp/kodomokyufu/kenko/ninshin/shussan/shussanshitara.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [出産したら](https://www.city.minato.tokyo.jp/kodomokyufu/kenko/ninshin/shussan/shussanshitara.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [出産したら](https://www.city.minato.tokyo.jp/kodomokyufu/kenko/ninshin/shussan/shussanshitara.html)<br>[出産育児一時金等について](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html) | 実様式と提出先は加入保険者・医療機関で異なり個別保険者まで一括確認できない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [こんにちは赤ちゃん訪問](https://www.city.minato.tokyo.jp/chiikihoken/kenko/kenko/boshi/1saimiman/homon.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [出産したら](https://www.city.minato.tokyo.jp/kodomokyufu/kenko/ninshin/shussan/shussanshitara.html)<br>[在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [出産したら](https://www.city.minato.tokyo.jp/kodomokyufu/kenko/ninshin/shussan/shussanshitara.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [ご家族等が亡くなった際の手続き](https://www.city.minato.tokyo.jp/kurashi/sogi/index-tetuduki.html)<br>[港区 手続きガイド（おくやみ）](https://ttzk.graffer.jp/ward-minato?ttzk-guides=true)（[区官方入口](https://www.city.minato.tokyo.jp/kurashi/sogi/index-tetuduki.html)）<br>[ご遺族の方へ 各種手続きのご案内](https://www.city.minato.tokyo.jp/documents/131753/20260330095851.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [ご遺族の方へ 各種手続きのご案内](https://www.city.minato.tokyo.jp/documents/131753/20260330095851.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [ご遺族の方へ 各種手続きのご案内](https://www.city.minato.tokyo.jp/documents/131753/20260330095851.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [ご遺族の方へ 各種手続きのご案内](https://www.city.minato.tokyo.jp/documents/131753/20260330095851.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [ご遺族の方へ 各種手続きのご案内](https://www.city.minato.tokyo.jp/documents/131753/20260330095851.pdf)<br>[ご遺族支援コーナー](https://www.city.minato.tokyo.jp/shibamadochou/kurashi/goizoku/corner.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [ご遺族の方へ 各種手続きのご案内](https://www.city.minato.tokyo.jp/documents/131753/20260330095851.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [ご遺族の方へ 各種手続きのご案内](https://www.city.minato.tokyo.jp/documents/131753/20260330095851.pdf)<br>[ご遺族支援コーナー](https://www.city.minato.tokyo.jp/shibamadochou/kurashi/goizoku/corner.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [ご遺族の方へ 各種手続きのご案内](https://www.city.minato.tokyo.jp/documents/131753/20260330095851.pdf)<br>[身近な方が亡くなったとき](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 加入制度・受給状況・遺族要件により年金事務所・共済等へ分岐し、個別提出先を一律確定できない。 |
| D09 | 住民税继承人代表 | 部分 | [ご遺族の方へ 各種手続きのご案内](https://www.city.minato.tokyo.jp/documents/131753/20260330095851.pdf) | 相続人代表者届の要否、様式、提出チャネルを専用ページで再確認できていない。 |
| D10 | 在留卡等返还 | 完整 | [ご遺族の方へ 各種手続きのご案内](https://www.city.minato.tokyo.jp/documents/131753/20260330095851.pdf)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [ご遺族支援コーナー](https://www.city.minato.tokyo.jp/shibamadochou/kurashi/goizoku/corner.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [ご遺族の方へ 各種手続きのご案内](https://www.city.minato.tokyo.jp/documents/131753/20260330095851.pdf) | 銀行、証券、保険、公共料金、不動産登記等は状況で変わり、区資料だけで網羅・完結できない。 |

### 13104 新宿区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 部分 | [新宿行政手続きナビをご活用ください](https://www.city.shinjuku.lg.jp/kusei/tetsuzukinavi.html)<br>[新宿行政手続きナビ](https://www.city.shinjuku.lg.jp/form/search.php?f=portal.html) | Q&A型の個人条件判定ではなく、結果は検索条件に依存。 |
| M02 | 迁出申报 | 完整 | [住所変更の届出](https://www.city.shinjuku.lg.jp/todokede/index01.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [住所変更の届出](https://www.city.shinjuku.lg.jp/todokede/index01.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [住所変更の届出](https://www.city.shinjuku.lg.jp/todokede/index01.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [住所変更の届出](https://www.city.shinjuku.lg.jp/todokede/index01.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 部分 | [住所変更の届出](https://www.city.shinjuku.lg.jp/todokede/index01.html) | 継続利用期限、暗証番号、代理人等の例外条件を専用詳細ページで揃えていない。 |
| M07 | 国民健康保险迁移手续 | 部分 | [新宿行政手続きナビ](https://www.city.shinjuku.lg.jp/form/search.php?f=portal.html)<br>[住所変更の届出](https://www.city.shinjuku.lg.jp/todokede/index01.html) | 加入・喪失・世帯変更の全分岐と提出チャネルを同一精度で確認できていない。 |
| M08 | 儿童津贴迁移手续 | 部分 | [新宿行政手続きナビ](https://www.city.shinjuku.lg.jp/form/search.php?f=portal.html)<br>[妊娠・出産](https://www.city.shinjuku.lg.jp/living_08.html) | 転入・転出・区内転居、受給者のみ移動等の全条件を専用詳細ページで揃えていない。 |
| M09 | 介护保险迁移手续 | 部分 | [新宿行政手続きナビ](https://www.city.shinjuku.lg.jp/form/search.php?f=portal.html)<br>[住所変更の届出](https://www.city.shinjuku.lg.jp/todokede/index01.html) | 証類・受給資格等の転入・転出・区内転居全分岐を専用詳細ページで揃えていない。 |
| M10 | 印鉴登记迁移手续 | 部分 | [新宿行政手続きナビ](https://www.city.shinjuku.lg.jp/form/search.php?f=portal.html)<br>[住所変更の届出](https://www.city.shinjuku.lg.jp/todokede/index01.html) | 転出失効、区内転居の自動変更、転入後登録を同一精度で確認できていない。 |
| M11 | 必须到厅事项 | 完整 | [住所変更の届出](https://www.city.shinjuku.lg.jp/todokede/index01.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠・出産](https://www.city.shinjuku.lg.jp/living_08.html)<br>[母子健康手帳の交付](https://www.city.shinjuku.lg.jp/fukushi/file02_01_00001.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [出産・子育て応援事業（ゆりかご・しんじゅく）](https://www.city.shinjuku.lg.jp/fukushi/file02_01_00001_2.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [妊娠・出産](https://www.city.shinjuku.lg.jp/living_08.html)<br>[母子健康手帳の交付](https://www.city.shinjuku.lg.jp/fukushi/file02_01_00001.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [妊娠・出産](https://www.city.shinjuku.lg.jp/living_08.html)<br>[母子健康手帳の交付](https://www.city.shinjuku.lg.jp/fukushi/file02_01_00001.html)<br>[新宿行政手続きナビ](https://www.city.shinjuku.lg.jp/form/search.php?f=portal.html)<br>[住所変更の届出](https://www.city.shinjuku.lg.jp/todokede/index01.html) | 被用者保険は勤務先・健保組合が主体で、全保険者の様式・オンライン可否を区ページで完結できない。 |
| C05 | 儿童津贴 | 完整 | [妊娠・出産](https://www.city.shinjuku.lg.jp/living_08.html)<br>[母子健康手帳の交付](https://www.city.shinjuku.lg.jp/fukushi/file02_01_00001.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [妊娠・出産](https://www.city.shinjuku.lg.jp/living_08.html)<br>[母子健康手帳の交付](https://www.city.shinjuku.lg.jp/fukushi/file02_01_00001.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [妊娠・出産](https://www.city.shinjuku.lg.jp/living_08.html)<br>[母子健康手帳の交付](https://www.city.shinjuku.lg.jp/fukushi/file02_01_00001.html)<br>[出産育児一時金等について](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html) | 実様式と提出先は加入保険者・医療機関で異なり個別保険者まで一括確認できない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [妊娠・出産](https://www.city.shinjuku.lg.jp/living_08.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [妊娠・出産](https://www.city.shinjuku.lg.jp/living_08.html)<br>[母子健康手帳の交付](https://www.city.shinjuku.lg.jp/fukushi/file02_01_00001.html)<br>[在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [妊娠・出産](https://www.city.shinjuku.lg.jp/living_08.html)<br>[母子健康手帳の交付](https://www.city.shinjuku.lg.jp/fukushi/file02_01_00001.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [冊子「おくやみガイドブック」について](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00002.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [冊子「おくやみガイドブック」について](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00002.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [冊子「おくやみガイドブック」について](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00002.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [冊子「おくやみガイドブック」について](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00002.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [冊子「おくやみガイドブック」について](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00002.html)<br>[おくやみ相談窓口](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00015.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [冊子「おくやみガイドブック」について](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00002.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [冊子「おくやみガイドブック」について](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00002.html)<br>[おくやみ相談窓口](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00015.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [冊子「おくやみガイドブック」について](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00002.html)<br>[身近な方が亡くなったとき](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 加入制度・受給状況・遺族要件により年金事務所・共済等へ分岐し、個別提出先を一律確定できない。 |
| D09 | 住民税继承人代表 | 部分 | [冊子「おくやみガイドブック」について](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00002.html) | 相続人代表者届の要否、様式、提出チャネルを専用ページで再確認できていない。 |
| D10 | 在留卡等返还 | 完整 | [冊子「おくやみガイドブック」について](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00002.html)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみ相談窓口](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00015.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [冊子「おくやみガイドブック」について](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00002.html) | 銀行、証券、保険、公共料金、不動産登記等は状況で変わり、区資料だけで網羅・完結できない。 |

### 13105 文京区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [「くらしの手続きガイド」をご活用ください](https://www.city.bunkyo.lg.jp/b004/p000176.html)<br>[文京区 くらしの手続きガイド](https://ttzk.graffer.jp/ward-bunkyo)（[区官方入口](https://www.city.bunkyo.lg.jp/b004/p000176.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [住民票の異動関係（転入・転出・転居届等）](https://www.city.bunkyo.lg.jp/b013/p000260/index.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [住民票の異動関係（転入・転出・転居届等）](https://www.city.bunkyo.lg.jp/b013/p000260/index.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [住民票の異動関係（転入・転出・転居届等）](https://www.city.bunkyo.lg.jp/b013/p000260/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [住民票の異動関係（転入・転出・転居届等）](https://www.city.bunkyo.lg.jp/b013/p000260/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 完整 | [区内で転居したときの諸手続き](https://www.city.bunkyo.lg.jp/b013/p000269.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 部分 | [区内で転居したときの諸手続き](https://www.city.bunkyo.lg.jp/b013/p000269.html) | 加入・喪失・世帯変更の全分岐と提出チャネルを同一精度で確認できていない。 |
| M08 | 儿童津贴迁移手续 | 部分 | [区内で転居したときの諸手続き](https://www.city.bunkyo.lg.jp/b013/p000269.html)<br>[妊娠・出産](https://www.city.bunkyo.lg.jp/b003/p007512.html) | 転入・転出・区内転居、受給者のみ移動等の全条件を専用詳細ページで揃えていない。 |
| M09 | 介护保险迁移手续 | 部分 | [区内で転居したときの諸手続き](https://www.city.bunkyo.lg.jp/b013/p000269.html) | 証類・受給資格等の転入・転出・区内転居全分岐を専用詳細ページで揃えていない。 |
| M10 | 印鉴登记迁移手续 | 完整 | [区内で転居したときの諸手続き](https://www.city.bunkyo.lg.jp/b013/p000269.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M11 | 必须到厅事项 | 完整 | [住民票の異動関係（転入・転出・転居届等）](https://www.city.bunkyo.lg.jp/b013/p000260/index.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠・出産](https://www.city.bunkyo.lg.jp/b003/p007512.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠・出産](https://www.city.bunkyo.lg.jp/b003/p007512.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [妊娠・出産](https://www.city.bunkyo.lg.jp/b003/p007512.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [妊娠・出産](https://www.city.bunkyo.lg.jp/b003/p007512.html)<br>[区内で転居したときの諸手続き](https://www.city.bunkyo.lg.jp/b013/p000269.html) | 被用者保険は勤務先・健保組合が主体で、全保険者の様式・オンライン可否を区ページで完結できない。 |
| C05 | 儿童津贴 | 完整 | [妊娠・出産](https://www.city.bunkyo.lg.jp/b003/p007512.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [妊娠・出産](https://www.city.bunkyo.lg.jp/b003/p007512.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [妊娠・出産](https://www.city.bunkyo.lg.jp/b003/p007512.html)<br>[出産育児一時金等について](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html) | 実様式と提出先は加入保険者・医療機関で異なり個別保険者まで一括確認できない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [妊娠・出産](https://www.city.bunkyo.lg.jp/b003/p007512.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [妊娠・出産](https://www.city.bunkyo.lg.jp/b003/p007512.html)<br>[在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [妊娠・出産](https://www.city.bunkyo.lg.jp/b003/p007512.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [文京区 くらしの手続きガイド](https://ttzk.graffer.jp/ward-bunkyo)（[区官方入口](https://www.city.bunkyo.lg.jp/b004/p000176.html)）<br>[おくやみハンドブック](https://www.city.bunkyo.lg.jp/b013/p001396.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [ご不幸・相続](https://www.city.bunkyo.lg.jp/b003/p007517.html)<br>[おくやみハンドブック](https://www.city.bunkyo.lg.jp/b013/p001396.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [ご不幸・相続](https://www.city.bunkyo.lg.jp/b003/p007517.html)<br>[おくやみハンドブック](https://www.city.bunkyo.lg.jp/b013/p001396.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [ご不幸・相続](https://www.city.bunkyo.lg.jp/b003/p007517.html)<br>[おくやみハンドブック](https://www.city.bunkyo.lg.jp/b013/p001396.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [ご不幸・相続](https://www.city.bunkyo.lg.jp/b003/p007517.html)<br>[おくやみハンドブック](https://www.city.bunkyo.lg.jp/b013/p001396.html)<br>[おくやみコーナー](https://www.city.bunkyo.lg.jp/b013/p001397.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [ご不幸・相続](https://www.city.bunkyo.lg.jp/b003/p007517.html)<br>[おくやみハンドブック](https://www.city.bunkyo.lg.jp/b013/p001396.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [ご不幸・相続](https://www.city.bunkyo.lg.jp/b003/p007517.html)<br>[おくやみハンドブック](https://www.city.bunkyo.lg.jp/b013/p001396.html)<br>[おくやみコーナー](https://www.city.bunkyo.lg.jp/b013/p001397.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [ご不幸・相続](https://www.city.bunkyo.lg.jp/b003/p007517.html)<br>[おくやみハンドブック](https://www.city.bunkyo.lg.jp/b013/p001396.html)<br>[身近な方が亡くなったとき](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 加入制度・受給状況・遺族要件により年金事務所・共済等へ分岐し、個別提出先を一律確定できない。 |
| D09 | 住民税继承人代表 | 完整 | [ご不幸・相続](https://www.city.bunkyo.lg.jp/b003/p007517.html)<br>[おくやみハンドブック](https://www.city.bunkyo.lg.jp/b013/p001396.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [ご不幸・相続](https://www.city.bunkyo.lg.jp/b003/p007517.html)<br>[おくやみハンドブック](https://www.city.bunkyo.lg.jp/b013/p001396.html)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみコーナー](https://www.city.bunkyo.lg.jp/b013/p001397.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [ご不幸・相続](https://www.city.bunkyo.lg.jp/b003/p007517.html)<br>[おくやみハンドブック](https://www.city.bunkyo.lg.jp/b013/p001396.html) | 銀行、証券、保険、公共料金、不動産登記等は状況で変わり、区資料だけで網羅・完結できない。 |

### 13106 台東区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 部分 | [手続きサポートアシスタント](https://www.city.taito.lg.jp/benri/support/index.html)<br>[引越し](https://www.city.taito.lg.jp/lifeevent/hikkoshi.html) | 絞り込み検索で個別質問式とは未確認。ライフイベント入口の更新日も古い。 |
| M02 | 迁出申报 | 完整 | [引越しガイド](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/tennyu.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [オンラインによる転出届](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/hikkoshi/tensyutsuonline.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引越しガイド](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/tennyu.html)<br>[オンラインによる転出届](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/hikkoshi/tensyutsuonline.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引越しガイド](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/tennyu.html)<br>[オンラインによる転出届](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/hikkoshi/tensyutsuonline.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 部分 | [引越しガイド](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/tennyu.html) | 継続利用期限、暗証番号、代理人等の例外条件を専用詳細ページで揃えていない。 |
| M07 | 国民健康保险迁移手续 | 完整 | [引越しガイド](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M08 | 儿童津贴迁移手续 | 完整 | [引越しガイド](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M09 | 介护保险迁移手续 | 完整 | [引越しガイド](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M10 | 印鉴登记迁移手续 | 完整 | [引越しガイド](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M11 | 必须到厅事项 | 完整 | [オンラインによる転出届](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/hikkoshi/tensyutsuonline.html)<br>[引越しガイド](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/tennyu.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [たいとう子育てハンドブック](https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/2025handbook.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [たいとう子育てハンドブック](https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/2025handbook.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [たいとう子育てハンドブック](https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/2025handbook.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [たいとう子育てハンドブック](https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/2025handbook.html)<br>[引越しガイド](https://www.city.taito.lg.jp/kurashi/todokede/jyuminhyo/tennyu.html) | 被用者保険は勤務先・健保組合が主体で、全保険者の様式・オンライン可否を区ページで完結できない。 |
| C05 | 儿童津贴 | 完整 | [たいとう子育てハンドブック](https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/2025handbook.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [たいとう子育てハンドブック](https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/2025handbook.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [たいとう子育てハンドブック](https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/2025handbook.html)<br>[出産育児一時金等について](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html) | 実様式と提出先は加入保険者・医療機関で異なり個別保険者まで一括確認できない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [こんにちは赤ちゃん訪問](https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/mokutei/kenkou_iryou/shussan/shinseijihomonshido.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [たいとう子育てハンドブック](https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/2025handbook.html)<br>[在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [たいとう子育てハンドブック](https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/2025handbook.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [お亡くなりになったときの届出](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [お亡くなりになったときの届出](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 部分 | [お亡くなりになったときの届出](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html) | 世帯主変更の必要条件・期限・同時処理範囲の詳細確認が不足。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [お亡くなりになったときの届出](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [お亡くなりになったときの届出](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html)<br>[台東区おくやみコーナー予約フォーム](https://logoform.jp/form/sQhE/1098291)（[区官方入口](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [お亡くなりになったときの届出](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [お亡くなりになったときの届出](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html)<br>[台東区おくやみコーナー予約フォーム](https://logoform.jp/form/sQhE/1098291)（[区官方入口](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [お亡くなりになったときの届出](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html)<br>[身近な方が亡くなったとき](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 加入制度・受給状況・遺族要件により年金事務所・共済等へ分岐し、個別提出先を一律確定できない。 |
| D09 | 住民税继承人代表 | 部分 | [お亡くなりになったときの届出](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html) | 相続人代表者届の要否、様式、提出チャネルを専用ページで再確認できていない。 |
| D10 | 在留卡等返还 | 完整 | [お亡くなりになったときの届出](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [お亡くなりになったときの届出](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html)<br>[台東区おくやみコーナー予約フォーム](https://logoform.jp/form/sQhE/1098291)（[区官方入口](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [お亡くなりになったときの届出](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html) | 銀行、証券、保険、公共料金、不動産登記等は状況で変わり、区資料だけで網羅・完結できない。 |

### 13107 墨田区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 部分 | [住民登録の届出](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/zyuumin_touroku.html) | 個人条件に応じた質問分岐ではなく静的ナビ。 |
| M02 | 迁出申报 | 完整 | [住民登録の届出](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/zyuumin_touroku.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越しワンストップサービスが始まりました（墨田区から転出の場合、来庁不要に）](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/tenshutsunyu_oss.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [住民登録の届出](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/zyuumin_touroku.html)<br>[引越しワンストップサービスが始まりました（墨田区から転出の場合、来庁不要に）](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/tenshutsunyu_oss.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [住民登録の届出](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/zyuumin_touroku.html)<br>[引越しワンストップサービスが始まりました（墨田区から転出の場合、来庁不要に）](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/tenshutsunyu_oss.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 部分 | [住民登録の届出](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/zyuumin_touroku.html)<br>[引越しワンストップサービスが始まりました（墨田区から転出の場合、来庁不要に）](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/tenshutsunyu_oss.html) | 継続利用期限、暗証番号、代理人等の例外条件を専用詳細ページで揃えていない。 |
| M07 | 国民健康保险迁移手续 | 部分 | [国民健康保険加入の手続き](https://www.city.sumida.lg.jp/kurashi/kenkouhoken/kokuminkenkouhoken/kanyu/kokuhokanyu.html) | 国保丧失及区内地址变更需要其他直接来源，现有单页不足以覆盖完整迁移流程。 |
| M08 | 儿童津贴迁移手续 | 部分 | [引越しワンストップサービスが始まりました（墨田区から転出の場合、来庁不要に）](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/tenshutsunyu_oss.html)<br>[妊娠期・出産・子育て期の各種手当・助成](https://www.city.sumida.lg.jp/kenko_fukushi/kenko/oyako_kenko/teatejyosei/index.html) | 転入・転出・区内転居、受給者のみ移動等の全条件を専用詳細ページで揃えていない。 |
| M09 | 介护保险迁移手续 | 部分 | [引越しワンストップサービスが始まりました（墨田区から転出の場合、来庁不要に）](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/tenshutsunyu_oss.html) | 証類・受給資格等の転入・転出・区内転居全分岐を専用詳細ページで揃えていない。 |
| M10 | 印鉴登记迁移手续 | 部分 | [住民登録の届出](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/zyuumin_touroku.html) | 転出失効、区内転居の自動変更、転入後登録を同一精度で確認できていない。 |
| M11 | 必须到厅事项 | 完整 | [引越しワンストップサービスが始まりました（墨田区から転出の場合、来庁不要に）](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/tenshutsunyu_oss.html)<br>[住民登録の届出](https://www.city.sumida.lg.jp/kurashi/todokede_syoumei/zyuumintouroku/zyuumin_touroku.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [すみだいきいき子育てガイドブック](https://www.city.sumida.lg.jp/kosodate_kyouiku/kosodate_site/ikiikikosodategaido.html)<br>[妊娠届出・親子健康手帳（母子健康手帳）の交付](https://www.city.sumida.lg.jp/kenko_fukushi/kenko/oyako_kenko/ninshin/ninsintodoke.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠届出・親子健康手帳（母子健康手帳）の交付](https://www.city.sumida.lg.jp/kenko_fukushi/kenko/oyako_kenko/ninshin/ninsintodoke.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [すみだいきいき子育てガイドブック](https://www.city.sumida.lg.jp/kosodate_kyouiku/kosodate_site/ikiikikosodategaido.html)<br>[妊娠期・出産・子育て期の各種手当・助成](https://www.city.sumida.lg.jp/kenko_fukushi/kenko/oyako_kenko/teatejyosei/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [すみだいきいき子育てガイドブック](https://www.city.sumida.lg.jp/kosodate_kyouiku/kosodate_site/ikiikikosodategaido.html)<br>[妊娠期・出産・子育て期の各種手当・助成](https://www.city.sumida.lg.jp/kenko_fukushi/kenko/oyako_kenko/teatejyosei/index.html)<br>[国民健康保険加入の手続き](https://www.city.sumida.lg.jp/kurashi/kenkouhoken/kokuminkenkouhoken/kanyu/kokuhokanyu.html) | 被用者保険は勤務先・健保組合が主体で、全保険者の様式・オンライン可否を区ページで完結できない。 |
| C05 | 儿童津贴 | 完整 | [すみだいきいき子育てガイドブック](https://www.city.sumida.lg.jp/kosodate_kyouiku/kosodate_site/ikiikikosodategaido.html)<br>[妊娠期・出産・子育て期の各種手当・助成](https://www.city.sumida.lg.jp/kenko_fukushi/kenko/oyako_kenko/teatejyosei/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [すみだいきいき子育てガイドブック](https://www.city.sumida.lg.jp/kosodate_kyouiku/kosodate_site/ikiikikosodategaido.html)<br>[妊娠期・出産・子育て期の各種手当・助成](https://www.city.sumida.lg.jp/kenko_fukushi/kenko/oyako_kenko/teatejyosei/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [すみだいきいき子育てガイドブック](https://www.city.sumida.lg.jp/kosodate_kyouiku/kosodate_site/ikiikikosodategaido.html)<br>[妊娠期・出産・子育て期の各種手当・助成](https://www.city.sumida.lg.jp/kenko_fukushi/kenko/oyako_kenko/teatejyosei/index.html)<br>[出産育児一時金等について](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html) | 実様式と提出先は加入保険者・医療機関で異なり個別保険者まで一括確認できない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [すみだいきいき子育てガイドブック](https://www.city.sumida.lg.jp/kosodate_kyouiku/kosodate_site/ikiikikosodategaido.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [すみだいきいき子育てガイドブック](https://www.city.sumida.lg.jp/kosodate_kyouiku/kosodate_site/ikiikikosodategaido.html)<br>[妊娠期・出産・子育て期の各種手当・助成](https://www.city.sumida.lg.jp/kenko_fukushi/kenko/oyako_kenko/teatejyosei/index.html)<br>[在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [すみだいきいき子育てガイドブック](https://www.city.sumida.lg.jp/kosodate_kyouiku/kosodate_site/ikiikikosodategaido.html)<br>[妊娠期・出産・子育て期の各種手当・助成](https://www.city.sumida.lg.jp/kenko_fukushi/kenko/oyako_kenko/teatejyosei/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [おくやみコーナー・ハンドブックのご案内・葬儀](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.html)<br>[墨田区おくやみハンドブック2025](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.files/okuyamihandobook2025__s.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [墨田区おくやみハンドブック2025](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.files/okuyamihandobook2025__s.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [墨田区おくやみハンドブック2025](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.files/okuyamihandobook2025__s.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [墨田区おくやみハンドブック2025](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.files/okuyamihandobook2025__s.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [墨田区おくやみハンドブック2025](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.files/okuyamihandobook2025__s.pdf)<br>[おくやみコーナー・ハンドブックのご案内・葬儀](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.html)<br>[墨田区おくやみコーナーオンライン窓口](https://logoform.jp/form/DnDq/259896)（[区官方入口](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [墨田区おくやみハンドブック2025](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.files/okuyamihandobook2025__s.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [墨田区おくやみハンドブック2025](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.files/okuyamihandobook2025__s.pdf)<br>[おくやみコーナー・ハンドブックのご案内・葬儀](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.html)<br>[墨田区おくやみコーナーオンライン窓口](https://logoform.jp/form/DnDq/259896)（[区官方入口](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [墨田区おくやみハンドブック2025](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.files/okuyamihandobook2025__s.pdf)<br>[身近な方が亡くなったとき](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 加入制度・受給状況・遺族要件により年金事務所・共済等へ分岐し、個別提出先を一律確定できない。 |
| D09 | 住民税继承人代表 | 部分 | [墨田区おくやみハンドブック2025](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.files/okuyamihandobook2025__s.pdf) | 相続人代表者届の要否、様式、提出チャネルを専用ページで再確認できていない。 |
| D10 | 在留卡等返还 | 完整 | [墨田区おくやみハンドブック2025](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.files/okuyamihandobook2025__s.pdf)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみコーナー・ハンドブックのご案内・葬儀](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.html)<br>[墨田区おくやみコーナーオンライン窓口](https://logoform.jp/form/DnDq/259896)（[区官方入口](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [墨田区おくやみハンドブック2025](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.files/okuyamihandobook2025__s.pdf) | 銀行、証券、保険、公共料金、不動産登記等は状況で変わり、区資料だけで網羅・完結できない。 |

### 13108 江東区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 部分 | [手続き案内](https://www.city.koto.lg.jp/tetsuduki/)<br>[引っ越し](https://www.city.koto.lg.jp/hikkoshi.html) | 個人条件に応じた質問分岐ではなく静的ナビ。 |
| M02 | 迁出申报 | 完整 | [引っ越し](https://www.city.koto.lg.jp/hikkoshi.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [転出入ワンストップサービスについて](https://www.city.koto.lg.jp/060301/20230206.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引っ越し](https://www.city.koto.lg.jp/hikkoshi.html)<br>[転出入ワンストップサービスについて](https://www.city.koto.lg.jp/060301/20230206.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引っ越し](https://www.city.koto.lg.jp/hikkoshi.html)<br>[転出入ワンストップサービスについて](https://www.city.koto.lg.jp/060301/20230206.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 部分 | [引っ越し](https://www.city.koto.lg.jp/hikkoshi.html)<br>[転出入ワンストップサービスについて](https://www.city.koto.lg.jp/060301/20230206.html) | 継続利用期限、暗証番号、代理人等の例外条件を専用詳細ページで揃えていない。 |
| M07 | 国民健康保险迁移手续 | 部分 | [引っ越し](https://www.city.koto.lg.jp/hikkoshi.html) | 加入・喪失・世帯変更の全分岐と提出チャネルを同一精度で確認できていない。 |
| M08 | 儿童津贴迁移手续 | 部分 | [引っ越し](https://www.city.koto.lg.jp/hikkoshi.html)<br>[妊娠・出産](https://www.city.koto.lg.jp/shussan.html) | 転入・転出・区内転居、受給者のみ移動等の全条件を専用詳細ページで揃えていない。 |
| M09 | 介护保险迁移手续 | 部分 | [引っ越し](https://www.city.koto.lg.jp/hikkoshi.html) | 証類・受給資格等の転入・転出・区内転居全分岐を専用詳細ページで揃えていない。 |
| M10 | 印鉴登记迁移手续 | 部分 | [引っ越し](https://www.city.koto.lg.jp/hikkoshi.html) | 転出失効、区内転居の自動変更、転入後登録を同一精度で確認できていない。 |
| M11 | 必须到厅事项 | 完整 | [転出入ワンストップサービスについて](https://www.city.koto.lg.jp/060301/20230206.html)<br>[引っ越し](https://www.city.koto.lg.jp/hikkoshi.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠・出産](https://www.city.koto.lg.jp/shussan.html)<br>[子育てハンドブック](https://www.city.koto.lg.jp/281012/kodomo/kosodate/benri/4911.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠・出産](https://www.city.koto.lg.jp/shussan.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [妊娠・出産](https://www.city.koto.lg.jp/shussan.html)<br>[子育てハンドブック](https://www.city.koto.lg.jp/281012/kodomo/kosodate/benri/4911.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [妊娠・出産](https://www.city.koto.lg.jp/shussan.html)<br>[子育てハンドブック](https://www.city.koto.lg.jp/281012/kodomo/kosodate/benri/4911.html)<br>[引っ越し](https://www.city.koto.lg.jp/hikkoshi.html) | 被用者保険は勤務先・健保組合が主体で、全保険者の様式・オンライン可否を区ページで完結できない。 |
| C05 | 儿童津贴 | 完整 | [妊娠・出産](https://www.city.koto.lg.jp/shussan.html)<br>[子育てハンドブック](https://www.city.koto.lg.jp/281012/kodomo/kosodate/benri/4911.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [妊娠・出産](https://www.city.koto.lg.jp/shussan.html)<br>[子育てハンドブック](https://www.city.koto.lg.jp/281012/kodomo/kosodate/benri/4911.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [妊娠・出産](https://www.city.koto.lg.jp/shussan.html)<br>[子育てハンドブック](https://www.city.koto.lg.jp/281012/kodomo/kosodate/benri/4911.html)<br>[出産育児一時金等について](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html) | 実様式と提出先は加入保険者・医療機関で異なり個別保険者まで一括確認できない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [妊娠・出産](https://www.city.koto.lg.jp/shussan.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [妊娠・出産](https://www.city.koto.lg.jp/shussan.html)<br>[子育てハンドブック](https://www.city.koto.lg.jp/281012/kodomo/kosodate/benri/4911.html)<br>[在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [妊娠・出産](https://www.city.koto.lg.jp/shussan.html)<br>[子育てハンドブック](https://www.city.koto.lg.jp/281012/kodomo/kosodate/benri/4911.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [おくやみ](https://www.city.koto.lg.jp/shibo.html)<br>[江東区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13108)（[区官方入口](https://www.city.koto.lg.jp/shibo.html)）<br>[江東区おくやみ手続きガイド](https://www.city.koto.lg.jp/documents/r7okuyamisassi.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [江東区おくやみ手続きガイド](https://www.city.koto.lg.jp/documents/r7okuyamisassi.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [江東区おくやみ手続きガイド](https://www.city.koto.lg.jp/documents/r7okuyamisassi.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [江東区おくやみ手続きガイド](https://www.city.koto.lg.jp/documents/r7okuyamisassi.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [江東区おくやみ手続きガイド](https://www.city.koto.lg.jp/documents/r7okuyamisassi.pdf)<br>[おくやみコーナーのご案内](https://www.city.koto.lg.jp/060301/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [江東区おくやみ手続きガイド](https://www.city.koto.lg.jp/documents/r7okuyamisassi.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [江東区おくやみ手続きガイド](https://www.city.koto.lg.jp/documents/r7okuyamisassi.pdf)<br>[おくやみコーナーのご案内](https://www.city.koto.lg.jp/060301/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [江東区おくやみ手続きガイド](https://www.city.koto.lg.jp/documents/r7okuyamisassi.pdf)<br>[身近な方が亡くなったとき](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 加入制度・受給状況・遺族要件により年金事務所・共済等へ分岐し、個別提出先を一律確定できない。 |
| D09 | 住民税继承人代表 | 完整 | [江東区おくやみ手続きガイド](https://www.city.koto.lg.jp/documents/r7okuyamisassi.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [江東区おくやみ手続きガイド](https://www.city.koto.lg.jp/documents/r7okuyamisassi.pdf)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみコーナーのご案内](https://www.city.koto.lg.jp/060301/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [江東区おくやみ手続きガイド](https://www.city.koto.lg.jp/documents/r7okuyamisassi.pdf) | 銀行、証券、保険、公共料金、不動産登記等は状況で変わり、区資料だけで網羅・完結できない。 |

### 13109 品川区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [引越しの際に必要な手続きチェックリスト](https://www.city.shinagawa.tokyo.jp/PC/procedure/20250206184722.html)<br>[引越しするとき](https://www.city.shinagawa.tokyo.jp/PC/life_stageguide/hpg000008038.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 部分 | [引越しの際に必要な手続きチェックリスト](https://www.city.shinagawa.tokyo.jp/PC/procedure/20250206184722.html) | 缺迁出届的期限、渠道、材料及伴随手续直接官方页。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引越しの際に必要な手続きチェックリスト](https://www.city.shinagawa.tokyo.jp/PC/procedure/20250206184722.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引越しの際に必要な手続きチェックリスト](https://www.city.shinagawa.tokyo.jp/PC/procedure/20250206184722.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引越しの際に必要な手続きチェックリスト](https://www.city.shinagawa.tokyo.jp/PC/procedure/20250206184722.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 完整 | [引越しの際に必要な手続きチェックリスト](https://www.city.shinagawa.tokyo.jp/PC/procedure/20250206184722.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 完整 | [引越しの際に必要な手続きチェックリスト](https://www.city.shinagawa.tokyo.jp/PC/procedure/20250206184722.html)<br>[引越しするとき](https://www.city.shinagawa.tokyo.jp/PC/life_stageguide/hpg000008038.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M08 | 儿童津贴迁移手续 | 完整 | [引越しの際に必要な手続きチェックリスト](https://www.city.shinagawa.tokyo.jp/PC/procedure/20250206184722.html)<br>[引越しするとき](https://www.city.shinagawa.tokyo.jp/PC/life_stageguide/hpg000008038.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M09 | 介护保险迁移手续 | 完整 | [引越しの際に必要な手続きチェックリスト](https://www.city.shinagawa.tokyo.jp/PC/procedure/20250206184722.html)<br>[引越しするとき](https://www.city.shinagawa.tokyo.jp/PC/life_stageguide/hpg000008038.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M10 | 印鉴登记迁移手续 | 完整 | [引越しの際に必要な手続きチェックリスト](https://www.city.shinagawa.tokyo.jp/PC/procedure/20250206184722.html)<br>[引越しするとき](https://www.city.shinagawa.tokyo.jp/PC/life_stageguide/hpg000008038.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M11 | 必须到厅事项 | 完整 | [引越しの際に必要な手続きチェックリスト](https://www.city.shinagawa.tokyo.jp/PC/procedure/20250206184722.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠届・母子健康手帳・妊婦面接](https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-service/hpg000000783.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠届・母子健康手帳・妊婦面接](https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-service/hpg000000783.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [出生届](https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html)<br>[妊娠・出産の手続きチェックシート](https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/shiryokensaku/kosekijyumin/310401ninshinsyussan.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [出生届](https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html)<br>[妊娠・出産の手続きチェックシート](https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/shiryokensaku/kosekijyumin/310401ninshinsyussan.pdf) | 未逐项覆盖所有实际保险者的材料、期限和提交渠道。 |
| C05 | 儿童津贴 | 完整 | [出生届](https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html)<br>[妊娠・出産の手続きチェックシート](https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/shiryokensaku/kosekijyumin/310401ninshinsyussan.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [出生届](https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html)<br>[妊娠・出産の手続きチェックシート](https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/shiryokensaku/kosekijyumin/310401ninshinsyussan.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [出生届](https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html)<br>[妊娠・出産の手続きチェックシート](https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/shiryokensaku/kosekijyumin/310401ninshinsyussan.pdf) | 未逐项覆盖雇主保险等所有实际保险者的支付方式、材料和提交渠道。 |
| C08 | 新生儿访问与保健指导 | 部分 | [妊娠・出産の手続きチェックシート](https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/shiryokensaku/kosekijyumin/310401ninshinsyussan.pdf)<br>[妊娠届・母子健康手帳・妊婦面接](https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-service/hpg000000783.html) | 新生児訪問の個別申込方法・対象条件は専用ページまで再確認が必要。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [日本で出生した外国人の在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 部分 | [妊娠・出産の手続きチェックシート](https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/shiryokensaku/kosekijyumin/310401ninshinsyussan.pdf)<br>[妊娠届・母子健康手帳・妊婦面接](https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-service/hpg000000783.html) | 保育・産後支援を含む全制度の一元ナビではない。 |
| D01 | 身后手续导航 | 完整 | [おくやみコーナー](https://www.city.shinagawa.tokyo.jp/PC/procedure/okuyami/20231114184050.html)<br>[品川区おくやみハンドブック](https://www.city.shinagawa.tokyo.jp/ct/pdf/20231114184050_7.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [品川区おくやみハンドブック](https://www.city.shinagawa.tokyo.jp/ct/pdf/20231114184050_7.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [品川区おくやみハンドブック](https://www.city.shinagawa.tokyo.jp/ct/pdf/20231114184050_7.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [品川区おくやみハンドブック](https://www.city.shinagawa.tokyo.jp/ct/pdf/20231114184050_7.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [品川区おくやみハンドブック](https://www.city.shinagawa.tokyo.jp/ct/pdf/20231114184050_7.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [品川区おくやみハンドブック](https://www.city.shinagawa.tokyo.jp/ct/pdf/20231114184050_7.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [品川区おくやみハンドブック](https://www.city.shinagawa.tokyo.jp/ct/pdf/20231114184050_7.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [品川区おくやみハンドブック](https://www.city.shinagawa.tokyo.jp/ct/pdf/20231114184050_7.pdf)<br>[身近な方が亡くなったとき（年金）](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [品川区おくやみハンドブック](https://www.city.shinagawa.tokyo.jp/ct/pdf/20231114184050_7.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [中長期在留者が死亡した場合の在留カード返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみコーナー](https://www.city.shinagawa.tokyo.jp/PC/procedure/okuyami/20231114184050.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 完整 | [品川区おくやみハンドブック](https://www.city.shinagawa.tokyo.jp/ct/pdf/20231114184050_7.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |

### 13110 目黒区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [手続案内サービス（公式案内）](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)<br>[目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)）<br>[引っ越し](https://www.city.meguro.tokyo.jp/benrinavi/hikkoshi/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [引っ越し](https://www.city.meguro.tokyo.jp/benrinavi/hikkoshi/index.html)<br>[目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引っ越し](https://www.city.meguro.tokyo.jp/benrinavi/hikkoshi/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引っ越し](https://www.city.meguro.tokyo.jp/benrinavi/hikkoshi/index.html)<br>[目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引っ越し](https://www.city.meguro.tokyo.jp/benrinavi/hikkoshi/index.html)<br>[目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 部分 | [目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)）<br>[引っ越し](https://www.city.meguro.tokyo.jp/benrinavi/hikkoshi/index.html) | 静的な各制度ページの内容・提出手段を本分片では逐ページ確認しておらず、問答入口だけで完結とは扱わない。 |
| M07 | 国民健康保险迁移手续 | 部分 | [目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)）<br>[引っ越し](https://www.city.meguro.tokyo.jp/benrinavi/hikkoshi/index.html) | 静的な各制度ページの内容・提出手段を本分片では逐ページ確認しておらず、問答入口だけで完結とは扱わない。 |
| M08 | 儿童津贴迁移手续 | 部分 | [目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)）<br>[引っ越し](https://www.city.meguro.tokyo.jp/benrinavi/hikkoshi/index.html) | 静的な各制度ページの内容・提出手段を本分片では逐ページ確認しておらず、問答入口だけで完結とは扱わない。 |
| M09 | 介护保险迁移手续 | 部分 | [目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)）<br>[引っ越し](https://www.city.meguro.tokyo.jp/benrinavi/hikkoshi/index.html) | 静的な各制度ページの内容・提出手段を本分片では逐ページ確認しておらず、問答入口だけで完結とは扱わない。 |
| M10 | 印鉴登记迁移手续 | 部分 | [目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)）<br>[引っ越し](https://www.city.meguro.tokyo.jp/benrinavi/hikkoshi/index.html) | 静的な各制度ページの内容・提出手段を本分片では逐ページ確認しておらず、問答入口だけで完結とは扱わない。 |
| M11 | 必须到厅事项 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引っ越し](https://www.city.meguro.tokyo.jp/benrinavi/hikkoshi/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠・出産・育児に関する手続きとサービス](https://www.city.meguro.tokyo.jp/chiikihoken/kosodatekyouiku/ninshin/boshihoken.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 部分 | [妊娠・出産・育児に関する手続きとサービス](https://www.city.meguro.tokyo.jp/chiikihoken/kosodatekyouiku/ninshin/boshihoken.html) | 面接の予約方式とオンライン可否は個別ページの再確認が必要。 |
| C03 | 出生申报 | 完整 | [妊娠・出産・育児に関する手続きとサービス](https://www.city.meguro.tokyo.jp/chiikihoken/kosodatekyouiku/ninshin/boshihoken.html)<br>[目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [妊娠・出産・育児に関する手続きとサービス](https://www.city.meguro.tokyo.jp/chiikihoken/kosodatekyouiku/ninshin/boshihoken.html)<br>[目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)） | 加入保険別の具体的提出先・提出方法は分岐先確認が必要。 |
| C05 | 儿童津贴 | 完整 | [妊娠・出産・育児に関する手続きとサービス](https://www.city.meguro.tokyo.jp/chiikihoken/kosodatekyouiku/ninshin/boshihoken.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [妊娠・出産・育児に関する手続きとサービス](https://www.city.meguro.tokyo.jp/chiikihoken/kosodatekyouiku/ninshin/boshihoken.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [妊娠・出産・育児に関する手続きとサービス](https://www.city.meguro.tokyo.jp/chiikihoken/kosodatekyouiku/ninshin/boshihoken.html) | 未逐项覆盖雇主保险等所有实际保险者的支付方式、材料和提交渠道。 |
| C08 | 新生儿访问与保健指导 | 完整 | [妊娠・出産・育児に関する手続きとサービス](https://www.city.meguro.tokyo.jp/chiikihoken/kosodatekyouiku/ninshin/boshihoken.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [日本で出生した外国人の在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [妊娠・出産・育児に関する手続きとサービス](https://www.city.meguro.tokyo.jp/chiikihoken/kosodatekyouiku/ninshin/boshihoken.html)<br>[目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [目黒区 手続案内サービス](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)（[区官方入口](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html)）<br>[おくやみコーナー・おくやみハンドブック](https://www.city.meguro.tokyo.jp/kouhou/kurashi/soudan/okuyami.html)<br>[目黒区おくやみハンドブック](https://www.city.meguro.tokyo.jp/documents/4804/okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [死亡届と葬儀に関する手続](https://www.city.meguro.tokyo.jp/koseki/kurashi/kosekitodokede/sougi.html)<br>[目黒区おくやみハンドブック](https://www.city.meguro.tokyo.jp/documents/4804/okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [目黒区おくやみハンドブック](https://www.city.meguro.tokyo.jp/documents/4804/okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [目黒区おくやみハンドブック](https://www.city.meguro.tokyo.jp/documents/4804/okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [目黒区おくやみハンドブック](https://www.city.meguro.tokyo.jp/documents/4804/okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [目黒区おくやみハンドブック](https://www.city.meguro.tokyo.jp/documents/4804/okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [目黒区おくやみハンドブック](https://www.city.meguro.tokyo.jp/documents/4804/okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [目黒区おくやみハンドブック](https://www.city.meguro.tokyo.jp/documents/4804/okuyami.pdf)<br>[身近な方が亡くなったとき（年金）](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [目黒区おくやみハンドブック](https://www.city.meguro.tokyo.jp/documents/4804/okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [中長期在留者が死亡した場合の在留カード返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみコーナー・おくやみハンドブック](https://www.city.meguro.tokyo.jp/kouhou/kurashi/soudan/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [目黒区おくやみハンドブック](https://www.city.meguro.tokyo.jp/documents/4804/okuyami.pdf)<br>[死亡届と葬儀に関する手続](https://www.city.meguro.tokyo.jp/koseki/kurashi/kosekitodokede/sougi.html) | 相続手続自体は区で完結せず法務局・専門機関等への移行が必要。 |

### 13111 大田区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [各種手続きのご案内について](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/guide.html)<br>[大田区手続きガイド](https://ttzk.graffer.jp/ward-ota)（[区官方入口](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/guide.html)）<br>[引越しの手続き](https://www.city.ota.tokyo.jp/tetsuzuki/hikkoshi/) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [引越しの手続き](https://www.city.ota.tokyo.jp/tetsuzuki/hikkoshi/)<br>[住民異動届の窓口予約・届書作成](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/tenshutu-yoyaku_pc-smartphone.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引越しの手続き](https://www.city.ota.tokyo.jp/tetsuzuki/hikkoshi/) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引越しの手続き](https://www.city.ota.tokyo.jp/tetsuzuki/hikkoshi/)<br>[住民異動届の窓口予約・届書作成](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/tenshutu-yoyaku_pc-smartphone.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引越しの手続き](https://www.city.ota.tokyo.jp/tetsuzuki/hikkoshi/)<br>[住民異動届の窓口予約・届書作成](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/tenshutu-yoyaku_pc-smartphone.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 部分 | [大田区手続きガイド](https://ttzk.graffer.jp/ward-ota)（[区官方入口](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/guide.html)）<br>[引越しの手続き](https://www.city.ota.tokyo.jp/tetsuzuki/hikkoshi/) | 個別制度の静的手続ページと提出手段は本分片で未逐ページ確認。 |
| M07 | 国民健康保险迁移手续 | 部分 | [大田区手続きガイド](https://ttzk.graffer.jp/ward-ota)（[区官方入口](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/guide.html)）<br>[引越しの手続き](https://www.city.ota.tokyo.jp/tetsuzuki/hikkoshi/) | 個別制度の静的手続ページと提出手段は本分片で未逐ページ確認。 |
| M08 | 儿童津贴迁移手续 | 部分 | [大田区手続きガイド](https://ttzk.graffer.jp/ward-ota)（[区官方入口](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/guide.html)）<br>[引越しの手続き](https://www.city.ota.tokyo.jp/tetsuzuki/hikkoshi/) | 個別制度の静的手続ページと提出手段は本分片で未逐ページ確認。 |
| M09 | 介护保险迁移手续 | 部分 | [大田区手続きガイド](https://ttzk.graffer.jp/ward-ota)（[区官方入口](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/guide.html)）<br>[引越しの手続き](https://www.city.ota.tokyo.jp/tetsuzuki/hikkoshi/) | 個別制度の静的手続ページと提出手段は本分片で未逐ページ確認。 |
| M10 | 印鉴登记迁移手续 | 部分 | [大田区手続きガイド](https://ttzk.graffer.jp/ward-ota)（[区官方入口](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/guide.html)）<br>[引越しの手続き](https://www.city.ota.tokyo.jp/tetsuzuki/hikkoshi/) | 個別制度の静的手続ページと提出手段は本分片で未逐ページ確認。 |
| M11 | 必须到厅事项 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[住民異動届の窓口予約・届書作成](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/tenshutu-yoyaku_pc-smartphone.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠したら](https://www.city.ota.tokyo.jp/seikatsu/kodomo/shussan/ninsin.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠したら](https://www.city.ota.tokyo.jp/seikatsu/kodomo/shussan/ninsin.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [赤ちゃんが生まれたら](https://www.city.ota.tokyo.jp/seikatsu/kodomo/shussan/akachan.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [赤ちゃんが生まれたら](https://www.city.ota.tokyo.jp/seikatsu/kodomo/shussan/akachan.html) | 加入保険別の必要書類・提出方法は個別ページ確認が必要。 |
| C05 | 儿童津贴 | 完整 | [赤ちゃんが生まれたら](https://www.city.ota.tokyo.jp/seikatsu/kodomo/shussan/akachan.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [赤ちゃんが生まれたら](https://www.city.ota.tokyo.jp/seikatsu/kodomo/shussan/akachan.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [妊娠したら](https://www.city.ota.tokyo.jp/seikatsu/kodomo/shussan/ninsin.html) | 加入保険別の申請条件・差額請求方法は専用ページ確認が必要。 |
| C08 | 新生儿访问与保健指导 | 完整 | [赤ちゃんが生まれたら](https://www.city.ota.tokyo.jp/seikatsu/kodomo/shussan/akachan.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [日本で出生した外国人の在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [妊娠したら](https://www.city.ota.tokyo.jp/seikatsu/kodomo/shussan/ninsin.html)<br>[赤ちゃんが生まれたら](https://www.city.ota.tokyo.jp/seikatsu/kodomo/shussan/akachan.html)<br>[大田区手続きガイド](https://ttzk.graffer.jp/ward-ota)（[区官方入口](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/guide.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [おくやみ手続きガイド及びおくやみコーナー](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.html)<br>[大田区おくやみ手続きガイド](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.files/00_okuyami-tetuduki-guide2025.pdf)<br>[大田区手続きガイド](https://ttzk.graffer.jp/ward-ota)（[区官方入口](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/guide.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [大田区おくやみ手続きガイド](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.files/00_okuyami-tetuduki-guide2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [大田区おくやみ手続きガイド](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.files/00_okuyami-tetuduki-guide2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [大田区おくやみ手続きガイド](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.files/00_okuyami-tetuduki-guide2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [大田区おくやみ手続きガイド](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.files/00_okuyami-tetuduki-guide2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [大田区おくやみ手続きガイド](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.files/00_okuyami-tetuduki-guide2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [大田区おくやみ手続きガイド](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.files/00_okuyami-tetuduki-guide2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [大田区おくやみ手続きガイド](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.files/00_okuyami-tetuduki-guide2025.pdf)<br>[身近な方が亡くなったとき（年金）](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [大田区おくやみ手続きガイド](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.files/00_okuyami-tetuduki-guide2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [中長期在留者が死亡した場合の在留カード返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html)<br>[大田区おくやみ手続きガイド](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.files/00_okuyami-tetuduki-guide2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみ手続きガイド及びおくやみコーナー](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 完整 | [大田区おくやみ手続きガイド](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.files/00_okuyami-tetuduki-guide2025.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |

### 13112 世田谷区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 部分 | [引越しに関する手続き](https://www.city.setagaya.lg.jp/02312/18274.html)<br>[転入・転居に伴う関連手続き](https://www.city.setagaya.lg.jp/02233/84.html) | 転出側と各制度が別ページ・別所管に分散し、一枚で全体を完結して確認できない。 |
| M02 | 迁出申报 | 部分 | [引越しに関する手続き](https://www.city.setagaya.lg.jp/02312/18274.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 世田谷区固有の窓口・例外条件は個別転出ページの再確認が必要。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引越しに関する手続き](https://www.city.setagaya.lg.jp/02312/18274.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引越しに関する手続き](https://www.city.setagaya.lg.jp/02312/18274.html)<br>[転入・転居に伴う関連手続き](https://www.city.setagaya.lg.jp/02233/84.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引越しに関する手続き](https://www.city.setagaya.lg.jp/02312/18274.html)<br>[転入・転居に伴う関連手続き](https://www.city.setagaya.lg.jp/02233/84.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 完整 | [転入・転居に伴う関連手続き](https://www.city.setagaya.lg.jp/02233/84.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 完整 | [転入・転居に伴う関連手続き](https://www.city.setagaya.lg.jp/02233/84.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M08 | 儿童津贴迁移手续 | 完整 | [転入・転居に伴う関連手続き](https://www.city.setagaya.lg.jp/02233/84.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M09 | 介护保险迁移手续 | 完整 | [転入・転居に伴う関連手続き](https://www.city.setagaya.lg.jp/02233/84.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M10 | 印鉴登记迁移手续 | 完整 | [転入・転居に伴う関連手続き](https://www.city.setagaya.lg.jp/02233/84.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M11 | 必须到厅事项 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[転入・転居に伴う関連手続き](https://www.city.setagaya.lg.jp/02233/84.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠届・母子健康手帳・妊婦面接](https://www.city.setagaya.lg.jp/02244/1189.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠届・母子健康手帳・妊婦面接](https://www.city.setagaya.lg.jp/02244/1189.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 部分 | [妊娠・出産・子育てガイド](https://www.city.setagaya.lg.jp/02413/21570.html) | 制度ごとの個別ページ・提出方法が複数所管に分散しており、冊子単独ではオンライン可否や例外まで確定しない。 |
| C04 | 孩子加入健康保险 | 部分 | [妊娠・出産・子育てガイド](https://www.city.setagaya.lg.jp/02413/21570.html) | 制度ごとの個別ページ・提出方法が複数所管に分散しており、冊子単独ではオンライン可否や例外まで確定しない。 |
| C05 | 儿童津贴 | 部分 | [妊娠・出産・子育てガイド](https://www.city.setagaya.lg.jp/02413/21570.html) | 制度ごとの個別ページ・提出方法が複数所管に分散しており、冊子単独ではオンライン可否や例外まで確定しない。 |
| C06 | 儿童医疗费补助 | 部分 | [妊娠・出産・子育てガイド](https://www.city.setagaya.lg.jp/02413/21570.html) | 制度ごとの個別ページ・提出方法が複数所管に分散しており、冊子単独ではオンライン可否や例外まで確定しない。 |
| C07 | 出产育儿一时金 | 部分 | [妊娠・出産・子育てガイド](https://www.city.setagaya.lg.jp/02413/21570.html) | 制度ごとの個別ページ・提出方法が複数所管に分散しており、冊子単独ではオンライン可否や例外まで確定しない。 |
| C08 | 新生儿访问与保健指导 | 部分 | [妊娠・出産・子育てガイド](https://www.city.setagaya.lg.jp/02413/21570.html) | 制度ごとの個別ページ・提出方法が複数所管に分散しており、冊子単独ではオンライン可否や例外まで確定しない。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [日本で出生した外国人の在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 部分 | [妊娠・出産・子育てガイド](https://www.city.setagaya.lg.jp/02413/21570.html) | 制度ごとの個別ページ・提出方法が複数所管に分散しており、冊子単独ではオンライン可否や例外まで確定しない。 |
| D01 | 身后手续导航 | 完整 | [くらしの手続きガイド（お悔やみ）](https://www.city.setagaya.lg.jp/02233/1171.html)<br>[世田谷区公式 お悔やみガイド](https://ttzk.graffer.jp/ward-setagaya/death)（[区官方入口](https://www.city.setagaya.lg.jp/02233/1171.html)）<br>[ご遺族の方の諸手続き](https://www.city.setagaya.lg.jp/02233/1172.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [死亡届](https://www.city.setagaya.lg.jp/02233/65.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [ご遺族の方の諸手続き](https://www.city.setagaya.lg.jp/02233/1172.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [ご遺族の方の諸手続き](https://www.city.setagaya.lg.jp/02233/1172.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [ご遺族の方の諸手続き](https://www.city.setagaya.lg.jp/02233/1172.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [ご遺族の方の諸手続き](https://www.city.setagaya.lg.jp/02233/1172.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [ご遺族の方の諸手続き](https://www.city.setagaya.lg.jp/02233/1172.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [ご遺族の方の諸手続き](https://www.city.setagaya.lg.jp/02233/1172.html)<br>[身近な方が亡くなったとき（年金）](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [ご遺族の方の諸手続き](https://www.city.setagaya.lg.jp/02233/1172.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [中長期在留者が死亡した場合の在留カード返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html)<br>[ご遺族の方の諸手続き](https://www.city.setagaya.lg.jp/02233/1172.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [ご遺族の方の諸手続き](https://www.city.setagaya.lg.jp/02233/1172.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [ご遺族の方の諸手続き](https://www.city.setagaya.lg.jp/02233/1172.html) | 相続登記等は区で完結せず、法務局・専門機関への移行が必要。 |

### 13113 渋谷区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 部分 | [住所を変更するとき](https://www.city.shibuya.tokyo.jp/contents/living-in-shibuya/ja/resident/move.html?lang=ja)<br>[転入届](https://www.city.shibuya.tokyo.jp/kurashi/jumin/ido/t_tennyu.html) | 多言語入口だけで各付随制度の完全性・提出可否までは確定しない。 |
| M02 | 迁出申报 | 部分 | [住所を変更するとき](https://www.city.shibuya.tokyo.jp/contents/living-in-shibuya/ja/resident/move.html?lang=ja) | 個別の例外・必要物・関連制度は日本語専用詳細ページの再確認が必要。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[住所を変更するとき](https://www.city.shibuya.tokyo.jp/contents/living-in-shibuya/ja/resident/move.html?lang=ja) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [転入届](https://www.city.shibuya.tokyo.jp/kurashi/jumin/ido/t_tennyu.html)<br>[住所を変更するとき](https://www.city.shibuya.tokyo.jp/contents/living-in-shibuya/ja/resident/move.html?lang=ja) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 部分 | [住所を変更するとき](https://www.city.shibuya.tokyo.jp/contents/living-in-shibuya/ja/resident/move.html?lang=ja) | 個別の例外・必要物・関連制度は日本語専用詳細ページの再確認が必要。 |
| M06 | My Number地址更新与继续使用 | 完整 | [転入届](https://www.city.shibuya.tokyo.jp/kurashi/jumin/ido/t_tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 部分 | [住所を変更するとき](https://www.city.shibuya.tokyo.jp/contents/living-in-shibuya/ja/resident/move.html?lang=ja) | 多言語概要からは各制度の全分岐・提出方法を確定できない。 |
| M08 | 儿童津贴迁移手续 | 部分 | [住所を変更するとき](https://www.city.shibuya.tokyo.jp/contents/living-in-shibuya/ja/resident/move.html?lang=ja) | 多言語概要からは各制度の全分岐・提出方法を確定できない。 |
| M09 | 介护保险迁移手续 | 完整 | [引越しに伴う介護保険手続](https://www.city.shibuya.tokyo.jp/kenko/kaigo/kaigo-hoken/hikkoshi_kaigo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M10 | 印鉴登记迁移手续 | 部分 | [住所を変更するとき](https://www.city.shibuya.tokyo.jp/contents/living-in-shibuya/ja/resident/move.html?lang=ja) | 多言語概要からは各制度の全分岐・提出方法を確定できない。 |
| M11 | 必须到厅事项 | 部分 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[転入届](https://www.city.shibuya.tokyo.jp/kurashi/jumin/ido/t_tennyu.html)<br>[住所を変更するとき](https://www.city.shibuya.tokyo.jp/contents/living-in-shibuya/ja/resident/move.html?lang=ja) | 転居および全付随制度の来庁要否を一表で網羅する公式資料は確認できない。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠届・妊婦面接](https://www.city.shibuya.tokyo.jp/kodomo/ninshin/ninshin-sodan/ninpu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠届・妊婦面接](https://www.city.shibuya.tokyo.jp/kodomo/ninshin/ninshin-sodan/ninpu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [出生届](https://www.city.shibuya.tokyo.jp/kurashi/koseki/koseki-todokede/shussho_todoke.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [ネウボラ子育てハンドブック](https://www.city.shibuya.tokyo.jp/kodomo/ninshin/kosodate-shien/neuvola_childcare_handbook.html) | 勤務先保険と国保で手続先が分かれ、提出可否は各保険者確認が必要。 |
| C05 | 儿童津贴 | 完整 | [児童手当](https://www.city.shibuya.tokyo.jp/kodomo/kodomo-teate-josei/kodomo-teate/jido_t.html)<br>[ネウボラ子育てハンドブック](https://www.city.shibuya.tokyo.jp/kodomo/ninshin/kosodate-shien/neuvola_childcare_handbook.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [子ども医療費助成](https://www.city.shibuya.tokyo.jp/kodomo/kodomo-teate-josei/iryo-josei/kodomo_ij.html)<br>[ネウボラ子育てハンドブック](https://www.city.shibuya.tokyo.jp/kodomo/ninshin/kosodate-shien/neuvola_childcare_handbook.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [ネウボラ子育てハンドブック](https://www.city.shibuya.tokyo.jp/kodomo/ninshin/kosodate-shien/neuvola_childcare_handbook.html) | 加入保険別の直接支払・差額請求条件は専用制度ページ確認が必要。 |
| C08 | 新生儿访问与保健指导 | 完整 | [新生児訪問・こんにちは赤ちゃん訪問](https://www.city.shibuya.tokyo.jp/kodomo/kodomo-sodan/shinseiji-sodan/homon_baby.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [日本で出生した外国人の在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [ネウボラ子育てハンドブック](https://www.city.shibuya.tokyo.jp/kodomo/ninshin/kosodate-shien/neuvola_childcare_handbook.html)<br>[新生児訪問・こんにちは赤ちゃん訪問](https://www.city.shibuya.tokyo.jp/kodomo/kodomo-sodan/shinseiji-sodan/homon_baby.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [おくやみ](https://www.city.shibuya.tokyo.jp/contents/case/okuyami.html)<br>[おくやみハンドブック・おくやみ手続きナビ](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)<br>[渋谷区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13113)（[区官方入口](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [おくやみ](https://www.city.shibuya.tokyo.jp/contents/case/okuyami.html)<br>[おくやみハンドブック・おくやみ手続きナビ](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [おくやみハンドブック・おくやみ手続きナビ](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)<br>[渋谷区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13113)（[区官方入口](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 部分 | [おくやみハンドブック・おくやみ手続きナビ](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)<br>[渋谷区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13113)（[区官方入口](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)） | 個別ケースの要否・必要書類は担当課確認が必要。 |
| D05 | 健康保险资料返还 | 完整 | [おくやみハンドブック・おくやみ手続きナビ](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)<br>[渋谷区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13113)（[区官方入口](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [おくやみハンドブック・おくやみ手続きナビ](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)<br>[渋谷区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13113)（[区官方入口](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [おくやみハンドブック・おくやみ手続きナビ](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)<br>[渋谷区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13113)（[区官方入口](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [おくやみハンドブック・おくやみ手続きナビ](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)<br>[身近な方が亡くなったとき（年金）](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 部分 | [おくやみハンドブック・おくやみ手続きナビ](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)<br>[渋谷区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13113)（[区官方入口](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)） | 個別ケースの要否・必要書類は担当課確認が必要。 |
| D10 | 在留卡等返还 | 完整 | [中長期在留者が死亡した場合の在留カード返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 缺失 | — | ハンドブックと外部質問ナビはあるが、来庁支援コーナー予約とは別物。 |
| D12 | 继承及民间手续转介 | 部分 | [おくやみハンドブック・おくやみ手続きナビ](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)<br>[渋谷区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13113)（[区官方入口](https://www.city.shibuya.tokyo.jp/kurashi/madoguchi/kurashi-sodansaki/okuyami.html)） | 相続手続自体は法務局・金融機関・専門家等で行い、区内完結ではない。 |

### 13114 中野区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [引越しの手続き](https://www.city.tokyo-nakano.lg.jp/kurashi/koseki/jyuminhyo/hikkoshi.html)<br>[引越しするとき](https://www.city.tokyo-nakano.lg.jp/case/hikkoshi/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [引越しの手続き](https://www.city.tokyo-nakano.lg.jp/kurashi/koseki/jyuminhyo/hikkoshi.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引越しの手続き](https://www.city.tokyo-nakano.lg.jp/kurashi/koseki/jyuminhyo/hikkoshi.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引越しの手続き](https://www.city.tokyo-nakano.lg.jp/kurashi/koseki/jyuminhyo/hikkoshi.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引越しの手続き](https://www.city.tokyo-nakano.lg.jp/kurashi/koseki/jyuminhyo/hikkoshi.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 完整 | [引越しの手続き](https://www.city.tokyo-nakano.lg.jp/kurashi/koseki/jyuminhyo/hikkoshi.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 部分 | [引越しするとき](https://www.city.tokyo-nakano.lg.jp/case/hikkoshi/index.html) | 各制度の申請条件・提出方法はリンク先で再確認が必要。 |
| M08 | 儿童津贴迁移手续 | 部分 | [引越しするとき](https://www.city.tokyo-nakano.lg.jp/case/hikkoshi/index.html) | 各制度の申請条件・提出方法はリンク先で再確認が必要。 |
| M09 | 介护保险迁移手续 | 部分 | [引越しするとき](https://www.city.tokyo-nakano.lg.jp/case/hikkoshi/index.html) | 各制度の申請条件・提出方法はリンク先で再確認が必要。 |
| M10 | 印鉴登记迁移手续 | 部分 | [引越しするとき](https://www.city.tokyo-nakano.lg.jp/case/hikkoshi/index.html) | 各制度の申請条件・提出方法はリンク先で再確認が必要。 |
| M11 | 必须到厅事项 | 完整 | [引越しの手続き](https://www.city.tokyo-nakano.lg.jp/kurashi/koseki/jyuminhyo/hikkoshi.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[書かない窓口](https://www.city.tokyo-nakano.lg.jp/kurashi/digitalmadoguti/0686043520240222141710993.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠届と母子健康手帳](https://www.city.tokyo-nakano.lg.jp/kosodate/kosodatesite_ohirune/nenreibetsu/ninshin/tetsuduki/ninshintodoke.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 部分 | [妊娠届と母子健康手帳](https://www.city.tokyo-nakano.lg.jp/kosodate/kosodatesite_ohirune/nenreibetsu/ninshin/tetsuduki/ninshintodoke.html) | 面接名称・予約方式の専用ページを本分片では確認していない。 |
| C03 | 出生申报 | 完整 | [出生届](https://www.city.tokyo-nakano.lg.jp/kurashi/koseki/koseki/syussyotodoke.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [出産から1歳まで](https://www.city.tokyo-nakano.lg.jp/kosodate/kosodatesite_ohirune/nenreibetsu/syussan/index.html) | 勤務先保険を含む加入先別の提出方法は個別確認が必要。 |
| C05 | 儿童津贴 | 完整 | [児童手当](https://www.city.tokyo-nakano.lg.jp/kosodate/kosodatesite_ohirune/mokuteki/teate/teate/jidoteate.html)<br>[出産から1歳まで](https://www.city.tokyo-nakano.lg.jp/kosodate/kosodatesite_ohirune/nenreibetsu/syussan/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 部分 | [出産から1歳まで](https://www.city.tokyo-nakano.lg.jp/kosodate/kosodatesite_ohirune/nenreibetsu/syussan/index.html) | 専用制度ページの申請方法・必要書類を本分片では未逐項確認。 |
| C07 | 出产育儿一时金 | 部分 | [出産育児一時金](https://www.city.tokyo-nakano.lg.jp/kurashi/hoken/kyufu/syussanikuji.html) | 未逐项覆盖雇主保险等所有实际保险者的支付方式、材料和提交渠道。 |
| C08 | 新生儿访问与保健指导 | 完整 | [こんにちは赤ちゃん訪問](https://www.city.tokyo-nakano.lg.jp/kosodate/kosodatesite_ohirune/nenreibetsu/syussan/sangoshien/akachanhomon.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [日本で出生した外国人の在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html)<br>[出生届](https://www.city.tokyo-nakano.lg.jp/kurashi/koseki/koseki/syussyotodoke.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [出産から1歳まで](https://www.city.tokyo-nakano.lg.jp/kosodate/kosodatesite_ohirune/nenreibetsu/syussan/index.html)<br>[こんにちは赤ちゃん訪問](https://www.city.tokyo-nakano.lg.jp/kosodate/kosodatesite_ohirune/nenreibetsu/syussan/sangoshien/akachanhomon.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [ご不幸](https://www.city.tokyo-nakano.lg.jp/case/gofuko/index.html)<br>[おくやみ窓口・おくやみ手続きナビ](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.html)<br>[中野区おくやみガイド](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.files/2026_okuyamiguide.pdf)<br>[中野区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13114)（[区官方入口](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [中野区おくやみガイド](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.files/2026_okuyamiguide.pdf)<br>[中野区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13114)（[区官方入口](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [中野区おくやみガイド](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.files/2026_okuyamiguide.pdf)<br>[中野区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13114)（[区官方入口](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [中野区おくやみガイド](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.files/2026_okuyamiguide.pdf)<br>[中野区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13114)（[区官方入口](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [中野区おくやみガイド](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.files/2026_okuyamiguide.pdf)<br>[中野区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13114)（[区官方入口](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [中野区おくやみガイド](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.files/2026_okuyamiguide.pdf)<br>[中野区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13114)（[区官方入口](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [中野区おくやみガイド](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.files/2026_okuyamiguide.pdf)<br>[中野区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13114)（[区官方入口](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [中野区おくやみガイド](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.files/2026_okuyamiguide.pdf)<br>[身近な方が亡くなったとき（年金）](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [中野区おくやみガイド](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.files/2026_okuyamiguide.pdf)<br>[中野区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13114)（[区官方入口](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [中長期在留者が死亡した場合の在留カード返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html)<br>[中野区おくやみガイド](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.files/2026_okuyamiguide.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみ窓口・おくやみ手続きナビ](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [中野区おくやみガイド](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.files/2026_okuyamiguide.pdf)<br>[中野区 おくやみ手続きナビ](https://www.okuyaminavi.net/municipalities/13114)（[区官方入口](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.html)） | 相続手続自体は区窓口・外部ナビでは完結しない。 |

### 13115 杉並区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [引っ越し](https://www.city.suginami.tokyo.jp/hikkoshi/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [引っ越し](https://www.city.suginami.tokyo.jp/hikkoshi/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引っ越し](https://www.city.suginami.tokyo.jp/hikkoshi/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引っ越し](https://www.city.suginami.tokyo.jp/hikkoshi/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引っ越し](https://www.city.suginami.tokyo.jp/hikkoshi/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 部分 | [引っ越し](https://www.city.suginami.tokyo.jp/hikkoshi/index.html) | 総合入口からは各制度の全条件・提出方法を確定できず、専用ページ確認が必要。 |
| M07 | 国民健康保险迁移手续 | 部分 | [引っ越し](https://www.city.suginami.tokyo.jp/hikkoshi/index.html) | 総合入口からは各制度の全条件・提出方法を確定できず、専用ページ確認が必要。 |
| M08 | 儿童津贴迁移手续 | 部分 | [引っ越し](https://www.city.suginami.tokyo.jp/hikkoshi/index.html) | 総合入口からは各制度の全条件・提出方法を確定できず、専用ページ確認が必要。 |
| M09 | 介护保险迁移手续 | 部分 | [引っ越し](https://www.city.suginami.tokyo.jp/hikkoshi/index.html) | 総合入口からは各制度の全条件・提出方法を確定できず、専用ページ確認が必要。 |
| M10 | 印鉴登记迁移手续 | 部分 | [引っ越し](https://www.city.suginami.tokyo.jp/hikkoshi/index.html) | 総合入口からは各制度の全条件・提出方法を確定できず、専用ページ確認が必要。 |
| M11 | 必须到厅事项 | 部分 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引っ越し](https://www.city.suginami.tokyo.jp/hikkoshi/index.html) | 尚缺杉并区迁入和区内迁居直接页对主要渠道与到厅要求的逐项证据。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠届・母子健康手帳・ゆりかご面接](https://www.city.suginami.tokyo.jp/s054/1109.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠届・母子健康手帳・ゆりかご面接](https://www.city.suginami.tokyo.jp/s054/1109.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [出生届](https://www.city.suginami.tokyo.jp/s018/1002.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [出生届](https://www.city.suginami.tokyo.jp/s018/1002.html)<br>[赤ちゃんが生まれたら](https://www.city.suginami.tokyo.jp/s054/1134.html) | 加入保険別の申請先・必要書類は各保険者ページ確認が必要。 |
| C05 | 儿童津贴 | 完整 | [赤ちゃんが生まれたら](https://www.city.suginami.tokyo.jp/s054/1134.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [赤ちゃんが生まれたら](https://www.city.suginami.tokyo.jp/s054/1134.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [出産育児一時金](https://www.city.suginami.tokyo.jp/s035/12553.html) | 未逐项覆盖雇主保险等所有实际保险者的支付方式、材料和提交渠道。 |
| C08 | 新生儿访问与保健指导 | 完整 | [赤ちゃんが生まれたら](https://www.city.suginami.tokyo.jp/s054/1134.html)<br>[すこやか赤ちゃん訪問](https://www.city.suginami.tokyo.jp/s054/1027.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [日本で出生した外国人の在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [赤ちゃんが生まれたら](https://www.city.suginami.tokyo.jp/s054/1134.html)<br>[すこやか赤ちゃん訪問](https://www.city.suginami.tokyo.jp/s054/1027.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [おくやみ](https://www.city.suginami.tokyo.jp/okuyami/index.html)<br>[杉並区公式 おくやみガイド](https://ttzk.graffer.jp/city-suginami/okuyami)（[区官方入口](https://www.city.suginami.tokyo.jp/s018/17350.html)）<br>[杉並区おくやみハンドブック](https://www.city.suginami.tokyo.jp/documents/10727/suginami_oh_r8-3.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [死亡届](https://www.city.suginami.tokyo.jp/s018/10727.html)<br>[杉並区おくやみハンドブック](https://www.city.suginami.tokyo.jp/documents/10727/suginami_oh_r8-3.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [杉並区おくやみハンドブック](https://www.city.suginami.tokyo.jp/documents/10727/suginami_oh_r8-3.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [杉並区おくやみハンドブック](https://www.city.suginami.tokyo.jp/documents/10727/suginami_oh_r8-3.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [杉並区おくやみハンドブック](https://www.city.suginami.tokyo.jp/documents/10727/suginami_oh_r8-3.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [国民健康保険の葬祭費](https://www.city.suginami.tokyo.jp/s035/12554.html)<br>[杉並区おくやみハンドブック](https://www.city.suginami.tokyo.jp/documents/10727/suginami_oh_r8-3.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [杉並区おくやみハンドブック](https://www.city.suginami.tokyo.jp/documents/10727/suginami_oh_r8-3.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [杉並区おくやみハンドブック](https://www.city.suginami.tokyo.jp/documents/10727/suginami_oh_r8-3.pdf)<br>[身近な方が亡くなったとき（年金）](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [杉並区おくやみハンドブック](https://www.city.suginami.tokyo.jp/documents/10727/suginami_oh_r8-3.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [中長期在留者が死亡した場合の在留カード返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html)<br>[杉並区おくやみハンドブック](https://www.city.suginami.tokyo.jp/documents/10727/suginami_oh_r8-3.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみコーナー（予約制）](https://www.city.suginami.tokyo.jp/s018/17350.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [杉並区おくやみハンドブック](https://www.city.suginami.tokyo.jp/documents/10727/suginami_oh_r8-3.pdf) | 相続手続は区で完結せず外部機関へ移行する。 |

### 13116 豊島区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [住所異動の届出](https://www.city.toshima.lg.jp/096/tetsuzuki/todokede/kiroku/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [住所異動の届出](https://www.city.toshima.lg.jp/096/tetsuzuki/todokede/kiroku/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[住所異動の届出](https://www.city.toshima.lg.jp/096/tetsuzuki/todokede/kiroku/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [住所異動の届出](https://www.city.toshima.lg.jp/096/tetsuzuki/todokede/kiroku/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [住所異動の届出](https://www.city.toshima.lg.jp/096/tetsuzuki/todokede/kiroku/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 部分 | [住所異動の届出](https://www.city.toshima.lg.jp/096/tetsuzuki/todokede/kiroku/index.html) | 総合入口だけでは制度別の全分岐・提出方法を確定できない。多言語入口の有無も完全性の代替にしていない。 |
| M07 | 国民健康保险迁移手续 | 部分 | [住所異動の届出](https://www.city.toshima.lg.jp/096/tetsuzuki/todokede/kiroku/index.html) | 総合入口だけでは制度別の全分岐・提出方法を確定できない。多言語入口の有無も完全性の代替にしていない。 |
| M08 | 儿童津贴迁移手续 | 部分 | [住所異動の届出](https://www.city.toshima.lg.jp/096/tetsuzuki/todokede/kiroku/index.html) | 総合入口だけでは制度別の全分岐・提出方法を確定できない。多言語入口の有無も完全性の代替にしていない。 |
| M09 | 介护保险迁移手续 | 部分 | [住所異動の届出](https://www.city.toshima.lg.jp/096/tetsuzuki/todokede/kiroku/index.html) | 総合入口だけでは制度別の全分岐・提出方法を確定できない。多言語入口の有無も完全性の代替にしていない。 |
| M10 | 印鉴登记迁移手续 | 部分 | [住所異動の届出](https://www.city.toshima.lg.jp/096/tetsuzuki/todokede/kiroku/index.html) | 総合入口だけでは制度別の全分岐・提出方法を確定できない。多言語入口の有無も完全性の代替にしていない。 |
| M11 | 必须到厅事项 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[住所異動の届出](https://www.city.toshima.lg.jp/096/tetsuzuki/todokede/kiroku/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠届・母子健康手帳](https://www.city.toshima.lg.jp/219/kosodate/ninshin/shussanmade/001311.html)<br>[妊娠から出産・子育て期の相談支援および経済的支援](https://www.city.toshima.lg.jp/219/kosodate/ninshin/2303161305.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠届・母子健康手帳](https://www.city.toshima.lg.jp/219/kosodate/ninshin/shussanmade/001311.html)<br>[妊娠から出産・子育て期の相談支援および経済的支援](https://www.city.toshima.lg.jp/219/kosodate/ninshin/2303161305.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [赤ちゃんが生まれたときは（出生届）](https://www.city.toshima.lg.jp/094/tetsuzuki/todokede/todokede/000292.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [赤ちゃんが生まれたときは（出生届）](https://www.city.toshima.lg.jp/094/tetsuzuki/todokede/todokede/000292.html)<br>[MAP for PAPA](https://www.city.toshima.lg.jp/documents/53932/20250904141730.pdf) | 勤務先保険を含む加入先別の申請方法は各保険者確認が必要。 |
| C05 | 儿童津贴 | 完整 | [児童手当](https://www.city.toshima.lg.jp/261/kosodate/kosodate/teate-jose/017993.html)<br>[MAP for PAPA](https://www.city.toshima.lg.jp/documents/53932/20250904141730.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [児童の手当と医療費助成制度のご案内](https://www.city.toshima.lg.jp/261/kosodate/2304271022.html)<br>[赤ちゃんが生まれたときは（出生届）](https://www.city.toshima.lg.jp/094/tetsuzuki/todokede/todokede/000292.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [出産育児一時金](https://www.city.toshima.lg.jp/112/tetsuzuki/nenkin/kenkohoken/kyufu/018182.html) | 未逐项覆盖雇主保险等所有实际保险者的支付方式、材料和提交渠道。 |
| C08 | 新生儿访问与保健指导 | 完整 | [赤ちゃん訪問](https://www.city.toshima.lg.jp/220/kosodate/kosodate/kenko/001357.html)<br>[妊娠から出産・子育て期の相談支援および経済的支援](https://www.city.toshima.lg.jp/219/kosodate/ninshin/2303161305.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [日本で出生した外国人の在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [妊娠から出産・子育て期の相談支援および経済的支援](https://www.city.toshima.lg.jp/219/kosodate/ninshin/2303161305.html)<br>[赤ちゃん訪問](https://www.city.toshima.lg.jp/220/kosodate/kosodate/kenko/001357.html)<br>[児童の手当と医療費助成制度のご案内](https://www.city.toshima.lg.jp/261/kosodate/2304271022.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [おくやみコーナー](https://www.city.toshima.lg.jp/093/2105180941.html)<br>[豊島区おくやみ手続きガイド](https://www.city.toshima.lg.jp/documents/35308/2026web_okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [死亡届](https://www.city.toshima.lg.jp/094/tetsuzuki/todokede/todokede/000310/index.html)<br>[豊島区おくやみ手続きガイド](https://www.city.toshima.lg.jp/documents/35308/2026web_okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [豊島区おくやみ手続きガイド](https://www.city.toshima.lg.jp/documents/35308/2026web_okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [豊島区おくやみ手続きガイド](https://www.city.toshima.lg.jp/documents/35308/2026web_okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [豊島区おくやみ手続きガイド](https://www.city.toshima.lg.jp/documents/35308/2026web_okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [豊島区おくやみ手続きガイド](https://www.city.toshima.lg.jp/documents/35308/2026web_okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [豊島区おくやみ手続きガイド](https://www.city.toshima.lg.jp/documents/35308/2026web_okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [豊島区おくやみ手続きガイド](https://www.city.toshima.lg.jp/documents/35308/2026web_okuyami.pdf)<br>[身近な方が亡くなったとき（年金）](https://www.nenkin.go.jp/service/scenebetsu/shibou.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [豊島区おくやみ手続きガイド](https://www.city.toshima.lg.jp/documents/35308/2026web_okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [中長期在留者が死亡した場合の在留カード返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html)<br>[豊島区おくやみ手続きガイド](https://www.city.toshima.lg.jp/documents/35308/2026web_okuyami.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみコーナー](https://www.city.toshima.lg.jp/093/2105180941.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 部分 | [豊島区おくやみ手続きガイド](https://www.city.toshima.lg.jp/documents/35308/2026web_okuyami.pdf) | 相続登記等は区で完結せず、法務局・専門機関等への移行が必要。 |

### 13117 北区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [東京都北区くらしの手続きナビ](https://www.nicotto-navi.jp/city-kita/index.html)（[区官方入口](https://www.city.kita.lg.jp/living/registration/1001564/index.html)）<br>[引越し（転入・転出など）](https://www.city.kita.lg.jp/living/registration/1001564/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [引越し（転入・転出など）](https://www.city.kita.lg.jp/living/registration/1001564/index.html)<br>[住民異動届出書](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/569/idoutodokdesyo20260105.pdf)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引越し（転入・転出など）](https://www.city.kita.lg.jp/living/registration/1001564/index.html)<br>[住民異動届出書](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/569/idoutodokdesyo20260105.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引越し（転入・転出など）](https://www.city.kita.lg.jp/living/registration/1001564/index.html)<br>[住民異動届出書](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/569/idoutodokdesyo20260105.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引越し（転入・転出など）](https://www.city.kita.lg.jp/living/registration/1001564/index.html)<br>[住民異動届出書](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/569/idoutodokdesyo20260105.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 完整 | [引越し（転入・転出など）](https://www.city.kita.lg.jp/living/registration/1001564/index.html)<br>[住民異動届出書](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/569/idoutodokdesyo20260105.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 完整 | [住民異動届出書](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/569/idoutodokdesyo20260105.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M08 | 儿童津贴迁移手续 | 部分 | [住民異動届出書](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/569/idoutodokdesyo20260105.pdf) | 住民異動届様式で関連欄は確認できるが、受給状況別期限・必要書類の個別ページまでは本調査で展開していない。 |
| M09 | 介护保险迁移手续 | 部分 | [住民異動届出書](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/569/idoutodokdesyo20260105.pdf) | 住民異動届様式で介護欄は確認できるが、受給資格証明等の分岐詳細は個別ページ未展開。 |
| M10 | 印鉴登记迁移手续 | 完整 | [引越し（転入・転出など）](https://www.city.kita.lg.jp/living/registration/1001564/index.html)<br>[住民異動届出書](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/569/idoutodokdesyo20260105.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M11 | 必须到厅事项 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引越し（転入・転出など）](https://www.city.kita.lg.jp/living/registration/1001564/index.html)<br>[住民異動届出書](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/569/idoutodokdesyo20260105.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠・出産](https://www.city.kita.lg.jp/children-edu/pregnancy/index.html)<br>[妊娠期から出産・子育ての伴走型相談支援と経済的給付](https://www.city.kita.lg.jp/children-edu/pregnancy/1002777/1020066.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠期から出産・子育ての伴走型相談支援と経済的給付](https://www.city.kita.lg.jp/children-edu/pregnancy/1002777/1020066.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [妊娠・出産](https://www.city.kita.lg.jp/children-edu/pregnancy/index.html)<br>[東京都北区くらしの手続きナビ](https://www.nicotto-navi.jp/city-kita/index.html)（[区官方入口](https://www.city.kita.lg.jp/living/registration/1001564/index.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [妊娠・出産](https://www.city.kita.lg.jp/children-edu/pregnancy/index.html)<br>[東京都北区くらしの手続きナビ](https://www.nicotto-navi.jp/city-kita/index.html)（[区官方入口](https://www.city.kita.lg.jp/living/registration/1001564/index.html)） | 官方入口已确认，但跨制度或个别资格分支仍需打开担当页面确认。 |
| C05 | 儿童津贴 | 部分 | [妊娠・出産](https://www.city.kita.lg.jp/children-edu/pregnancy/index.html)<br>[東京都北区くらしの手続きナビ](https://www.nicotto-navi.jp/city-kita/index.html)（[区官方入口](https://www.city.kita.lg.jp/living/registration/1001564/index.html)） | ライフイベント入口と質問ナビは確認済みだが、児童手当の出生時個別説明ページは未展開。 |
| C06 | 儿童医疗费补助 | 部分 | [妊娠・出産](https://www.city.kita.lg.jp/children-edu/pregnancy/index.html)<br>[東京都北区くらしの手続きナビ](https://www.nicotto-navi.jp/city-kita/index.html)（[区官方入口](https://www.city.kita.lg.jp/living/registration/1001564/index.html)） | 出生ナビ入口は確認済みだが、医療費助成の個別資格・申請期限ページは未展開。 |
| C07 | 出产育儿一时金 | 部分 | [妊娠・出産](https://www.city.kita.lg.jp/children-edu/pregnancy/index.html)<br>[東京都北区くらしの手続きナビ](https://www.nicotto-navi.jp/city-kita/index.html)（[区官方入口](https://www.city.kita.lg.jp/living/registration/1001564/index.html)） | 区の妊娠・出産入口は確認済み。国保以外の保険者別分岐は本区ページだけでは閉じない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [妊娠・出産](https://www.city.kita.lg.jp/children-edu/pregnancy/index.html)<br>[妊娠期から出産・子育ての伴走型相談支援と経済的給付](https://www.city.kita.lg.jp/children-edu/pregnancy/1002777/1020066.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [東京都北区くらしの手続きナビ](https://www.nicotto-navi.jp/city-kita/index.html)（[区官方入口](https://www.city.kita.lg.jp/living/registration/1001564/index.html)）<br>[妊娠・出産](https://www.city.kita.lg.jp/children-edu/pregnancy/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [ご遺族の手続きを支援するガイドブック](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/563/r804okuyamiguidebook.pdf)<br>[北区で必要な手続きをご案内](https://www.okuyaminavi.net/municipalities/13117)（[区官方入口](https://www.city.kita.lg.jp/living/registration/1001523/1016957.html)）<br>[遺族サポートデスク（おくやみコーナー）のご案内](https://www.city.kita.lg.jp/living/registration/1001523/1016957.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [ご遺族の手続きを支援するガイドブック](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/563/r804okuyamiguidebook.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [ご遺族の手続きを支援するガイドブック](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/563/r804okuyamiguidebook.pdf)<br>[遺族サポートデスク（おくやみコーナー）のご案内](https://www.city.kita.lg.jp/living/registration/1001523/1016957.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [ご遺族の手続きを支援するガイドブック](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/563/r804okuyamiguidebook.pdf)<br>[遺族サポートデスク（おくやみコーナー）のご案内](https://www.city.kita.lg.jp/living/registration/1001523/1016957.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [ご遺族の手続きを支援するガイドブック](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/563/r804okuyamiguidebook.pdf)<br>[遺族サポートデスク（おくやみコーナー）のご案内](https://www.city.kita.lg.jp/living/registration/1001523/1016957.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [ご遺族の手続きを支援するガイドブック](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/563/r804okuyamiguidebook.pdf)<br>[遺族サポートデスク（おくやみコーナー）のご案内](https://www.city.kita.lg.jp/living/registration/1001523/1016957.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [ご遺族の手続きを支援するガイドブック](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/563/r804okuyamiguidebook.pdf)<br>[遺族サポートデスク（おくやみコーナー）のご案内](https://www.city.kita.lg.jp/living/registration/1001523/1016957.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [ご遺族の手続きを支援するガイドブック](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/563/r804okuyamiguidebook.pdf)<br>[年金を受けている方が亡くなったとき](https://www.nenkin.go.jp/service/jukyu/tetsuduki/kyotsu/jukyu/20140731-01.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [ご遺族の手続きを支援するガイドブック](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/563/r804okuyamiguidebook.pdf)<br>[遺族サポートデスク（おくやみコーナー）のご案内](https://www.city.kita.lg.jp/living/registration/1001523/1016957.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [ご遺族の手続きを支援するガイドブック](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/563/r804okuyamiguidebook.pdf)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [遺族サポートデスク（おくやみコーナー）のご案内](https://www.city.kita.lg.jp/living/registration/1001523/1016957.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 完整 | [ご遺族の手続きを支援するガイドブック](https://www.city.kita.lg.jp/_res/projects/default_project/_page_/001/001/563/r804okuyamiguidebook.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |

### 13118 荒川区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [くらしの手続きガイド](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[荒川区へ転入したときの手続き一覧](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/list_tennyu.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[荒川区へ転入したときの手続き一覧](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/list_tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[荒川区へ転入したときの手続き一覧](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/list_tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[荒川区へ転入したときの手続き一覧](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/list_tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 完整 | [【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[荒川区へ転入したときの手続き一覧](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/list_tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 完整 | [荒川区へ転入したときの手続き一覧](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/list_tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M08 | 儿童津贴迁移手续 | 完整 | [荒川区へ転入したときの手続き一覧](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/list_tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M09 | 介护保险迁移手续 | 完整 | [介護保険における転入・転出・死亡の手続き](https://www.city.arakawa.tokyo.jp/a029/kaigo/shinseisho/tennyu_tenshutu_sibo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M10 | 印鉴登记迁移手续 | 完整 | [【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[荒川区へ転入したときの手続き一覧](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/list_tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M11 | 必须到厅事项 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[荒川区へ転入したときの手続き一覧](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/list_tennyu.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠届出書の提出（母子健康手帳の発行）](https://www.city.arakawa.tokyo.jp/a033/ninshinshussan/shinsei/kenkotecho.html)<br>[あらかわ子育て応援ブック](https://www.city.arakawa.tokyo.jp/documents/1111/2025hyoushi.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 部分 | [あらかわ子育て応援ブック](https://www.city.arakawa.tokyo.jp/documents/1111/2025hyoushi.pdf) | 子育て冊子に相談導線はあるが、妊娠届時面談の対象・予約方式を一つの現行個別ページで確定できていない。 |
| C03 | 出生申报 | 完整 | [出生通知票と出生届の提出を忘れずに](https://www.city.arakawa.tokyo.jp/a033/ninshinshussan/shinsei/shusseitsuchi.html)<br>[あらかわ子育て応援ブック](https://www.city.arakawa.tokyo.jp/documents/1111/2025hyoushi.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [出生通知票と出生届の提出を忘れずに](https://www.city.arakawa.tokyo.jp/a033/ninshinshussan/shinsei/shusseitsuchi.html)<br>[あらかわ子育て応援ブック](https://www.city.arakawa.tokyo.jp/documents/1111/2025hyoushi.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)） | 区の国保加入導線は確認できるが、勤務先健康保険等の分岐は保険者側手続。 |
| C05 | 儿童津贴 | 完整 | [出生通知票と出生届の提出を忘れずに](https://www.city.arakawa.tokyo.jp/a033/ninshinshussan/shinsei/shusseitsuchi.html)<br>[あらかわ子育て応援ブック](https://www.city.arakawa.tokyo.jp/documents/1111/2025hyoushi.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [出生通知票と出生届の提出を忘れずに](https://www.city.arakawa.tokyo.jp/a033/ninshinshussan/shinsei/shusseitsuchi.html)<br>[あらかわ子育て応援ブック](https://www.city.arakawa.tokyo.jp/documents/1111/2025hyoushi.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [出生通知票と出生届の提出を忘れずに](https://www.city.arakawa.tokyo.jp/a033/ninshinshussan/shinsei/shusseitsuchi.html)<br>[あらかわ子育て応援ブック](https://www.city.arakawa.tokyo.jp/documents/1111/2025hyoushi.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)） | 出生ガイドは給付を案内するが、国保以外の保険者別申請は区サイトだけでは閉じない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [出生通知票と出生届の提出を忘れずに](https://www.city.arakawa.tokyo.jp/a033/ninshinshussan/shinsei/shusseitsuchi.html)<br>[あらかわ子育て応援ブック](https://www.city.arakawa.tokyo.jp/documents/1111/2025hyoushi.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[あらかわ子育て応援ブック](https://www.city.arakawa.tokyo.jp/documents/1111/2025hyoushi.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [死亡届を出された後の手続きハンドブック](https://www.city.arakawa.tokyo.jp/documents/2396/shiboutodokewodasaretaatonotetudukihandbook.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[届出サポートデスクを開設しています](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/supportdesk.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [死亡届を出された後の手続きハンドブック](https://www.city.arakawa.tokyo.jp/documents/2396/shiboutodokewodasaretaatonotetudukihandbook.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [死亡届を出された後の手続きハンドブック](https://www.city.arakawa.tokyo.jp/documents/2396/shiboutodokewodasaretaatonotetudukihandbook.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[届出サポートデスクを開設しています](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/supportdesk.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [死亡届を出された後の手続きハンドブック](https://www.city.arakawa.tokyo.jp/documents/2396/shiboutodokewodasaretaatonotetudukihandbook.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[届出サポートデスクを開設しています](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/supportdesk.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [死亡届を出された後の手続きハンドブック](https://www.city.arakawa.tokyo.jp/documents/2396/shiboutodokewodasaretaatonotetudukihandbook.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[届出サポートデスクを開設しています](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/supportdesk.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [死亡届を出された後の手続きハンドブック](https://www.city.arakawa.tokyo.jp/documents/2396/shiboutodokewodasaretaatonotetudukihandbook.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[届出サポートデスクを開設しています](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/supportdesk.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [死亡届を出された後の手続きハンドブック](https://www.city.arakawa.tokyo.jp/documents/2396/shiboutodokewodasaretaatonotetudukihandbook.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[届出サポートデスクを開設しています](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/supportdesk.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [死亡届を出された後の手続きハンドブック](https://www.city.arakawa.tokyo.jp/documents/2396/shiboutodokewodasaretaatonotetudukihandbook.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[年金を受けている方が亡くなったとき](https://www.nenkin.go.jp/service/jukyu/tetsuduki/kyotsu/jukyu/20140731-01.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [死亡届を出された後の手続きハンドブック](https://www.city.arakawa.tokyo.jp/documents/2396/shiboutodokewodasaretaatonotetudukihandbook.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[届出サポートデスクを開設しています](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/supportdesk.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [死亡届を出された後の手続きハンドブック](https://www.city.arakawa.tokyo.jp/documents/2396/shiboutodokewodasaretaatonotetudukihandbook.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)）<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [届出サポートデスクを開設しています](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/supportdesk.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 完整 | [死亡届を出された後の手続きハンドブック](https://www.city.arakawa.tokyo.jp/documents/2396/shiboutodokewodasaretaatonotetudukihandbook.pdf)<br>[【荒川区公式】荒川区 手続きガイド](https://ttzk.graffer.jp/ward-arakawa)（[区官方入口](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |

### 13119 板橋区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [書かない窓口（手続ナビ）](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)<br>[事前申請](https://jizen.publicserviceplatform.com/?public-entity-code=13119)（[区官方入口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)）<br>[住民登録](https://www.city.itabashi.tokyo.jp/tetsuduki/koseki/juminhyo/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [住民登録](https://www.city.itabashi.tokyo.jp/tetsuduki/koseki/juminhyo/index.html)<br>[事前申請](https://jizen.publicserviceplatform.com/?public-entity-code=13119)（[区官方入口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)）<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[住民登録](https://www.city.itabashi.tokyo.jp/tetsuduki/koseki/juminhyo/index.html)<br>[事前申請](https://jizen.publicserviceplatform.com/?public-entity-code=13119)（[区官方入口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [住民登録](https://www.city.itabashi.tokyo.jp/tetsuduki/koseki/juminhyo/index.html)<br>[事前申請](https://jizen.publicserviceplatform.com/?public-entity-code=13119)（[区官方入口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [住民登録](https://www.city.itabashi.tokyo.jp/tetsuduki/koseki/juminhyo/index.html)<br>[事前申請](https://jizen.publicserviceplatform.com/?public-entity-code=13119)（[区官方入口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 完整 | [住民登録](https://www.city.itabashi.tokyo.jp/tetsuduki/koseki/juminhyo/index.html)<br>[事前申請](https://jizen.publicserviceplatform.com/?public-entity-code=13119)（[区官方入口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 完整 | [いたばしくらしガイド2026](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/009/403/2026_all2.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M08 | 儿童津贴迁移手续 | 完整 | [いたばしくらしガイド2026](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/009/403/2026_all2.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M09 | 介护保险迁移手续 | 完整 | [介護保険 転出・転入時の手続き](https://www.city.itabashi.tokyo.jp/kenko/kaigo/hokenryo/1003636.html)<br>[いたばしくらしガイド2026](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/009/403/2026_all2.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M10 | 印鉴登记迁移手续 | 完整 | [住民登録](https://www.city.itabashi.tokyo.jp/tetsuduki/koseki/juminhyo/index.html)<br>[事前申請](https://jizen.publicserviceplatform.com/?public-entity-code=13119)（[区官方入口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M11 | 必须到厅事项 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[住民登録](https://www.city.itabashi.tokyo.jp/tetsuduki/koseki/juminhyo/index.html)<br>[事前申請](https://jizen.publicserviceplatform.com/?public-entity-code=13119)（[区官方入口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)）<br>[区役所に来庁せずにできる手続き等について](https://www.city.itabashi.tokyo.jp/tetsuduki/koseki/madoguchi/madoguchi/1020814.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠届・おやこ健康手帳（母子健康手帳）の交付について](https://www.city.itabashi.tokyo.jp/kosodate/ninshin/ninshin/1004062.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠届・おやこ健康手帳（母子健康手帳）の交付について](https://www.city.itabashi.tokyo.jp/kosodate/ninshin/ninshin/1004062.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 部分 | [書かない窓口（手続ナビ）](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)<br>[事前申請](https://jizen.publicserviceplatform.com/?public-entity-code=13119)（[区官方入口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)）<br>[いたばしくらしガイド2026](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/009/403/2026_all2.pdf) | 事前入力ナビと総合ガイドで導線はあるが、出生届の現行個別ページを本調査で展開していない。 |
| C04 | 孩子加入健康保险 | 部分 | [書かない窓口（手続ナビ）](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)<br>[事前申請](https://jizen.publicserviceplatform.com/?public-entity-code=13119)（[区官方入口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)）<br>[いたばしくらしガイド2026](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/009/403/2026_all2.pdf) | 板橋区国保以外の勤務先保険等は各保険者での手続。 |
| C05 | 儿童津贴 | 部分 | [書かない窓口（手続ナビ）](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)<br>[事前申請](https://jizen.publicserviceplatform.com/?public-entity-code=13119)（[区官方入口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)）<br>[いたばしくらしガイド2026](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/009/403/2026_all2.pdf) | 手続ナビは対象を抽出するが、児童手当の出生時期限・必要書類の個別ページ未展開。 |
| C06 | 儿童医疗费补助 | 部分 | [書かない窓口（手続ナビ）](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)<br>[事前申請](https://jizen.publicserviceplatform.com/?public-entity-code=13119)（[区官方入口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)）<br>[いたばしくらしガイド2026](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/009/403/2026_all2.pdf) | 総合ガイドとナビの導線は確認済みだが、医療証の個別資格ページ未展開。 |
| C07 | 出产育儿一时金 | 部分 | [出産したとき（出産育児一時金）](https://www.city.itabashi.tokyo.jp/kenko/kokuho/kokuho/kyufu/1003149.html) | 公式ページは板橋区国保加入者を中心に扱い、他保険者の分岐は区ページだけでは閉じない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [新生児等・産婦訪問（乳児家庭全戸訪問）](https://www.city.itabashi.tokyo.jp/kosodate/ninshin/shusan/1004078.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [書かない窓口（手続ナビ）](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)<br>[いたばしくらしガイド2026](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/009/403/2026_all2.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [おくやみハンドブック](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/044/331/okuyami202604.pdf)<br>[おくやみコーナーのご案内](https://www.city.itabashi.tokyo.jp/tetsuduki/kankon/1044331/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [おくやみハンドブック](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/044/331/okuyami202604.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [おくやみハンドブック](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/044/331/okuyami202604.pdf)<br>[おくやみコーナーのご案内](https://www.city.itabashi.tokyo.jp/tetsuduki/kankon/1044331/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [おくやみハンドブック](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/044/331/okuyami202604.pdf)<br>[おくやみコーナーのご案内](https://www.city.itabashi.tokyo.jp/tetsuduki/kankon/1044331/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [おくやみハンドブック](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/044/331/okuyami202604.pdf)<br>[おくやみコーナーのご案内](https://www.city.itabashi.tokyo.jp/tetsuduki/kankon/1044331/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [おくやみハンドブック](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/044/331/okuyami202604.pdf)<br>[おくやみコーナーのご案内](https://www.city.itabashi.tokyo.jp/tetsuduki/kankon/1044331/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [おくやみハンドブック](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/044/331/okuyami202604.pdf)<br>[おくやみコーナーのご案内](https://www.city.itabashi.tokyo.jp/tetsuduki/kankon/1044331/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [おくやみハンドブック](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/044/331/okuyami202604.pdf)<br>[年金を受けている方が亡くなったとき](https://www.nenkin.go.jp/service/jukyu/tetsuduki/kyotsu/jukyu/20140731-01.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [おくやみハンドブック](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/044/331/okuyami202604.pdf)<br>[おくやみコーナーのご案内](https://www.city.itabashi.tokyo.jp/tetsuduki/kankon/1044331/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [おくやみハンドブック](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/044/331/okuyami202604.pdf)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみコーナーのご案内](https://www.city.itabashi.tokyo.jp/tetsuduki/kankon/1044331/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 完整 | [おくやみハンドブック](https://www.city.itabashi.tokyo.jp/_res/projects/default_project/_page_/001/044/331/okuyami202604.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |

### 13120 練馬区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [引越し](https://www.city.nerima.tokyo.jp/kurashi/bamen/hikkoshi.html)<br>[行政手続情報](https://www.city.nerima.tokyo.jp/kusei/tokei/opendata/opendatasite/tokei_kusei/tetuzuki.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [引越し](https://www.city.nerima.tokyo.jp/kurashi/bamen/hikkoshi.html)<br>[練馬区から区外（国内）へ転出される方へ](https://www.city.nerima.tokyo.jp/kurashi/koseki/kiroku/tenshutsu.files/77_tensyutu_R7.4.pdf.pdf)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引越し](https://www.city.nerima.tokyo.jp/kurashi/bamen/hikkoshi.html)<br>[練馬区から区外（国内）へ転出される方へ](https://www.city.nerima.tokyo.jp/kurashi/koseki/kiroku/tenshutsu.files/77_tensyutu_R7.4.pdf.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引越し](https://www.city.nerima.tokyo.jp/kurashi/bamen/hikkoshi.html)<br>[練馬区から区外（国内）へ転出される方へ](https://www.city.nerima.tokyo.jp/kurashi/koseki/kiroku/tenshutsu.files/77_tensyutu_R7.4.pdf.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引越し](https://www.city.nerima.tokyo.jp/kurashi/bamen/hikkoshi.html)<br>[練馬区から区外（国内）へ転出される方へ](https://www.city.nerima.tokyo.jp/kurashi/koseki/kiroku/tenshutsu.files/77_tensyutu_R7.4.pdf.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 完整 | [引越し](https://www.city.nerima.tokyo.jp/kurashi/bamen/hikkoshi.html)<br>[練馬区から区外（国内）へ転出される方へ](https://www.city.nerima.tokyo.jp/kurashi/koseki/kiroku/tenshutsu.files/77_tensyutu_R7.4.pdf.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 完整 | [練馬区から区外（国内）へ転出される方へ](https://www.city.nerima.tokyo.jp/kurashi/koseki/kiroku/tenshutsu.files/77_tensyutu_R7.4.pdf.pdf)<br>[練馬区ガイド2025](https://www.city.nerima.tokyo.jp/kusei/koho/publication/newbenricho.files/2025_all.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M08 | 儿童津贴迁移手续 | 完整 | [児童手当](https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/teateiryo/jidouteate20120401.html)<br>[練馬区ガイド2025](https://www.city.nerima.tokyo.jp/kusei/koho/publication/newbenricho.files/2025_all.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M09 | 介护保险迁移手续 | 部分 | [練馬区から区外（国内）へ転出される方へ](https://www.city.nerima.tokyo.jp/kurashi/koseki/kiroku/tenshutsu.files/77_tensyutu_R7.4.pdf.pdf)<br>[練馬区ガイド2025](https://www.city.nerima.tokyo.jp/kusei/koho/publication/newbenricho.files/2025_all.pdf) | 総合ガイドと転出チェックリストに導線はあるが、介護保険の転入・転出個別ページを本調査で展開していない。 |
| M10 | 印鉴登记迁移手续 | 完整 | [引越し](https://www.city.nerima.tokyo.jp/kurashi/bamen/hikkoshi.html)<br>[練馬区から区外（国内）へ転出される方へ](https://www.city.nerima.tokyo.jp/kurashi/koseki/kiroku/tenshutsu.files/77_tensyutu_R7.4.pdf.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M11 | 必须到厅事项 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引越し](https://www.city.nerima.tokyo.jp/kurashi/bamen/hikkoshi.html)<br>[練馬区から区外（国内）へ転出される方へ](https://www.city.nerima.tokyo.jp/kurashi/koseki/kiroku/tenshutsu.files/77_tensyutu_R7.4.pdf.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠・出産](https://www.city.nerima.tokyo.jp/kurashi/bamen/ninshin.html)<br>[出産・子育てを応援します（給付金・ギフトのご案内）](https://www.city.nerima.tokyo.jp/kosodatekyoiku/shussan/20230110.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [出産・子育てを応援します（給付金・ギフトのご案内）](https://www.city.nerima.tokyo.jp/kosodatekyoiku/shussan/20230110.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [妊娠・出産](https://www.city.nerima.tokyo.jp/kurashi/bamen/ninshin.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [妊娠・出産](https://www.city.nerima.tokyo.jp/kurashi/bamen/ninshin.html) | 区公式入口は国保を中心に案内し、勤務先保険等は各保険者手続。 |
| C05 | 儿童津贴 | 完整 | [児童手当](https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/teateiryo/jidouteate20120401.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [子どもの手当・医療費助成](https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/teateiryo/jido/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [国保に加入している方が出産したとき（出産育児一時金の申請）](https://www.city.nerima.tokyo.jp/kurashi/nenkinhoken/kokuminkenkohoken/hoken_kyufu/shussan_shikyu.html) | 公式個別ページは練馬区国保加入者向けで、他保険者の申請分岐は区サイトだけでは閉じない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [妊娠・出産](https://www.city.nerima.tokyo.jp/kurashi/bamen/ninshin.html)<br>[出産・子育てを応援します（給付金・ギフトのご案内）](https://www.city.nerima.tokyo.jp/kosodatekyoiku/shussan/20230110.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [妊娠・出産](https://www.city.nerima.tokyo.jp/kurashi/bamen/ninshin.html)<br>[子どもの手当・医療費助成](https://www.city.nerima.tokyo.jp/kosodatekyoiku/kodomo/teateiryo/jido/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [おくやみハンドブック](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.files/20251225.0.pdf)<br>[おくやみに関する手続き](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html)<br>[練馬区で必要な手続きをご案内](https://www.okuyaminavi.net/municipalities/13120)（[区官方入口](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html)） | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [おくやみハンドブック](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.files/20251225.0.pdf)<br>[おくやみに関する手続き](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [おくやみハンドブック](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.files/20251225.0.pdf)<br>[おくやみに関する手続き](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [おくやみハンドブック](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.files/20251225.0.pdf)<br>[おくやみに関する手続き](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [おくやみハンドブック](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.files/20251225.0.pdf)<br>[おくやみに関する手続き](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [おくやみハンドブック](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.files/20251225.0.pdf)<br>[おくやみに関する手続き](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [おくやみハンドブック](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.files/20251225.0.pdf)<br>[おくやみに関する手続き](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [おくやみハンドブック](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.files/20251225.0.pdf)<br>[おくやみに関する手続き](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html)<br>[年金を受けている方が亡くなったとき](https://www.nenkin.go.jp/service/jukyu/tetsuduki/kyotsu/jukyu/20140731-01.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [おくやみハンドブック](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.files/20251225.0.pdf)<br>[おくやみに関する手続き](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [おくやみハンドブック](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.files/20251225.0.pdf)<br>[おくやみに関する手続き](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみに関する手続き](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 完整 | [おくやみハンドブック](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.files/20251225.0.pdf)<br>[おくやみに関する手続き](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |

### 13121 足立区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [引っ越しの手続き](https://www.city.adachi.tokyo.jp/kurashi/todokede/hikkoshi/index.html)<br>[「書かない窓口」稼働中！](https://www.city.adachi.tokyo.jp/sesaku/madoguchidx.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [引っ越しの手続き](https://www.city.adachi.tokyo.jp/kurashi/todokede/hikkoshi/index.html)<br>[引越しワンストップサービス](https://www.city.adachi.tokyo.jp/koseki/kurashi/todokede/hikkoshi-oss.html)<br>[足立区から転出される方へ](https://www.city.adachi.tokyo.jp/documents/58245/tennsyutusarerukatahe202504.pdf)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引っ越しの手続き](https://www.city.adachi.tokyo.jp/kurashi/todokede/hikkoshi/index.html)<br>[引越しワンストップサービス](https://www.city.adachi.tokyo.jp/koseki/kurashi/todokede/hikkoshi-oss.html)<br>[足立区から転出される方へ](https://www.city.adachi.tokyo.jp/documents/58245/tennsyutusarerukatahe202504.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引っ越しの手続き](https://www.city.adachi.tokyo.jp/kurashi/todokede/hikkoshi/index.html)<br>[引越しワンストップサービス](https://www.city.adachi.tokyo.jp/koseki/kurashi/todokede/hikkoshi-oss.html)<br>[足立区から転出される方へ](https://www.city.adachi.tokyo.jp/documents/58245/tennsyutusarerukatahe202504.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引っ越しの手続き](https://www.city.adachi.tokyo.jp/kurashi/todokede/hikkoshi/index.html)<br>[引越しワンストップサービス](https://www.city.adachi.tokyo.jp/koseki/kurashi/todokede/hikkoshi-oss.html)<br>[足立区から転出される方へ](https://www.city.adachi.tokyo.jp/documents/58245/tennsyutusarerukatahe202504.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 完整 | [引っ越しの手続き](https://www.city.adachi.tokyo.jp/kurashi/todokede/hikkoshi/index.html)<br>[引越しワンストップサービス](https://www.city.adachi.tokyo.jp/koseki/kurashi/todokede/hikkoshi-oss.html)<br>[足立区から転出される方へ](https://www.city.adachi.tokyo.jp/documents/58245/tennsyutusarerukatahe202504.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 完整 | [足立区から転出される方へ](https://www.city.adachi.tokyo.jp/documents/58245/tennsyutusarerukatahe202504.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M08 | 儿童津贴迁移手续 | 部分 | [足立区から転出される方へ](https://www.city.adachi.tokyo.jp/documents/58245/tennsyutusarerukatahe202504.pdf) | 転出チェックリストで関連手続は確認できるが、転入・転居を含む受給状況別詳細を一つのページでは確認できない。 |
| M09 | 介护保险迁移手续 | 部分 | [足立区から転出される方へ](https://www.city.adachi.tokyo.jp/documents/58245/tennsyutusarerukatahe202504.pdf) | 転出チェックリストに介護手続はあるが、転入時の資格証明等の個別説明ページ未展開。 |
| M10 | 印鉴登记迁移手续 | 完整 | [引っ越しの手続き](https://www.city.adachi.tokyo.jp/kurashi/todokede/hikkoshi/index.html)<br>[引越しワンストップサービス](https://www.city.adachi.tokyo.jp/koseki/kurashi/todokede/hikkoshi-oss.html)<br>[足立区から転出される方へ](https://www.city.adachi.tokyo.jp/documents/58245/tennsyutusarerukatahe202504.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M11 | 必须到厅事项 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引っ越しの手続き](https://www.city.adachi.tokyo.jp/kurashi/todokede/hikkoshi/index.html)<br>[引越しワンストップサービス](https://www.city.adachi.tokyo.jp/koseki/kurashi/todokede/hikkoshi-oss.html)<br>[足立区から転出される方へ](https://www.city.adachi.tokyo.jp/documents/58245/tennsyutusarerukatahe202504.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠届出・母子健康手帳の交付・赤ちゃん訪問連絡票（出生通知票）](https://www.city.adachi.tokyo.jp/hoken/k-kyoiku/kosodate/ninshin-shussho.html)<br>[児童手当・妊娠届の電子申請](https://www.city.adachi.tokyo.jp/sesaku/densi_sinsei.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠届出・母子健康手帳の交付・赤ちゃん訪問連絡票（出生通知票）](https://www.city.adachi.tokyo.jp/hoken/k-kyoiku/kosodate/ninshin-shussho.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [赤ちゃんが生まれたら](https://www.city.adachi.tokyo.jp/kosodate/umaretara/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [赤ちゃんが生まれたら](https://www.city.adachi.tokyo.jp/kosodate/umaretara/index.html) | 出生統合入口は国保加入を案内するが、勤務先健康保険等は各保険者手続。 |
| C05 | 儿童津贴 | 完整 | [赤ちゃんが生まれたら](https://www.city.adachi.tokyo.jp/kosodate/umaretara/index.html)<br>[児童手当・妊娠届の電子申請](https://www.city.adachi.tokyo.jp/sesaku/densi_sinsei.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [赤ちゃんが生まれたら](https://www.city.adachi.tokyo.jp/kosodate/umaretara/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [赤ちゃんが生まれたら](https://www.city.adachi.tokyo.jp/kosodate/umaretara/index.html) | 足立区国保と他保険者で申請先が分かれるため、区の入口だけでは全分岐が完結しない。 |
| C08 | 新生儿访问与保健指导 | 完整 | [妊娠届出・母子健康手帳の交付・赤ちゃん訪問連絡票（出生通知票）](https://www.city.adachi.tokyo.jp/hoken/k-kyoiku/kosodate/ninshin-shussho.html)<br>[赤ちゃんが生まれたら](https://www.city.adachi.tokyo.jp/kosodate/umaretara/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [赤ちゃんが生まれたら](https://www.city.adachi.tokyo.jp/kosodate/umaretara/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [ご遺族の方へ～各種手続きのご案内～](https://www.city.adachi.tokyo.jp/documents/69342/r8goizoku1.pdf)<br>[足立区で必要な手続きをご案内](https://www.okuyaminavi.net/municipalities/13121)（[区官方入口](https://www.city.adachi.tokyo.jp/koseki/okuyami.html)）<br>[おくやみ相談窓口](https://www.city.adachi.tokyo.jp/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [ご遺族の方へ～各種手続きのご案内～](https://www.city.adachi.tokyo.jp/documents/69342/r8goizoku1.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [ご遺族の方へ～各種手続きのご案内～](https://www.city.adachi.tokyo.jp/documents/69342/r8goizoku1.pdf)<br>[おくやみ相談窓口](https://www.city.adachi.tokyo.jp/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [ご遺族の方へ～各種手続きのご案内～](https://www.city.adachi.tokyo.jp/documents/69342/r8goizoku1.pdf)<br>[おくやみ相談窓口](https://www.city.adachi.tokyo.jp/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [ご遺族の方へ～各種手続きのご案内～](https://www.city.adachi.tokyo.jp/documents/69342/r8goizoku1.pdf)<br>[おくやみ相談窓口](https://www.city.adachi.tokyo.jp/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [ご遺族の方へ～各種手続きのご案内～](https://www.city.adachi.tokyo.jp/documents/69342/r8goizoku1.pdf)<br>[おくやみ相談窓口](https://www.city.adachi.tokyo.jp/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [ご遺族の方へ～各種手続きのご案内～](https://www.city.adachi.tokyo.jp/documents/69342/r8goizoku1.pdf)<br>[おくやみ相談窓口](https://www.city.adachi.tokyo.jp/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [ご遺族の方へ～各種手続きのご案内～](https://www.city.adachi.tokyo.jp/documents/69342/r8goizoku1.pdf)<br>[年金を受けている方が亡くなったとき](https://www.nenkin.go.jp/service/jukyu/tetsuduki/kyotsu/jukyu/20140731-01.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [ご遺族の方へ～各種手続きのご案内～](https://www.city.adachi.tokyo.jp/documents/69342/r8goizoku1.pdf)<br>[おくやみ相談窓口](https://www.city.adachi.tokyo.jp/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [ご遺族の方へ～各種手続きのご案内～](https://www.city.adachi.tokyo.jp/documents/69342/r8goizoku1.pdf)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみ相談窓口](https://www.city.adachi.tokyo.jp/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 完整 | [ご遺族の方へ～各種手続きのご案内～](https://www.city.adachi.tokyo.jp/documents/69342/r8goizoku1.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |

### 13122 葛飾区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [住民異動届（転入・転出・転居など）](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001438.html)<br>[かつしかわたしの便利帳2024～2027](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/027/396/cms_benrityou/new_all.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [住民異動届（転入・転出・転居など）](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001438.html)<br>[個人番号カードおよび住民基本台帳カードの継続利用手続き](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001441.html)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[住民異動届（転入・転出・転居など）](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001438.html)<br>[個人番号カードおよび住民基本台帳カードの継続利用手続き](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001441.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [住民異動届（転入・転出・転居など）](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001438.html)<br>[個人番号カードおよび住民基本台帳カードの継続利用手続き](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001441.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [住民異動届（転入・転出・転居など）](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001438.html)<br>[個人番号カードおよび住民基本台帳カードの継続利用手続き](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001441.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 完整 | [住民異動届（転入・転出・転居など）](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001438.html)<br>[個人番号カードおよび住民基本台帳カードの継続利用手続き](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001441.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M07 | 国民健康保险迁移手续 | 部分 | [かつしかわたしの便利帳2024～2027](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/027/396/cms_benrityou/new_all.pdf) | 総合便利帳で関連制度を確認したが、転入・転出時の国保個別ページは本調査で展開していない。 |
| M08 | 儿童津贴迁移手续 | 部分 | [かつしかわたしの便利帳2024～2027](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/027/396/cms_benrityou/new_all.pdf) | 総合便利帳と手当カテゴリに導線はあるが、移動事由別の期限・必要書類を一ページで確認できない。 |
| M09 | 介护保险迁移手续 | 部分 | [かつしかわたしの便利帳2024～2027](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/027/396/cms_benrityou/new_all.pdf) | 総合便利帳で介護手続を確認したが、転入・転出個別ページ未展開。 |
| M10 | 印鉴登记迁移手续 | 完整 | [住民異動届（転入・転出・転居など）](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001438.html)<br>[個人番号カードおよび住民基本台帳カードの継続利用手続き](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001441.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M11 | 必须到厅事项 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[住民異動届（転入・転出・転居など）](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001438.html)<br>[個人番号カードおよび住民基本台帳カードの継続利用手続き](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001441.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠届出と母子健康手帳の交付](https://www.city.katsushika.lg.jp/kenkou/1000050/1001803/1002071.html)<br>[妊娠期](https://www.city.katsushika.lg.jp/kosodate/1000056/1030342/1021613.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 完整 | [妊娠期](https://www.city.katsushika.lg.jp/kosodate/1000056/1030342/1021613.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C03 | 出生申报 | 完整 | [出産と子育て](https://www.city.katsushika.lg.jp/information/1000087/1038058/1038630.html)<br>[各種手当・医療費助成](https://www.city.katsushika.lg.jp/kosodate/1000056/1002336/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [出産と子育て](https://www.city.katsushika.lg.jp/information/1000087/1038058/1038630.html)<br>[各種手当・医療費助成](https://www.city.katsushika.lg.jp/kosodate/1000056/1002336/index.html) | 出生後の国保又は勤務先保険で手続先が分かれ、区サイトだけでは全分岐が完結しない。 |
| C05 | 儿童津贴 | 完整 | [各種手当・医療費助成](https://www.city.katsushika.lg.jp/kosodate/1000056/1002336/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [各種手当・医療費助成](https://www.city.katsushika.lg.jp/kosodate/1000056/1002336/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [出産育児一時金](https://www.city.katsushika.lg.jp/kurashi/1000049/1001690/1001740.html) | 個別ページは葛飾区国保加入者向けで、他保険者分岐は別手続。 |
| C08 | 新生儿访问与保健指导 | 完整 | [こんにちは赤ちゃん訪問事業](https://www.city.katsushika.lg.jp/kenkou/1000050/1001803/1024614.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [出産と子育て](https://www.city.katsushika.lg.jp/information/1000087/1038058/1038630.html)<br>[かつしかわたしの便利帳2024～2027](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/027/396/cms_benrityou/new_all.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [おくやみハンドブック](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/399/okuyami20251001.pdf)<br>[おくやみコーナー・おくやみハンドブック](https://www.city.katsushika.lg.jp/kurashi/1000046/1025399/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [おくやみハンドブック](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/399/okuyami20251001.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [おくやみハンドブック](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/399/okuyami20251001.pdf)<br>[おくやみコーナー・おくやみハンドブック](https://www.city.katsushika.lg.jp/kurashi/1000046/1025399/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [おくやみハンドブック](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/399/okuyami20251001.pdf)<br>[おくやみコーナー・おくやみハンドブック](https://www.city.katsushika.lg.jp/kurashi/1000046/1025399/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [おくやみハンドブック](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/399/okuyami20251001.pdf)<br>[おくやみコーナー・おくやみハンドブック](https://www.city.katsushika.lg.jp/kurashi/1000046/1025399/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [おくやみハンドブック](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/399/okuyami20251001.pdf)<br>[おくやみコーナー・おくやみハンドブック](https://www.city.katsushika.lg.jp/kurashi/1000046/1025399/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [おくやみハンドブック](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/399/okuyami20251001.pdf)<br>[おくやみコーナー・おくやみハンドブック](https://www.city.katsushika.lg.jp/kurashi/1000046/1025399/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [おくやみハンドブック](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/399/okuyami20251001.pdf)<br>[年金を受けている方が亡くなったとき](https://www.nenkin.go.jp/service/jukyu/tetsuduki/kyotsu/jukyu/20140731-01.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [おくやみハンドブック](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/399/okuyami20251001.pdf)<br>[おくやみコーナー・おくやみハンドブック](https://www.city.katsushika.lg.jp/kurashi/1000046/1025399/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [おくやみハンドブック](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/399/okuyami20251001.pdf)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみコーナー・おくやみハンドブック](https://www.city.katsushika.lg.jp/kurashi/1000046/1025399/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 完整 | [おくやみハンドブック](https://www.city.katsushika.lg.jp/_res/projects/default_project/_page_/001/025/399/okuyami20251001.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |

### 13123 江戸川区

| 代码 | 子流程 | 状态 | 官方来源 | 未覆盖或注意事项 |
|---|---|---|---|---|
| M01 | 搬家手续导航 | 完整 | [引越し（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/hikkoshi/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M02 | 迁出申报 | 完整 | [引越し（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/hikkoshi/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf)<br>[引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M03 | MyNa在线迁出 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引越し（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/hikkoshi/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M04 | 迁入申报 | 完整 | [引越し（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/hikkoshi/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M05 | 区内迁居申报 | 完整 | [引越し（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/hikkoshi/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M06 | My Number地址更新与继续使用 | 部分 | [引越し（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/hikkoshi/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf) | 引越しナビに住民異動導線はあるが、カード継続利用の個別ページを本調査で展開していない。 |
| M07 | 国民健康保险迁移手续 | 完整 | [引越し（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/hikkoshi/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M08 | 儿童津贴迁移手续 | 完整 | [引越し（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/hikkoshi/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M09 | 介护保险迁移手续 | 完整 | [引越し（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/hikkoshi/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M10 | 印鉴登记迁移手续 | 完整 | [引越し（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/hikkoshi/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| M11 | 必须到厅事项 | 完整 | [引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)<br>[引越し（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/hikkoshi/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C01 | 妊娠申报与母子健康手册 | 完整 | [妊娠届・親子健康手帳（母子健康手帳）](https://www.city.edogawa.tokyo.jp/e052/kosodate/ninshin/boshitecho.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C02 | 孕妇面谈与伴走支援 | 部分 | [妊娠届・親子健康手帳（母子健康手帳）](https://www.city.edogawa.tokyo.jp/e052/kosodate/ninshin/boshitecho.html) | 妊娠届・手帳交付とアプリ相談導線は確認済みだが、妊娠届時面談の対象・予約方式を現行個別ページで確定できていない。 |
| C03 | 出生申报 | 完整 | [出産（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/shussan/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C04 | 孩子加入健康保险 | 部分 | [出産（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/shussan/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf) | 出生ナビは関連制度へ誘導するが、勤務先保険等を含む全保険者分岐は区サイトだけでは閉じない。 |
| C05 | 儿童津贴 | 完整 | [出産（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/shussan/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C06 | 儿童医疗费补助 | 完整 | [出産（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/shussan/index.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C07 | 出产育儿一时金 | 部分 | [出産（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/shussan/index.html)<br>[くらしの便利帳 令和8年4月版](https://www.city.edogawa.tokyo.jp/documents/3671/r804benricho.pdf) | 出産ナビは公式個別ページへ誘導するが、加入保険者別の申請先が分かれる。 |
| C08 | 新生儿访问与保健指导 | 完整 | [新生児訪問（出生連絡票）](https://www.city.edogawa.tokyo.jp/e052/kenko/kenko/kodomo/homon.html)<br>[子育て応援アプリ「ぴよナビ えどがわ」](https://www.city.edogawa.tokyo.jp/e052/kosodate/ninshin/piyonabi.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C09 | 外国籍孩子取得在留资格 | 完整 | [在留資格取得許可申請](https://www.moj.go.jp/isa/applications/procedures/16-10.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| C10 | 育儿支援导航 | 完整 | [出産（手続きナビ）](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/shussan/index.html)<br>[子育て応援アプリ「ぴよナビ えどがわ」](https://www.city.edogawa.tokyo.jp/e052/kosodate/ninshin/piyonabi.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D01 | 身后手续导航 | 完整 | [おくやみガイド](https://www.city.edogawa.tokyo.jp/documents/45206/okuyami0430-.pdf)<br>[江戸川区で必要な手続きをご案内](https://www.okuyaminavi.net/municipalities/13123)（[区官方入口](https://www.city.edogawa.tokyo.jp/e031/kurashi/todoke/koseki/okuyami.html)）<br>[おくやみコーナーのご案内](https://www.city.edogawa.tokyo.jp/e031/kurashi/todoke/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D02 | 死亡申报与火葬许可 | 完整 | [おくやみガイド](https://www.city.edogawa.tokyo.jp/documents/45206/okuyami0430-.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D03 | 住民记录与户主变更 | 完整 | [おくやみガイド](https://www.city.edogawa.tokyo.jp/documents/45206/okuyami0430-.pdf)<br>[おくやみコーナーのご案内](https://www.city.edogawa.tokyo.jp/e031/kurashi/todoke/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D04 | My Number与印鉴登记证处理 | 完整 | [おくやみガイド](https://www.city.edogawa.tokyo.jp/documents/45206/okuyami0430-.pdf)<br>[おくやみコーナーのご案内](https://www.city.edogawa.tokyo.jp/e031/kurashi/todoke/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D05 | 健康保险资料返还 | 完整 | [おくやみガイド](https://www.city.edogawa.tokyo.jp/documents/45206/okuyami0430-.pdf)<br>[おくやみコーナーのご案内](https://www.city.edogawa.tokyo.jp/e031/kurashi/todoke/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D06 | 葬祭费 | 完整 | [おくやみガイド](https://www.city.edogawa.tokyo.jp/documents/45206/okuyami0430-.pdf)<br>[おくやみコーナーのご案内](https://www.city.edogawa.tokyo.jp/e031/kurashi/todoke/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D07 | 介护保险资料返还 | 完整 | [おくやみガイド](https://www.city.edogawa.tokyo.jp/documents/45206/okuyami0430-.pdf)<br>[おくやみコーナーのご案内](https://www.city.edogawa.tokyo.jp/e031/kurashi/todoke/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D08 | 年金与遗属给付 | 部分 | [おくやみガイド](https://www.city.edogawa.tokyo.jp/documents/45206/okuyami0430-.pdf)<br>[年金を受けている方が亡くなったとき](https://www.nenkin.go.jp/service/jukyu/tetsuduki/kyotsu/jukyu/20140731-01.html) | 遗属基础年金、遗属厚生年金、寡妇年金和死亡一时金等按加入制度分流，未逐项核验全部分支与渠道。 |
| D09 | 住民税继承人代表 | 完整 | [おくやみガイド](https://www.city.edogawa.tokyo.jp/documents/45206/okuyami0430-.pdf)<br>[おくやみコーナーのご案内](https://www.city.edogawa.tokyo.jp/e031/kurashi/todoke/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D10 | 在留卡等返还 | 完整 | [おくやみガイド](https://www.city.edogawa.tokyo.jp/documents/45206/okuyami0430-.pdf)<br>[在留カード等の返納](https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D11 | 身后手续窗口预约与协助 | 完整 | [おくやみコーナーのご案内](https://www.city.edogawa.tokyo.jp/e031/kurashi/todoke/koseki/okuyami.html) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |
| D12 | 继承及民间手续转介 | 完整 | [おくやみガイド](https://www.city.edogawa.tokyo.jp/documents/45206/okuyami0430-.pdf) | 主要公开分支已覆盖；不等于一次到厅即可全部办结。 |

## 使用限制与下一步线下核验

- `complete` 只表示公开来源对定义中的主要分支有直接证据，不表示现场一定一次办完。
- `unknown` 表示来源没有足够证据；不能自动解释为“没有此能力”。
- 实际等待时间、原件返还、跨科室联办、代理人例外、现场口译和无障碍支持仍需线下确认。
- 页面、SaaS导航和制度会更新；后续应按 `official_updated_at`、`verified_on` 和URL变更做增量复核。

## 文件

- `CORE_SUBFLOWS_2026-08-10.md`：33个子流程及现有引擎ID映射。
- `data/ward_event_subflows.json`：三语言子流程定义。
- `data/common_event_sources.json`：12个全国共通规范来源。
- `data/ward_event_source_matrix.json`：23区、759项覆盖与七能力字段。
- `data/ward_event_matrix_review_corrections.json`：独立审阅后的修正账本。
- `data/research_parts/`：三个原始研究分片，保留审计轨迹。
- `sources/apply_ward_event_matrix_review.mjs` 与两个 `validate_*.mjs`：可重复应用及验收。

