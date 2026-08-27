# てつづきメトロ：東京23区公式手続情報調査

調査基準日：2026-08-10  
产品范围：东京都23区。第一版主线为搬入・搬出・区内迁居、妊娠・出生・育儿、死亡・おくやみ；住民税、国保/年金、My Number/在留、垃圾/防灾、外国人咨询作为补充入口。

## 1. 结论

23区都能找到三条主线的官方信息，但不能从一个统一、匿名、实时的公共API取得“适用条件、期限、材料、窗口、预约、在线办理、区级差异”的完整记录。

现有资料主要分成四类：

1. 区官网HTML和PDF：权威，但结构和更新方式各不相同。
2. 区官网外链的问答导航：能生成个人清单，但多由Graffer、全国自治体おくやみ手続きナビ等外部系统承载，通常没有公开导出/API。
3. LoGo Form、マイナポータル、区民门户等申请系统：能办理部分手续，但“有申请入口”不等于整条生活事件都能在线完成。
4. 专窗、预约和书かない窓口：能减轻现场负担，但实际可合并多少手续、是否需要转科室，网页往往说不完整。

因此，てつづきメトロ最有价值的部分不是再复制一个区级问答页，而是把23区资料统一为可追溯的数据层，并明确区分：

- 信息指导
- 个性化手续判定
- 在线预约
- 在线提交
- 必须到厅
- 专窗/一站式协助

## 2. 判定标签

- `HTML`：官方正文页
- `PDF`：官方手册/清单
- `NAV`：问题分支或筛选导航
- `ONLINE`：存在电子申请
- `RESERVE`：能预约来厅/咨询
- `COUNTER`：专窗或一站式窗口
- `OPEN_DATA`：CSV、JSON或API可再利用
- `MULTI`：外语或やさしい日本語官方入口

“现在可用”分三档：

- **直接利用**：官方资料已明确对象、材料、地点等，可开始结构化。
- **引导利用**：可把用户送到问答、预约或申请，但不能把外部结果当作本地权威数据。
- **仍需补查**：期限、材料、窗口、区级例外、许可或更新时间不完整，需要电话/书面询问或线下核实。

## 3. 东京都与全国共通底座

