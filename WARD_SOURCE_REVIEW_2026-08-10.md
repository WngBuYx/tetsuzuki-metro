# てつづきメトロ：东京23区来源清单审阅结论

审阅日期：2026-08-10（JST）  
对象：`WARD_SOURCE_INVENTORY_2026-08-10.md`

## 先说结论

原文件可以作为“23区官方来源发现清单”，不能称为“23区三主线已完整验证的覆盖矩阵”。

- 23个区代码齐全：`13101–13123`，无重复。
- 清单记录187个 HTTPS 链接；其中既有区官方页面，也有区官方页面认可并跳转的外部运营系统。
- 代表性抽查8区，入口均可访问；发现的主要问题不是链接失效，而是能力语义、事件完整度和更新时间不能只按“区”汇总。
- 区级住民税来源当前只有15/23；税金属于补充范围，不能宣称已经覆盖。
- 外国居民相关入口23/23均已发现，但墨田、品川的入口是否足以覆盖实际手续仍要细查。
- 练马区的手续CSV可用于发现和原型，最后更新为2023-09-30，不能直接当作当前事实。
- 当前没有发现一个能够匿名、完整取得“东京23区 × 多生活事件 × 条件/期限/材料/依赖/窗口”的统一公开API。

## 必须采用的新口径

以后不再用一个区级 `ONLINE / RESERVE / COUNTER` 标签概括能力，而要绑定到：

`ward × event × procedure × source`

覆盖状态统一为：

- `complete`：目标子流程全部有来源并逐项核验。
- `partial`：只找到部分子流程或部分关键字段。
- `missing`：目标范围内确认没有找到来源。
- `unverified`：已发现入口，但尚未逐项核验。

入口能力统一拆成：

- `information`：只提供说明。
- `questionnaire`：通过问答生成个性化清单。
- `reservation`：只完成预约。
- `prefill`：只完成预填或生成二维码。
- `online_submission`：可以正式在线提交。
- `mandatory_visit`：仍必须本人或代理人到窗口。
- `assisted_counter`：窗口协助、咨询或代填，不代表全部手续当场办结。

## 原清单中需要降级或修正的地方

1. 品川区“三主线”段漏了搬家；搬家检查表出现在综合入口里，所以只能记为“来源已发现，字段编排待修正”，不能据此统计完整覆盖。
2. 目黑、大田、涩谷、杉并等区在行内只列了转入或区内迁居页面；不能推定转出和其他迁居子流程都已核验。
3. 台东、中野、丰岛等区只列了妊娠或出生的一部分入口；不能推定妊娠、出生、育儿全生命周期完整。
4. 中央区应写“官方域内导航”，不能仅凭域名判断为“自托管”。
5. 大田区是“预约＋届书预填＋QR，到场办理”，不是在线办结。
6. 板桥区应使用现行[書かない窓口服务页](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)，并明确“输入不等于申请完成，仍需到窗口”。
7. 足立区现有证据只支持“预填＋QR＋窗口输出”；不应顺带推定具有生活事件判定或预约能力。
8. 江东、中野、练马的 `okuyaminavi.net`，杉并等区的 Graffer，北区的 Nicotto，板桥的 Public Service Platform，都应标为“区官方认可、外部承载”，并保存官方介绍页和服务页两条URL。
9. 新宿的官方搜索器支持按办理渠道筛选，应标 `questionnaire=false`、`search_filter=true`，不能写成个性化问答。
10. “死亡闭环”一律降级为“问答/手册/预约/协助窗口的组合”；除非逐手续确认，不宣称全部事项能够一站式办结。

## 代表性官方页复核

