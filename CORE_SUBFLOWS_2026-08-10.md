# 三条主线子流程定义

版本：2026-08-10  
用途：为东京23区资料矩阵固定统一粒度。这里定义的是用户要完成的动作，不是各区网站自己的栏目名称。

## 状态怎么读

| 状态 | 含义 |
|---|---|
| `complete` 完整 | 已打开官方来源，来源明确覆盖该子流程，并能判断主要办理渠道和是否必须到厅。 |
| `partial` 部分 | 有官方资料，但只覆盖其中一部分、缺主要分支，或只负责把人转到别处。 |
| `missing` 缺失 | 已检索区官网和官方外链，仍没有找到可用来源；不代表该手续不存在。 |
| `unverified` 待核 | 找到入口，但尚未充分核对内容、适用范围或更新时间。 |

## 七种能力必须分开

每个来源分别记录：`information` 看说明、`questionnaire` 问答判定、`reservation` 预约、`prefill` 预填、`online_submission` 正式在线提交、`mandatory_visit` 必须到窗口、`assisted_counter` 窗口协助。

能力值只有 `yes / no / unknown / not_applicable`。没有证据时使用 `unknown`，不猜测。预填成功不等于申请成功；协助窗口也不等于全部手续一次办结。

## 搬家：11个子流程

| ID | 用户要完成的事 | 现有引擎手续ID |
|---|---|---|
| `moving_guidance` | 根据家庭情况得到搬家手续清单 | — |
| `move_out_notification` | 向旧住所自治体提交转出届 | `tenshutsu-todoke` |
| `myna_move_out_online` | 使用MyNa Portal在线提交转出届 | `tenshutsu-todoke` |
| `move_in_notification` | 向新住所区提交转入届 | `tennyu-todoke` |
| `intra_ward_move_notification` | 同一区内搬家时提交转居届 | — |
| `mynumber_address_continued_use` | 更新My Number地址、电子证书并继续使用卡片 | `mynumber-keizoku-riyou` |
| `national_health_insurance_move` | 办理国保迁出、迁入或区内地址变更 | `kokuho-tetsuzuki-moving` |
| `child_allowance_move` | 办理儿童津贴消灭届或新认定 | `jidou-teate-moving` |
| `care_insurance_move` | 办理介护保险地址和受给资格 | `kaigo-juusho-henko` |
| `seal_registration_move` | 注销旧印鉴登记并在新地址重新登记 | `inkan-touroku-moving` |
| `mandatory_visit_summary` | 明确哪些动作在线做完、哪些仍必须本人或代理人到厅 | —，由各来源能力推导 |

## 妊娠、出生、育儿：10个子流程

| ID | 用户要完成的事 | 现有引擎手续ID |
|---|---|---|
| `pregnancy_notification_handbook` | 提交妊娠届并领取母子健康手册 | — |
| `pregnancy_interview_support` | 完成妊妇面谈、伴走咨询和相关给付 | — |
| `birth_notification` | 提交出生届 | `shussho-todoke` |
| `child_health_insurance` | 给孩子加入国保或家庭的健康保险 | `kodomo-hoken-kanyu` |
| `child_allowance_birth` | 出生后申请儿童津贴 | `jidou-teate-shussho` |
| `child_medical_subsidy` | 申请儿童医疗费补助或医疗证 | `nyuyoji-iryosho` |
| `childbirth_lump_sum` | 办理出产育儿一时金 | `shussan-ichijikin` |
| `newborn_visit_health_guidance` | 申请或接受新生儿访问、产后和婴幼儿保健指导 | — |
| `foreign_child_residence_status` | 为在日本出生的外国籍孩子申请在留资格 | `kodomo-zairyu-shutoku` |
| `childcare_support_navigation` | 找到出生后的育儿服务、咨询和支援制度 | — |

## 死亡：12个子流程

| ID | 用户要完成的事 | 现有引擎手续ID |
|---|---|---|
| `death_guidance` | 通过手册或问答确认适用于自己的死亡后手续 | — |
| `death_notification_cremation` | 提交死亡届并取得火葬许可 | `shibou-todoke` |
| `household_register_change` | 办理世带主和住民记录相关变更 | `setainushi-henko` |
| `mynumber_seal_return` | 处理My Number卡和印鉴登记证 | `mynumber-henno`, `inkan-henno` |
| `health_insurance_return` | 返还国保/后期高龄资料并处理家属保险 | `kokuho-henno`, `kouki-henno`, `kokuho-fuyou-kanyu` |
| `funeral_benefit` | 申请国保或后期高龄葬祭费 | `sousaihi-kokuho`, `sousaihi-kouki` |
| `care_insurance_return` | 返还介护保险资料并完成相关清算 | `kaigo-henno` |
| `pension_survivor_procedures` | 办理死亡届、未支给年金、遗族年金等 | `nenkin-mishikyu-kokumin`, `nenkin-mishikyu-jimusho`, `shibou-ichijikin`, `izoku-kiso-nenkin`, `kafu-nenkin` |
| `resident_tax_heir_representative` | 指定住民税相续人代表并确认未纳税额 | `sozokunin-daihyo` |
| `foreign_resident_card_return` | 返还外国人的在留卡或特别永住者证明书 | `zairyu-card-henno` |
| `bereavement_counter_reservation` | 预约并使用おくやみ窗口或遗族支援窗口 | — |
| `inheritance_referral` | 找到相续放弃、登记、税务、银行、保险和公共事业后续入口 | `junkakutei-shinkoku`, `sozokuzei-shinkoku`, `sozokunin-kakutei`, `houtei-sozoku-joho`, `sozoku-houki`, `sozoku-touki`, `ginko-kouza`, `seimei-hoken`, `koukyo-ryokin` |

## 资料边界

- 国家共通规则、东京都规则和区级差异分别保存，不用区网页替代国家规则，也不用东京都税页面替代特别区民税。
- 外部问答或申请平台只有在区官方页面明确链接时才收录，并同时保存区官方介绍页和外部服务页。
- 页面自己的更新时间写入 `official_updated_at`；本项目核验日期写入 `verified_on`。
- 本矩阵描述“公开资料能证明什么”，不声称实际窗口一定能同日连办。线下等待、材料返还、转科室和口译仍需实查。