| 分野 | 现有官方来源 | 第一版可直接使用 | 仍需逐区核对 |
|---|---|---|---|
| 搬家 | [数字厅：引越し手続オンラインサービス](https://www.digital.go.jp/policies/moving_onestop_service)、[マイナポータル：引越し関連手続一覧](https://myna.go.jp/html/moving_oss_procedure_list.html) | 在线转出、转入/转居来厅预告、全国共通关联手续 | 转入届通常仍需到厅；区级窗口、预约、儿童/医疗/孕检差异 |
| 出生育儿 | [数字厅：子育て支援制度レジストリ](https://www.digital.go.jp/policies/childrearing-support-registry) | 124类未就学儿童相关制度的标准化框架 | API需申请审查；首版仍须用各区官方页面核实制度、材料和申请渠道 |
| 外国居民生活 | [入管厅：外国人生活支援ポータル](https://www.moj.go.jp/isa/support/portal/index.html) | 市区町村手续、税、年金、保险、住居、防灾等多语言共通说明 | 东京各区窗口、区独自制度、多语言对面咨询 |
| 多语言咨询 | [東京都多言語相談ナビ](https://www.english.metro.tokyo.lg.jp/w/047-101-001190) | やさしい日本語在内的15语言生活咨询 | 各区的通译、日期、预约、现场支持 |
| 税 | [東京都主税局：个人住民税](https://www.tax.metro.tokyo.lg.jp/kazei/kojin_ju.html)、[外国居民都税信息](https://www.tax.metro.tokyo.lg.jp/english) | 住民税共通解释、都税外国语说明 | 特别区民税申告、纳付、证明、退休/迁出时处理 |

## 4. 23区官方入口与差异

### 13101 千代田区

- 综合导航：[千代田区手続きガイド](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/tetsuzukiguide.html) → [Graffer问答](https://ttzk.graffer.jp/ward-chiyoda)，覆盖迁入、迁出、迁居、出生、死亡等。
- 三主线：[転入・転出](https://www.city.chiyoda.lg.jp/lifeevent/tennyu/index.html)、[妊娠・出産](https://www.city.chiyoda.lg.jp/lifeevent/ninshin/index.html)、[おくやみコーナー](https://www.city.chiyoda.lg.jp/koho/kurashi/koseki/okuyamicorner.html)。
- 补充：[住民税](https://www.city.chiyoda.lg.jp/koho/kurashi/zekin/juminze/index.html)、[外国人税务说明](https://www.city.chiyoda.lg.jp/koho/kurashi/zekin/juminze/foreigner.html)、[多语生活指南](https://www.city.chiyoda.lg.jp/koho/kuse/koho/sekatsu-guide.html)、[区民门户](https://www.city.chiyoda.lg.jp/koho/kuse/johosesaku/portalsite-kaishi.html)。
- 可用：`HTML PDF NAV ONLINE RESERVE MULTI`。缺口：问答结果和实际申请分离，仍有大量到厅手续。

### 13102 中央区

- 综合导航：[区官网自建手続きナビ](https://www.city.chuo.lg.jp/tetsuduki/index.php)，覆盖搬家、出生、死亡等，定位为来厅前清单。
- 三主线：[住民の異動](https://www.city.chuo.lg.jp/kurashi/touroku/juuminidou/index.html)、[妊娠・出産](https://www.city.chuo.lg.jp/kosodate/shussan/index.html)、[おくやみコーナー](https://www.city.chuo.lg.jp/a0012/syohisikatsu/20240621.html)。
- 补充：[Chuo City Living Guide](https://www.city.chuo.lg.jp/easyjp/index.html)、[在线手续门户](https://www.city.chuo.lg.jp/a0004/kurashi/online/onlineshinsei.html)。
- 可用：`HTML PDF NAV ONLINE RESERVE COUNTER MULTI`。优点是自托管导航和Easy Japanese；缺口是导航不直接提交。

### 13103 港区

- 综合入口：[暮らし・手続き](https://www.city.minato.tokyo.jp/kurashi/)，无统一跨事件问答。
- 三主线：[引越しに関する手続き](https://www.city.minato.tokyo.jp/kurashi/todokede/index-todokede02.html)、[妊娠・出産](https://www.city.minato.tokyo.jp/kenko/ninshin/)、[死亡手续指南](https://www.city.minato.tokyo.jp/shibamadochou/kurashi/goizoku/tetsuzuki.html) → [Graffer](https://ttzk.graffer.jp/ward-minato)。
- 补充：[ご遺族支援コーナー](https://www.city.minato.tokyo.jp/shibamadochou/kurashi/goizoku/corner.html)、[Minato City Living Guide](https://www.city.minato.tokyo.jp/easyjp/index.html)、[电子申请清单](https://www.city.minato.tokyo.jp/jouhoseisaku/kurashi/todokede/denshishinse/denshishinseichiran.html)。
- 可用：`HTML PDF NAV ONLINE RESERVE COUNTER MULTI`。强在预约、窗口和多语运营；缺口是跨事件体验分散。

### 13104 新宿区

- 综合导航：[新宿行政手続きナビ](https://www.city.shinjuku.lg.jp/kusei/tetsuzukinavi.html) → [官网手续搜索器](https://www.city.shinjuku.lg.jp/form/search.php?f=portal.html)，可按生活场景、目的和电子/邮寄/窗口渠道筛选。
- 三主线：[住所変更の届出](https://www.city.shinjuku.lg.jp/todokede/index01.html)、[妊娠・出産](https://www.city.shinjuku.lg.jp/living_08.html)、[おくやみ相談窓口](https://www.city.shinjuku.lg.jp/todokede/koseki02_000001_00015.html)。
- 补充：[外国人向け生活情報](https://www.foreign.city.shinjuku.lg.jp/jp/)、[电子申请服务](https://www.city.shinjuku.lg.jp/kusei/index15.html)。
- 可用：`HTML PDF ONLINE RESERVE COUNTER MULTI`，并拥有较成熟的手续元数据检索。缺口：不是个人问答清单，质量依赖各部门页面。

### 13105 文京区

- 综合导航：[くらしの手続きガイド](https://www.city.bunkyo.lg.jp/b004/p000176.html) → [Graffer](https://ttzk.graffer.jp/ward-bunkyo)，覆盖8类事件和保育，结果可URL/LINE分享。
- 三主线：[住民票の異動](https://www.city.bunkyo.lg.jp/b013/p000260/index.html)、[妊娠・出産](https://www.city.bunkyo.lg.jp/kosodatekyouiku/shussan/ninshin/index.html)、[ご不幸・相続](https://www.city.bunkyo.lg.jp/b003/p007517.html)。
- 补充：[外国人住民生活ガイド](https://www.city.bunkyo.lg.jp/b005/p007780.html)、[电子申请](https://www.city.bunkyo.lg.jp/b004/p006757.html)。
- 可用：`HTML PDF NAV ONLINE MULTI`。问答、持物清单、分享体验成熟；缺口：外籍指南对具体手续覆盖较浅。

### 13106 台東区

- 综合导航：[手続きサポートアシスタント](https://www.city.taito.lg.jp/benri/support/index.html)，另有[子育て手続きガイド](https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/graffer.html)。
- 三主线：[引越し](https://www.city.taito.lg.jp/lifeevent/hikkoshi.html)、[妊婦さん・ご家族の方へ](https://www.city.taito.lg.jp/kosodatekyouiku/kosodate/mokutei/kouzaevent/hokenjo/ninpuhenoosirase.html)、[死亡届・おくやみコーナー](https://www.city.taito.lg.jp/kurashi/sibo/todokede.html)。
- 补充：[外国人の方へ](https://www.city.taito.lg.jp/kurashi/foreigner/index.html)、[电子申请](https://www.city.taito.lg.jp/benri/denshi/index.html)。
- 可用：`HTML PDF NAV ONLINE RESERVE COUNTER MULTI`。缺口：新旧两套导航并存，部分事件页停留在2020年前后。

### 13107 墨田区

- 综合入口：官网“こんなときは”静态事件页，无统一问答。
- 三主线：[引越し](https://www.city.sumida.lg.jp/kurasi_guide/hikkosi.html)、[妊娠期・出産・子育て期](https://www.city.sumida.lg.jp/kenko_fukushi/kenko/oyako_kenko/index.html)、[おくやみコーナー・ハンドブック](https://www.city.sumida.lg.jp/kurashi/okuyami/okuyami.html)。
- 补充：[住民税](https://www.city.sumida.lg.jp/kurashi/zeikin/zyuuminzei/zyuminzei_ni_tuite.html)、[多文化共生](https://www.city.sumida.lg.jp/kurashi/tabunka/index.html)、[在线服务](https://www.city.sumida.lg.jp/online_service/index.html)。
- 可用：`HTML PDF ONLINE RESERVE COUNTER MULTI`。死亡实体一站式较强；缺口：没有个人化导航，多语手续内容较少。

### 13108 江東区

- 综合入口：[手続き案内](https://www.city.koto.lg.jp/tetsuduki/index.html)，是静态专题，站内搜索可生成AI摘要。
- 三主线：[住民異動届](https://www.city.koto.lg.jp/kurashi/jumin/idotodoke/index.html)、[妊娠・出産](https://www.city.koto.lg.jp/kodomo/ninshinshussan/index.html)、[おくやみ](https://www.city.koto.lg.jp/shibo.html) → [死亡问答导航](https://www.okuyaminavi.net/municipalities/13108)。
- 补充：[おくやみコーナー](https://www.city.koto.lg.jp/060301/okuyami.html)、[外国人生活指南](https://www.city.koto.lg.jp/foreigner/index.html)、[电子申请清单](https://www.city.koto.lg.jp/012101/onlinelist.html)。
- 可用：`HTML PDF NAV ONLINE RESERVE COUNTER MULTI`。缺口：个性化问答只覆盖死亡。

### 13109 品川区

- 综合入口：[手続き・届出](https://www.city.shinagawa.tokyo.jp/PC/procedure/index.html)、[引越し手続きチェックシート](https://www.city.shinagawa.tokyo.jp/PC/procedure/20250206184722.html)。
- 三主线：[妊娠届](https://www.city.shinagawa.tokyo.jp/PC/kodomo/kodomo-ninnshinn/kodomo-ninnshinn-service/hpg000000783.html)、[出生届](https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-koseki/procedure-koseki-todokede/hpg000001411.html)、[おくやみコーナー](https://www.city.shinagawa.tokyo.jp/PC/procedure/okuyami/20231114184050.html)。
- 补充：[住民税申告](https://www.city.shinagawa.tokyo.jp/PC/procedure/procedure-zeikin/procedure-zeikin-sinkoku/procedure-zeikin-sinkoku-kuminzei/procedure-zeikin-sinkoku-kuminzei-kozin/hpg000001465.html)、[SHINAGAWA INFO.](https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-siryo/kuseizyoho-siryo-kankoubutu/20200310134121.html)、[电子申请](https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-siryo/kuseizyoho-siryo-denshi/index.html)。
- 可用：`HTML PDF ONLINE RESERVE COUNTER MULTI`。缺口：无跨事件问答，搬家偏静态PDF清单。

### 13110 目黒区

- 综合导航：[手続案内サービス](https://www.city.meguro.tokyo.jp/dxsenryaku/kusei/onlineservice/process_guidance.html) → [Graffer](https://ttzk.graffer.jp/ward-meguro?ttzk-guides=true)，覆盖搬入、搬出、迁居、出生、死亡等，三主线支持英语。
- 三主线：[転入届](https://www.city.meguro.tokyo.jp/koseki/kurashi/hikkoshi/tennyu_mado.html)、[母子保健事業案内](https://www.city.meguro.tokyo.jp/hokenyobou/kosodatekyouiku/ninshin/boshihoken.html)、[おくやみコーナー](https://www.city.meguro.tokyo.jp/kouhou/kurashi/soudan/okuyami.html)。
- 补充：[外国籍のかたの手続き](https://www.city.meguro.tokyo.jp/kurashi/foreigners/index.html)、[For Foreign Residents](https://www.city.meguro.tokyo.jp/multi/)、[在线服务](https://www.city.meguro.tokyo.jp/kusei/onlineservice/index.html)。
- 可用：`HTML PDF NAV ONLINE RESERVE COUNTER MULTI`。整体原型较完整；缺口：问答结果并非都能直接提交，无公开数据出口。

### 13111 大田区

- 综合导航：[各種手続きのご案内](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/guide.html) → [Graffer](https://ttzk.graffer.jp/ward-ota)，覆盖8类生活事件。
- 三主线：[転居届](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/jyuminhyo/todokede/tenkyo.html)、[出産後の手続き](https://www.city.ota.tokyo.jp/seikatsu/kodomo/shussan/akachan.html)、[おくやみガイド・コーナー](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/okuyami-corner-guide.html)。
- 补充：[住民税申告](https://www.city.ota.tokyo.jp/seikatsu/zeikin/kazei/shinkoku.html)、[やさしい日本語くらしガイド](https://www.city.ota.tokyo.jp/kokusaitoshi/book/life/guide-to-life_japanese.html)、[电子申请](https://www.city.ota.tokyo.jp/denshishinsei/1_itiran.html)、[住民异动预约/预填/QR](https://www.city.ota.tokyo.jp/seikatsu/koseki_j/topics/tenshutu-yoyaku_pc-smartphone.html)。
- 可用：`HTML PDF NAV ONLINE RESERVE COUNTER MULTI`。执行衔接最强之一；缺口：多语手续内容仍分散，无API。

### 13112 世田谷区

- 综合导航：[くらしの手続きガイド](https://www.city.setagaya.lg.jp/02233/1171.html)，连接搬家、出生、改名、婚姻、离婚、死亡问答。
- 三主线：[お引越し手続き](https://www.city.setagaya.lg.jp/02312/18274.html)、[妊娠・出産・子育てガイド](https://www.city.setagaya.lg.jp/02413/21570.html)、[ご遺族の諸手続き](https://www.city.setagaya.lg.jp/02233/1172.html)。
- 补充：[住民税](https://www.city.setagaya.lg.jp/kurashi/zeikin/category/11672.html)、[外国人住民の方へ](https://www.city.setagaya.lg.jp/forforeigners/index.html)、[在线手续](https://www.city.setagaya.lg.jp/onlinetetsuzuki/)。
- 可用：`HTML PDF NAV ONLINE MULTI`。内容深，但HTML、拆分PDF、问答和申请入口碎片化，部分导航入口更新偏旧。

### 13113 渋谷区

- 综合入口：[くらし](https://www.city.shibuya.tokyo.jp/kurashi/)、[LIVING IN SHIBUYA](https://www.city.shibuya.tokyo.jp/contents/living-in-shibuya/ja/)。
- 三主线：[転入届](https://www.city.shibuya.tokyo.jp/kurashi/jumin/ido/t_tennyu.html)、[妊婦面接](https://www.city.shibuya.tokyo.jp/kodomo/ninshin/ninshin-sodan/ninpu.html)、[おくやみ](https://www.city.shibuya.tokyo.jp/contents/case/okuyami.html)。
- 补充：[住民税申告](https://www.city.shibuya.tokyo.jp/kurashi/juminzei/kazei/juminzei_shinkoku.html)、[外国人住民手续](https://www.city.shibuya.tokyo.jp/kurashi/gaikokujin/jumin/)、[在线手续清单](https://dcp.city.shibuya.tokyo.jp/biz/s/OnlineProcedureList)。
- 可用：`HTML PDF ONLINE RESERVE MULTI`。Web-first外国居民体验较强；缺口：未发现跨事件问答或专门遗属窗口，仍需多次跳转。

### 13114 中野区

- 综合入口：[くらし・手続き](https://www.city.tokyo-nakano.lg.jp/kurashi/)、[デジタル窓口](https://www.city.tokyo-nakano.lg.jp/kurashi/digitalmadoguti/index.html)。
- 三主线：[引越し](https://www.city.tokyo-nakano.lg.jp/kurashi/koseki/jyuminhyo/hikkoshi.html)、[妊娠届](https://www.city.tokyo-nakano.lg.jp/kosodate/kosodatesite_ohirune/nenreibetsu/ninshin/tetsuduki/ninshintodoke.html)、[おくやみ窓口](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.html) → [死亡问答](https://www.okuyaminavi.net/municipalities/13114)。
- 补充：[2026おくやみガイド](https://www.city.tokyo-nakano.lg.jp/kurashi/soudan/soudan/okuyamimadoguchi.files/2026_okuyamiguide.pdf)、[外国人の方へ](https://www.city.tokyo-nakano.lg.jp/kurashi/gaikoku/index.html)、[在线化状况](https://www.city.tokyo-nakano.lg.jp/kusei/toukei-cyousa/survey/denshishinsei.html)。
- 可用：`HTML PDF NAV ONLINE RESERVE COUNTER MULTI`。死亡闭环很完整；缺口：问答只成熟于死亡，无统一API。

### 13115 杉並区

- 综合入口：[くらし・手続き](https://www.city.suginami.tokyo.jp/kurashi/index.html)，另有[引っ越し](https://www.city.suginami.tokyo.jp/hikkoshi/index.html)和[おくやみ](https://www.city.suginami.tokyo.jp/okuyami/index.html)目的页。
- 三主线：[転入届](https://www.city.suginami.tokyo.jp/s018/996.html)、[妊娠したとき](https://www.city.suginami.tokyo.jp/s054/1109.html)、[杉並区おくやみガイド](https://ttzk.graffer.jp/city-suginami/okuyami)。
- 补充：[所得税・个人住民税申告](https://www.city.suginami.tokyo.jp/s028/2054.html)、[外国居民生活指南](https://www.city.suginami.tokyo.jp/s030/546.html)、[在线服务](https://www.city.suginami.tokyo.jp/online/index.html)。
- 可用：`HTML PDF NAV ONLINE MULTI`。缺口：问答集中在死亡，搬家和出生仍是静态页面。

### 13116 豊島区

- 综合入口：[手続き・届出](https://www.city.toshima.lg.jp/tetsuzuki/index.html)，支持简易日语切换。
- 三主线：[住所・世帯変更](https://www.city.toshima.lg.jp/096/tetsuzuki/todokede/kiroku/index.html)、[妊娠届](https://www.city.toshima.lg.jp/219/kosodate/ninshin/shussanmade/001311.html)、[おくやみコーナー](https://www.city.toshima.lg.jp/093/2105180941.html)。
- 补充：[住民税申告](https://www.city.toshima.lg.jp/101/tetsuzuki/ze/juminze/001850.html)、[外国人生活信息](https://www.city.toshima.lg.jp/info/index.html)、[外国人咨询](https://www.city.toshima.lg.jp/info/jp/support.html)、[电子申请](https://www.city.toshima.lg.jp/497/kuse/electronic/denshishinse/index.html)。
- 可用：`HTML PDF ONLINE RESERVE COUNTER MULTI`。外国居民信息架构优秀；缺口：没有跨事件问答，入口与部分内容更新时间不一致。

### 13117 北区

- 综合导航：[くらしの手続きナビ](https://www.nicotto-navi.jp/city-kita/index.html)覆盖7类生活事件；另有[区官网申请・手续搜索](https://www.city.kita.lg.jp/shinsei_tetsuzuki_search.html)。
- 三主线：[引越し](https://www.city.kita.lg.jp/living/registration/1001564/index.html)、[妊娠・出産](https://www.city.kita.lg.jp/children-edu/pregnancy/index.html)、[遺族サポートデスク](https://www.city.kita.lg.jp/living/registration/1001523/1016957.html)。
- 补充：[住民税](https://www.city.kita.lg.jp/living/tax/1001899/index.html)、[外国居民生活信息](https://www.city.kita.lg.jp/culture-tourism-sports/exchange/1018313/1010335/1017619.html)。
- 可用：`HTML PDF NAV ONLINE RESERVE COUNTER MULTI`。最接近“导航层+申请搜索层”；缺口：外部导航不能保证所有条件，窗口样式未完全进入搜索台账。

### 13118 荒川区

- 综合导航：[くらしの手続きガイド](https://www.city.arakawa.tokyo.jp/a008/todokede/denshishinsei/tetsudukigaido.html) → [Graffer](https://ttzk.graffer.jp/ward-arakawa)，支持结果URL、LINE和打印。
- 三主线：[転入・転出・転居](https://www.city.arakawa.tokyo.jp/todokede/koseki/tennyuutenshutsu/index.html)、[妊娠・出産](https://www.city.arakawa.tokyo.jp/ninshinshussan/index.html)、[死亡手续](https://www.city.arakawa.tokyo.jp/a010/todokede/koseki/shibo.html)。
- 补充：[住民税](https://www.city.arakawa.tokyo.jp/a012/zeikin/juuminzei/kutomin.html)、[外国人生活便利账](https://www.city.arakawa.tokyo.jp/a015/kokusai/benrityou.html)、[无需来厅手续](https://www.city.arakawa.tokyo.jp/a001/soumu/online.html)。
- 可用：`HTML PDF NAV ONLINE MULTI`。分享和协同办理设计优秀；缺口：电子申请分散在多套外部系统，无CSV/API。

### 13119 板橋区

- 综合导航：[書かない窓口](https://www.city.itabashi.tokyo.jp/kusei/kouhou/houdou/1047573/1047704.html) → [事前入力・手続ナビ](https://jizen.publicserviceplatform.com/?public-entity-code=13119)，支持判定、预填、二维码和窗口打印。
- 三主线：[住民登録](https://www.city.itabashi.tokyo.jp/tetsuduki/koseki/juminhyo/index.html)、[妊娠したら](https://www.city.itabashi.tokyo.jp/kosodate/ninshin/ninshin/index.html)、[おくやみコーナー](https://www.city.itabashi.tokyo.jp/tetsuduki/kankon/1044331/index.html)。
- 补充：[住民税](https://www.city.itabashi.tokyo.jp/tetsuduki/zei/kuminzei/index.html)、[Welcome to いたばし](https://www.city.itabashi.tokyo.jp/tetsuduki/foreigner/seiaktsu/1045425.html)、[在线申请门户](https://www.city.itabashi.tokyo.jp/1015233/1019888/index.html)。
- 可用：`HTML PDF NAV ONLINE RESERVE COUNTER MULTI`。判定到现场执行连接最具体；缺口：在线完结与窗口预填容易混淆，依赖外部JS平台。

### 13120 練馬区

- 综合入口：[場面から探す](https://www.city.nerima.tokyo.jp/kurashi/bamen/index.html)。
- 三主线：[引越し](https://www.city.nerima.tokyo.jp/kurashi/bamen/hikkoshi.html)、[妊娠・出産](https://www.city.nerima.tokyo.jp/kurashi/bamen/ninshin.html)、[おくやみ](https://www.city.nerima.tokyo.jp/kurashi/bamen/shibo.html) → [死亡问答](https://www.okuyaminavi.net/municipalities/13120)。
- 补充：[住民税](https://www.city.nerima.tokyo.jp/kurashi/zei/jyuminzei/shinkoku1.html)、[外国人向け](https://www.city.nerima.tokyo.jp/gaikokunohitomuke/index.html)、[电子申请](https://www.city.nerima.tokyo.jp/kurashi/yakandonichi/sonota/denshishinse20100223.html)、[行政手续CSV](https://www.city.nerima.tokyo.jp/kusei/tokei/opendata/opendatasite/tokei_kusei/tetuzuki.html)。
- 可用：`HTML PDF NAV ONLINE RESERVE COUNTER MULTI OPEN_DATA`。死亡主线和开放数据优秀；缺口：CSV最后更新为2023-09-30，缺条件、期限、材料和依赖。

### 13121 足立区

- 综合入口：[書かない窓口](https://www.city.adachi.tokyo.jp/sesaku/madoguchidx.html)和事前申请系统，重点是QR和输入复用，不是生活事件问答。
- 三主线：[引っ越し](https://www.city.adachi.tokyo.jp/kurashi/todokede/hikkoshi/index.html)、[妊娠・出産](https://www.city.adachi.tokyo.jp/k-kyoiku/ninshin/index.html)、[おくやみ相談窓口](https://www.city.adachi.tokyo.jp/koseki/okuyami.html)。
- 补充：[税金](https://www.city.adachi.tokyo.jp/kurashi/zekin/index.html)、[外国居民信息](https://www.city.adachi.tokyo.jp/chiiki/kurashi/sekatsu-mondai/n-gaikokujin.html)、[在线申请系统](https://shinsei.city.adachi.tokyo.jp/)。
- 可用：`HTML PDF ONLINE RESERVE COUNTER MULTI`。在线申请索引和窗口预填强；缺口：“判定需要做什么”与“如何申请”是两条分离的路径。

### 13122 葛飾区

- 综合入口：[くらし・手続き](https://www.city.katsushika.lg.jp/kurashi/index.html)、[引越し](https://www.city.katsushika.lg.jp/lifeevent/lifeevent3.html)、[おくやみ](https://www.city.katsushika.lg.jp/lifeevent/lifeevent8.html)。
- 三主线：[住民異動届](https://www.city.katsushika.lg.jp/kurashi/1000046/1001401/1001438.html)、[妊娠・出産](https://www.city.katsushika.lg.jp/kenkou/1000050/1001803/)、[おくやみコーナー](https://www.city.katsushika.lg.jp/kurashi/1000046/1025399/index.html)。
- 补充：[住民税](https://www.city.katsushika.lg.jp/kurashi/1000047/1001463/)、[外国人生活指南](https://www.city.katsushika.lg.jp/information/1000087/1038058/index.html)、[在线申请](https://www.city.katsushika.lg.jp/online/1007358/1007366.html)。
- 可用：`HTML PDF ONLINE COUNTER MULTI`。外国人生活指南覆盖广；缺口：综合入口是静态链接，无个别判定，部分生活事件页较旧。

### 13123 江戸川区

- 综合导航：[手続き早わかりナビ](https://www.city.edogawa.tokyo.jp/kuseijoho/denshi/tetsuzukinavi/index.html)，包含搬家、妊娠、出生、死亡、就业、退职、确申等静态检查表。
- 三主线：[引越しチェックリスト](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/hikkoshi/index.html)、[出産チェックリスト](https://www.city.edogawa.tokyo.jp/tetsuzukinavi/shussan/index.html)、[おくやみコーナー](https://www.city.edogawa.tokyo.jp/e031/kurashi/todoke/koseki/okuyami.html)。
- 补充：[住民税申告](https://www.city.edogawa.tokyo.jp/e013/kurashi/zeikin/juminzei/tetsuzuki-kojin/sinkokunituite2.html)、[外国人生活信息](https://www.city.edogawa.tokyo.jp/foreign/index.html)、[在线手续](https://www.city.edogawa.tokyo.jp/e003/kuseijoho/keikaku/kuseiunei/dx/onlinetetsuduki.html)。
- 可用：`HTML PDF ONLINE RESERVE COUNTER MULTI`。搬家横断清单和外国居民结构优秀；缺口：没有问答个别化，无公开CSV/API。

## 5. 可以直接模仿的部分

不建议完整复制任何一个区。更合理的是组合以下成熟部件：

1. **新宿区**：统一手续元数据、生活场景标签、电子/邮寄/窗口渠道过滤。
2. **文京区、目黒区、北区、荒川区**：问题分支、个人清单、材料/窗口、结果分享。
3. **中央区**：问答导航自托管，避免核心体验完全依赖第三方SaaS；Easy Japanese结构完整。
4. **大田区、板橋区、足立区**：判定之后接预约、预填、二维码、窗口打印，减少重复输入。
5. **港区、中野区、練馬区、江東区**：死亡问答、PDF、预约、专窗/一站式服务组成闭环。
6. **練馬区**：开放CSV和设施数据；同时把“数据陈旧”作为显式风险，而不是默认为最新。
7. **新宿区、渋谷区、豊島区、江戸川区、葛飾区**：外国居民内容按生活任务组织，不要求用户先理解行政科室。

## 6. 第一版现在可以开始做的资料

1. 以现有69个共通手续和依赖图为底层，不因区不同复制23份。
2. 为每个区建立 `ward_profile`：自治体代码、官方主页、三主线入口、电子申请门户、外国人/易日入口、数据许可、最后核验日。
3. 为三条主线建立 `ward_event_override`，只记录真正不同的字段：课/系、窗口/设施、电话、地址、预约、在线渠道、区独自制度、区独自材料。
4. 外部问答导航只作为 `guide_url`；不得把其不可导出的结果伪装成本地结构化数据。
5. 把办理能力拆成 `information / questionnaire / reservation / online_submission / in_person / assisted_counter`。
6. 所有页面显示官方来源和最后核验日期；缺字段显示“尚未确认”，不静默套用其他区。

## 7. 仍然缺失、需要电话或线下补查的部分

- 同一幢楼、同一楼层、同一窗口能否真的连续办理。
- 问答导航没有覆盖的例外条件，尤其外国籍、代理人、跨区搬家、家庭成员不同步迁移。
- 到厅后是否需要重新填写、复印、取号、跨课室，网页上的“ワンストップ”具体到什么程度。
- 材料是提交、出示还是当场返还；复印件是否可用。
- 预约名额、典型等待时间、繁忙季变化、翻译设备/职员可用性。
- 只在窗口分发但未上网的清单、表格和多语言资料。
- PDF/网页再利用许可、问答导航结果的利用边界、更新责任部门。
- 区役所以外的入管、年金事务所、税务署、警察、雇主、银行、保险等跨机构流程。

建议第一轮线下不跑23区，而是选六个互补样本：港区（预约/专窗）、新宿区（外国居民）、文京区或目黒区（问答）、大田区或板橋区（预填/QR）、練馬区（开放数据）、中央区（自托管/Easy Japanese）。

## 8. 直播与比赛要求中可借鉴的点

用户提供的直播字幕强调：先问“解决什么问题”，再决定AI；明确人和AI各做什么；从一开始设计AI失败时的救济；使用开放数据时必须能说明数据如何被使用；可以小范围开始，但行政服务不能轻率。

这对应本项目的分工：

- AI负责自然语言入口、翻译草稿和解释。
- 规则引擎负责资格、期限、依赖和手续清单。
- 人工审校负责关键字段、例外和区级差异。
- 官方链接、核验日期和缺失状态负责可追溯与救济。

[2026官方募集要项](https://odhackathon.metro.tokyo.lg.jp/recruitment/)要求提交约2分钟展示视频、演示URL或操作视频，并从数据利用、创意、技术、社会影响、服务设计五个角度评价。23区覆盖矩阵和来源链直接支撑“数据利用”；跨区统一路线支撑“创意”；确定性规则图与AI分工支撑“技术合理性”；外国居民和新迁入者支撑“社会影响”；多语言、失败救济和后续更新支撑“服务设计”。

## 9. 下一步

本调查完成后，产品设计只需要继续确定三件事：

1. 三条主线各自第一版需要核实到哪些关键字段。
2. 个性化结果页如何展示“共通规则、区级差异、尚未确认”。
3. 比赛演示选哪一个完整人物路线，另外两条作为可横向扩展的证据。