| 区 | 复核结果 |
|---|---|
| 中央 | [手続きナビ](https://www.city.chuo.lg.jp/tetsuduki/index.php)仍在线，是到厅前问答清单；页面提醒结果可能有遗漏，不等于在线提交。 |
| 新宿 | [行政手続きナビ](https://www.city.shinjuku.lg.jp/form/search.php?f=portal.html)仍在线，可按电子、邮寄、窗口筛选；不是个人化问答，也没有发现公开API。 |
| 文京 | [くらしの手続きガイド说明页](https://www.city.bunkyo.lg.jp/b004/p000176.html)更新于2026-02-17，确认外链问答导航、8类事件和结果分享。 |
| 大田 | [住民异动预约及届书作成](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/tenshutu-yoyaku_pc-smartphone.html)更新于2026-06-02，明确是预约、预填和QR，仍须到厅。 |
| 板桥 | [書かない窓口](https://www.city.itabashi.tokyo.jp/tetsuduki/1047207/index.html)明确说明预填不完成正式申请，必须到窗口。 |
| 江东 | [おくやみ入口](https://www.city.koto.lg.jp/shibo.html)确认外部问答、预约制咨询窗口和手册；不证明全部手续现场办结。 |
| 练马 | [行政手続情報开放数据](https://www.city.nerima.tokyo.jp/kusei/tokei/opendata/opendatasite/tokei_kusei/tetuzuki.html)仍在线，最后更新为2023-09-30。 |
| 江户川 | [手续总入口](https://www.city.edogawa.tokyo.jp/kuseijoho/denshi/tetsuzukinavi/index.html)标示2019-04-01；搬家、出生、死亡子页更新时间不同，必须逐来源保存更新时间。 |

## 可以借鉴，但要拆开借鉴

- 新宿：统一手续搜索、生活事件分类、办理渠道过滤。
- 文京、目黑、北、荒川：条件问答、个人清单、结果分享。
- 中央：官方域内的来厅前问答导航和易读信息。
- 大田：预约、届书预填、二维码与窗口衔接；明确仍需来厅。
- 板桥：预填、二维码、窗口打印；明确不是在线办结。
- 足立：预填和窗口输出，不附加尚未证明的问答/预约能力。
- 港、中野、练马、江东：死亡手册、问答、预约和协助窗口的组合。
- 练马：公开CSV作为“资料发现层”，并把陈旧风险显式显示。
- 新宿、涩谷、丰岛、江户川、葛饰：面向外国居民的任务型、多语或简易日语信息结构。

## 下一版矩阵必须保存的字段

```text
ward_code
event
subflow
procedure_id
coverage_status
authority
host_type
operator
official_wrapper_url
service_url
entry_type
can_complete_online
mandatory_visit
actor_role
applicability
deadline
required_items
dependencies
counter_or_facility
official_updated_at
verified_on
source_locator
license
review_state
gap_note
```

其中 `official_updated_at` 是网页自己标示的更新时间；`verified_on` 是本项目最后核查日期，二者不得混用。

## 线下调查最值得确认的事情

1. 同一天是否真的能连办，而不是网页上看起来相邻。
2. 材料是提交、出示、复印、返还，还是窗口内部调取。
3. 外国居民、代理人、未成年人、单亲、跨区迁移等例外如何分流。
4. 问答导航给出的科室和窗口是否仍准确。
5. 多语言支持是网页机器翻译、电话口译、视频口译，还是现场有人。
6. 预约、预填、电子提交和最终办结分别在哪一步结束。

建议首轮线下样本：中央（官方域内问答）、新宿（手续搜索）、文京或目黑（跨事件问答）、大田或板桥（预填到窗口）、练马（开放数据与死亡服务）、港或中野（死亡支持）。它们代表的是不同模式，不是“最好区排名”。

## 对第一版产品范围的直接影响

第一版仍然以搬家、生育育儿、死亡为核心，税金、外国居民和日常生活问题作为补充层。但当前下一步不是继续堆更多手续，而是把三条主线拆成子流程，逐区补齐来源并标明状态。产品界面必须把“看说明、问答判定、预约、预填、在线提交、必须到厅、窗口协助”清楚分开。
