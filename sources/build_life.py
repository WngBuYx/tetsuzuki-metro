# -*- coding: utf-8 -*-
"""就職 / 退職・転職 / 結婚 / 出産 の4シナリオを追加する。
   同じライフイベントでも、外国人には在留線の駅が上乗せされる——それが見えることが本題。"""
import json, os
os.chdir(r"F:\AI\tetsuzuki_metro\data")
N = json.load(open('procedures.json', encoding='utf-8'))
S = json.load(open('scenarios.json', encoding='utf-8'))
D = json.load(open('documents.json', encoding='utf-8'))
C = json.load(open('conditions.json', encoding='utf-8'))

KU = {"type": "kuyakusho", "authority": "市区町村",
      "label": {"ja": "お住まいの市区町村の窓口", "easy": "すんで いる まちの やくしょ", "en": "Your municipal office"}}
NYU = {"type": "nyukan", "authority": "出入国在留管理庁",
       "label": {"ja": "住居地を管轄する地方出入国在留管理官署", "easy": "にゅうかん", "en": "Your regional immigration office"}}
KAI = {"type": "kaisha", "authority": "勤務先",
       "label": {"ja": "勤務先の担当部署", "easy": "かいしゃの たんとう", "en": "Your employer"}}
HW = {"type": "hellowork", "authority": "ハローワーク",
      "label": {"ja": "住所を管轄するハローワーク", "easy": "ハローワーク", "en": "Your local Hello Work office"}}
KEN = {"type": "kenpo", "authority": "健康保険組合",
       "label": {"ja": "加入していた健康保険組合・協会けんぽ", "easy": "かいしゃの ほけん", "en": "Your health insurance society"}}
MIN = {"type": "minkan", "authority": "民間",
       "label": {"ja": "契約している事業者", "easy": "けいやくして いる かいしゃ", "en": "The companies you contract with"}}

def P(pid, line, seq, ja, easy, en, dl, win, req, dep, when, nja, neasy, nen, src, **kw):
    d = dict(id=pid, line=line, seq=seq, name={"ja": ja, "easy": easy, "en": en},
             deadline=dl, window=win, requires=req, produces=kw.get("produces", []),
             depends_on=dep, appears_when=when, note={"ja": nja, "easy": neasy, "en": nen}, source=src)
    for k in ("critical", "law", "consequence_if_missed", "requires_detail"):
        if k in kw: d[k] = kw[k]
    return d

def DL(v, u, frm, kind): return {"value": v, "unit": u, "from": frm, "kind": kind}
FOREIGN = "is_foreign_resident==true"

new = [
 # ══════════ 就職 ══════════
 P("shakai-hoken-kanyu", "hoken", 30,
   "健康保険・厚生年金への加入（勤務先が手続き）", "かいしゃの ほけんに はいる",
   "Enrol in employer health insurance and pension",
   DL(None, None, None, "none"), KAI, ["nenkin-techo"], [], ["employment_type==seishain"],
   "入社時に勤務先が手続きするため、本人の届出は原則不要。国民健康保険に入っていた場合は、自分で市区町村へ資格喪失の届出をする必要がある（自動では抜けない）。",
   "かいしゃが やって くれます。でも こくほは じぶんで やめる てつづきが ひつようです。",
   "Your employer files this. But if you were on National Health Insurance you must cancel it yourself.",
   "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/index.html"),

 P("kokuho-dattai-shushoku", "hoken", 31,
   "国民健康保険の資格喪失届（就職したとき）", "こくほを やめる てつづき",
   "Cancel National Health Insurance after starting work",
   DL(14, "day", "employment", "legal"), KU, ["kokuho-shikaku-kakuninsho", "honninkakunin"], [], ["insurance==kokuho"],
   "★勤務先の健康保険に入っても、国民健康保険は自動では脱退にならない。届出をしないと保険料が二重に請求され続ける。14日以内。",
   "★かいしゃの ほけんに はいっても、こくほは じどうで やめに なりません。じぶんで とどけて ください。",
   "Employer coverage does not automatically cancel your National Health Insurance — file within 14 days or you keep being billed for both.",
   "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/index.html", critical=True),

 P("zairyu-shikaku-henko-shuro", "zairyu", 10,
   "在留資格変更許可申請（留学 → 就労）", "ざいりゅうしかくを「りゅうがく」から「しごと」に かえる",
   "Change your status of residence from student to work",
   DL(None, None, "before_start", "before_action"), NYU,
   ["zairyu-card", "passport", "naitei-shorui"], [], [FOREIGN, "changing_from_student==true"],
   "★許可が下りる前に新しい在留資格での活動を開始することはできない。内定が出たら早めに申請する。卒業前から申請可能（例年12月頃から受付）。",
   "★きょかが でる まえに はたらいては いけません。ないていが でたら はやめに もうしこんで ください。",
   "You cannot begin the new activity until permission is granted. Apply as soon as you have a job offer.",
   "https://tlg-visa.law/case/1636/", critical=True),

 P("shozoku-kikan-todokede-nyusha", "zairyu", 11,
   "所属機関等に関する届出（就職・入社）", "あたらしい かいしゃに はいった ことを にゅうかんに とどける",
   "Report your new employer to immigration",
   DL(14, "day", "employment", "legal"), NYU, ["zairyu-card"], [], [FOREIGN, "employment_type!=none"],
   "★就労系の在留資格を持つ外国人は、勤務先が変わった日から14日以内に入管へ届け出る義務がある。日本人には存在しない手続。",
   "★14にち いないに にゅうかんへ とどけます。にほんじんには ない てつづきです。",
   "Foreign residents with work-related status must report a change of employer within 14 days. Japanese nationals have no equivalent.",
   "https://nagoyavisa.com/2000/", critical=True),

 # ══════════ 退職・転職 ══════════
 P("kenko-hoken-sentaku", "hoken", 32,
   "健康保険の選択（国保に入る／任意継続する）", "けんこうほけんを えらぶ",
   "Choose between National Health Insurance and continuing your employer plan",
   DL(20, "day", "retirement", "irreversible"), KEN, ["honninkakunin"], [], [],
   "★★退職後の分かれ道。任意継続を選ぶなら資格喪失日から【20日以内】、国民健康保険なら【14日以内】。★20日を過ぎると任意継続という選択肢そのものが消え、国保しか選べなくなる。どちらが安いかは扶養家族の人数と前年収入で変わるため、期限内に両方の保険料を試算して比べること。",
   "★たいしょくの あとの わかれみち。にんいけいぞくは 20にち、こくほは 14にち いないです。20にちを すぎると にんいけいぞくは えらべなく なります。",
   "The fork after leaving a job: 20 days to elect voluntary continuation, 14 days for National Health Insurance. After 20 days the continuation option disappears permanently.",
   "https://biz.moneyforward.com/payroll/basic/3051/", critical=True,
   consequence_if_missed={"ja": "任意継続を選べなくなり、国民健康保険のみとなる。扶養家族が多い場合は保険料が大幅に上がることがある。",
                          "en": "You lose the option entirely and must use National Health Insurance, which can cost far more if you have dependents."}),

 P("nenkin-shubetsu-henko", "nenkin", 30,
   "国民年金 第1号被保険者への種別変更", "こくみんねんきんに きりかえる",
   "Switch to Category-1 National Pension",
   DL(14, "day", "retirement", "legal"), KU, ["nenkin-techo", "honninkakunin"], [], [],
   "退職して厚生年金を抜けたら14日以内。保険料を払えない場合は免除・納付猶予の制度があるので、未納のまま放置せず窓口で相談する（未納は将来の年金額に直接響く）。",
   "たいしょくしたら 14にち いないに きりかえます。はらえない ときは そうだんして ください。",
   "Within 14 days of leaving employer pension coverage. If you cannot pay, apply for exemption rather than simply not paying.",
   "https://biz.moneyforward.com/payroll/basic/3051/"),

 P("shitsugyo-kyufu", "minkan", 30,
   "雇用保険（失業給付）の受給手続き", "しつぎょう ほけんの てつづき",
   "Apply for unemployment benefits",
   DL(1, "year", "retirement", "claim"), HW, ["rishoku-hyo", "honninkakunin", "seikyuunin-kouza"], [], [],
   "受給期間は原則、離職の翌日から1年間。自己都合退職には給付制限期間がある。離職票は退職後に勤務先から郵送されるため、届かない場合は催促する。",
   "はなれた つぎの ひから 1ねんかんです。りしょくひょうが とどかない ときは かいしゃに れんらくして ください。",
   "Generally claimable for one year from the day after leaving. You need the separation certificate from your former employer.",
   "https://www.hellowork.mhlw.go.jp/"),

 P("juminzei-nofu-henko", "zeimu", 30,
   "住民税の納付方法の変更", "じゅうみんぜいの はらいかたを かえる",
   "Change how you pay resident tax",
   DL(None, None, None, "practical"), KAI, [], [], [],
   "給与天引き（特別徴収）から自分で納める（普通徴収）に切り替わる。住民税は前年の所得に対してかかるため、収入が無くなった年でも前年分の請求が来る。★退職直後に想定外の請求が届く原因になりやすい。",
   "きゅうりょうから ひかれて いた ぶんを、じぶんで はらう ことに なります。きょねんの ぶんが きます。",
   "Payment switches from payroll deduction to direct payment. Resident tax is based on last year's income, so a bill arrives even with no current income.",
   "https://www.tax.metro.tokyo.lg.jp/"),

 P("shozoku-kikan-todokede-ridatsu", "zairyu", 12,
   "所属機関等に関する届出（退職・離脱）", "かいしゃを やめた ことを にゅうかんに とどける",
   "Report leaving your employer to immigration",
   DL(14, "day", "retirement", "legal"), NYU, ["zairyu-card"], [], [FOREIGN],
   "★退職した日から14日以内。就職時と退職時でそれぞれ届出が必要（1回ではない）。留学生が卒業・退学した場合も同様に「離脱」の届出が要る。",
   "★やめた ひから 14にち いないです。はいる ときと やめる とき、2かい とどけます。",
   "Within 14 days of leaving. Separate filings are required when joining and when leaving — not one combined report.",
   "https://nagoyavisa.com/2000/", critical=True),

 P("shuro-shikaku-shomeisho", "zairyu", 13,
   "就労資格証明書の交付申請（転職時）", "あたらしい しごとが ビザに あう ことを たしかめる かみ",
   "Apply for a certificate of authorised employment",
   DL(None, None, None, "practical"), NYU, ["zairyu-card", "passport", "naitei-shorui"], [], [FOREIGN, "job_change==true"],
   "義務ではないが強く推奨される。転職先の業務が現在の在留資格に合致するかを入管が事前に確認してくれるため、次回の在留期間更新で不許可になる危険を避けられる。これを取らずに転職し、更新時に初めて不適合が判明する事例が多い。",
   "ぎむでは ありませんが、とった ほうが あんぜんです。つぎの こうしんで だめに ならない ように たしかめます。",
   "Not mandatory but strongly advised: immigration confirms in advance that your new job matches your status, avoiding a refusal at renewal time.",
   "https://office-tree.jp/blog/immigration/engineer-visa-job-change/"),

 # ══════════ 結婚 ══════════
 P("konin-todoke", "yakusho", 30,
   "婚姻届の提出", "こんいんとどけを だす", "Submit the marriage registration",
   DL(None, None, None, "none"), KU, ["honninkakunin", "koseki-tohon"], [], [],
   "期限はない。届出をした日が婚姻成立日になる。本籍地以外に出す場合は戸籍謄本が必要（マイナンバー連携で不要な自治体も増えている）。",
   "きげんは ありません。だした ひが けっこんの ひに なります。",
   "No deadline; the date you file is the date of marriage.",
   "https://www.moj.go.jp/MINJI/minji15.html"),

 P("kaisei-tetsuzuki", "minkan", 31,
   "改姓に伴う名義変更（免許・銀行・カード・保険）", "なまえが かわった ことの てつづき",
   "Update your name on licence, bank, cards and insurance",
   DL(None, None, None, "practical"), MIN, ["honninkakunin"], ["konin-todoke"], ["name_changed==true"],
   "★1か所ずつ別々に手続きする必要があり、まとめて変える仕組みは無い。運転免許証を先に変えておくと、それが本人確認書類になって以降が楽になる（順序が効く）。",
   "★1つずつ かえます。まとめて かえる ほうほうは ありません。めんきょしょうを さきに かえると あとが らくです。",
   "Each institution must be updated separately; there is no single switch. Update your driving licence first — it then serves as ID for the rest.",
   "https://myna.go.jp/"),

 P("hifuyousha-todoke", "hoken", 33,
   "健康保険の被扶養者届／国民年金 第3号被保険者の届出", "ふようの てつづき",
   "Register a dependent spouse for insurance and pension",
   DL(5, "day", "marriage", "legal"), KAI, ["honninkakunin", "nenkin-techo"], ["konin-todoke"], ["spouse_becomes_dependent==true"],
   "配偶者を扶養に入れる場合、勤務先経由で届け出る。第3号被保険者になると国民年金保険料の自己負担が無くなる。届出が遅れるとその間が未納扱いになることがある。",
   "はいぐうしゃを ふように いれる ときの てつづきです。おくれると みのうに なる ことが あります。",
   "Filed through your employer. Category-3 status removes the spouse's pension premium; late filing can create unpaid periods.",
   "https://www.nenkin.go.jp/"),

 P("zairyu-kisai-henko-kekkon", "zairyu", 14,
   "在留カードの記載事項変更届出（改姓）", "なまえが かわった ことを にゅうかんに とどける",
   "Report your name change to immigration",
   DL(14, "day", "change", "legal"), NYU, ["zairyu-card", "passport"], ["konin-todoke"], [FOREIGN, "name_changed==true"],
   "★氏名の変更は入管、住所の変更は市区町村。同じ在留カードでも窓口が分かれる。14日以内。",
   "★なまえは にゅうかん、じゅうしょは くやくしょです。",
   "Name changes go to immigration; address changes go to the municipality. Same card, different counters.",
   "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html"),

 # ══════════ 出産 ══════════
 P("shussho-todoke", "yakusho", 31,
   "出生届の提出", "しゅっしょうとどけを だす", "Register the birth",
   DL(14, "day", "birth", "legal"), KU, ["shussho-shomeisho", "honninkakunin"], [], [],
   "★生まれた日を1日目として14日以内。★出生届を出しただけでは、健康保険も児童手当も自動では手続きされない。別々に申請が必要で、ここが最も多い誤解。多くの自治体では「出産ワンストップ窓口」として同じ日にまとめられる。",
   "★うまれた ひから 14にち いないです。★これを だす だけでは、ほけんも てあても もらえません。べつべつに もうしこみます。",
   "Within 14 days counting the birth day. Registering the birth does NOT automatically enrol the child in insurance or start child allowance — those are separate applications. This is the most common misunderstanding.",
   "https://stepnavi.com/column/childbirth-guide/", critical=True),

 P("jidou-teate-shussho", "yakusho", 32,
   "児童手当の認定請求（出生）", "じどう てあての もうしこみ", "Claim child allowance after birth",
   DL(15, "day", "birth", "irreversible"), KU, ["honninkakunin", "seikyuunin-kouza"], ["shussho-todoke"], [],
   "★出生の翌日から15日以内。★1日でも遅れると、その月分の手当は遡って受け取れない。金額が大きく、取り返しがつかないため最優先。",
   "★15にち いないです。★1にち でも おくれると その つきの ぶんは もらえません。",
   "Within 15 days of birth. Even one day late and that month's payment is lost permanently.",
   "https://oyakoto.online/postnatal-government-procedures/", critical=True,
   consequence_if_missed={"ja": "遅れた月分の児童手当は遡って支給されない。", "en": "Payments for the missed month are never recovered."}),

 P("kodomo-hoken-kanyu", "hoken", 34,
   "子どもの健康保険への加入", "こどもを ほけんに いれる", "Add the child to health insurance",
   DL(None, None, "birth", "practical"), KAI, ["shussho-shomeisho"], ["shussho-todoke"], [],
   "国保なら市区町村、勤務先の健康保険なら勤務先経由。乳幼児医療証の申請に保険証が必要になるため、先にこちらを済ませる（順序がある）。",
   "こくほは やくしょ、かいしゃの ほけんは かいしゃです。いりょうしょうの まえに します。",
   "Municipality for National Health Insurance, employer otherwise. Do this before the infant medical certificate, which requires the insurance card.",
   "https://stepnavi.com/column/childbirth-guide/"),

 P("nyuyoji-iryosho", "hoken", 35,
   "乳幼児医療費助成の申請", "こどもの いりょうしょうの もうしこみ", "Apply for infant medical subsidy",
   DL(None, None, "birth", "claim"), KU, ["kodomo-hokensho", "honninkakunin"], ["kodomo-hoken-kanyu"], [],
   "子どもの保険証ができてから申請する。申請しないと医療費の助成が受けられない。自治体により所得制限の有無が異なる。",
   "こどもの ほけんしょうが できてから もうしこみます。もうしこまないと たすけて もらえません。",
   "Apply once the child's insurance card is issued; without it you pay full medical costs.",
   "https://oyakoto.online/postnatal-government-procedures/"),

 P("shussan-ichijikin", "hoken", 36,
   "出産育児一時金の申請", "しゅっさんの おかねを もらう", "Claim the childbirth lump-sum benefit",
   DL(2, "year", "birth", "claim"), KEN, ["shussho-shomeisho", "seikyuunin-kouza"], [], [],
   "子ども1人につき原則50万円。多くは医療機関へ直接支払われる制度（直接支払制度）を使うため窓口負担が減るが、差額があれば自分で請求する。請求権の時効は2年。",
   "こども 1人に 50まんえん くらい もらえます。びょういんに ちょくせつ はらわれる ことが おおいです。",
   "Generally ¥500,000 per child. Usually paid directly to the hospital, but any balance must be claimed by you. Two-year limit.",
   "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussan/index.html"),

 P("kodomo-zairyu-shutoku", "zairyu", 15,
   "子の在留資格取得許可申請（日本で生まれた外国籍の子）", "にほんで うまれた こどもの ビザを とる",
   "Apply for the child's status of residence",
   DL(30, "day", "birth", "irreversible"), NYU, ["shussho-todoke-kisaijiko", "passport", "zairyu-card"], ["shussho-todoke"], [FOREIGN],
   "★★出生日から30日以内。60日以内に出国する場合は不要だが、それを超えて日本に住むなら必須。★30日を過ぎると不法残留に該当する。さらに、親が永住者であっても30日を過ぎた子には原則「永住者」が付与されず「永住者の配偶者等」しか認められない——期限を過ぎたことが子の在留資格を一段下げ、その後の人生に影響し続ける。",
   "★★うまれてから 30にち いないです。すぎると ふほう ざいりゅうに なります。しかも こどもの ビザが ひくく なって しまいます。",
   "Within 30 days of birth. Miss it and the child is unlawfully resident — and even children of permanent residents are then generally denied permanent-resident status, receiving only a dependent status instead. A missed deadline permanently downgrades the child's status.",
   "https://www.moj.go.jp/isa/applications/procedures/syutoku_00001.html", critical=True, law="入管法第22条の2",
   consequence_if_missed={"ja": "不法残留となる。加えて、30日を過ぎると「永住者」の在留資格は原則許可されず、「永住者の配偶者等」しか付与されない。",
                          "en": "The child becomes unlawfully resident, and permanent-resident status is generally no longer available — only a lesser dependent status."}),
]

N['procedures'].extend(new)
json.dump(N, open('procedures.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

D['documents'] += [
 {"id": "rishoku-hyo", "name": {"ja": "離職票", "easy": "しごとを やめた しょうめい", "en": "Separation certificate"},
  "fee": 0, "issued_by": "勤務先（退職後に郵送）", "lead_time_days": 14,
  "warning": {"ja": "退職後10日前後で勤務先から届く。届かないと失業給付の手続きが始められないため、2週間経っても来なければ催促する。",
              "easy": "2しゅうかん たっても こない ときは かいしゃに れんらくして ください。",
              "en": "Usually arrives about 10 days after leaving; chase it if it does not, as unemployment benefits cannot start without it."}},
 {"id": "naitei-shorui", "name": {"ja": "採用内定通知書・雇用契約書等", "easy": "しごとの けいやくしょ", "en": "Job offer or employment contract"},
  "fee": None, "issued_by": "採用先の企業", "lead_time_days": 0},
 {"id": "shussho-shomeisho", "name": {"ja": "出生証明書（出生届と一体）", "easy": "うまれた ことの しょうめい", "en": "Birth certificate"},
  "fee": None, "issued_by": "分娩に立ち会った医師・助産師", "lead_time_days": 0},
 {"id": "kodomo-hokensho", "name": {"ja": "子どもの健康保険証", "easy": "こどもの ほけんしょう", "en": "Child's health insurance card"},
  "fee": 0, "issued_by": "保険者", "lead_time_days": 14},
 {"id": "shussho-todoke-kisaijiko", "name": {"ja": "出生届受理証明書・出生届記載事項証明書", "easy": "しゅっしょうとどけの しょうめい", "en": "Certificate of accepted birth registration"},
  "fee": 350, "issued_by": "出生届を出した市区町村", "lead_time_days": 1},
]
json.dump(D, open('documents.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

# ── 新しい条件 ──
def Q(qid, scen, tier, ja, easy, en, typ, affects, options=None, note=None, critical=False):
    d = {"id": qid, "scenarios": scen, "tier": tier,
         "question": {"ja": ja, "easy": easy, "en": en}, "type": typ, "affects": affects}
    if options: d["options"] = options
    if note: d["note"] = note
    if critical: d["critical"] = True
    return d
def O(v, ja, easy, en): return {"value": v, "label": {"ja": ja, "easy": easy, "en": en}}

C['conditions'] += [
 Q("employment_type", ["employment"], "core", "働き方は次のどれですか？", "どんな はたらきかたですか？",
   "What kind of employment?", "choice", ["shakai-hoken-kanyu", "shozoku-kikan-todokede-nyusha"],
   options=[O("seishain", "正社員・契約社員（社会保険あり）", "しゃかいほけんが ある", "Regular or contract (with social insurance)"),
            O("part", "パート・アルバイト（社会保険なし）", "しゃかいほけんが ない", "Part-time (no social insurance)"),
            O("none", "働いていない", "はたらいて いない", "Not employed")]),
 Q("changing_from_student", ["employment"], "core", "在留資格「留学」から就労資格に変更しますか？",
   "「りゅうがく」から「しごと」の ビザに かえますか？", "Are you changing from a student to a work status?",
   "boolean", ["zairyu-shikaku-henko-shuro"],
   note={"ja": "★許可が下りる前に働き始めることはできない。内定が出たら早めに申請する。",
         "easy": "★きょかの まえに はたらいては いけません。", "en": "You cannot start work before permission is granted."}, critical=True),
 Q("job_change", ["retirement"], "core", "転職しますか（次の勤務先が決まっていますか）？",
   "つぎの しごとが きまって いますか？", "Are you moving to another employer?",
   "boolean", ["shuro-shikaku-shomeisho"],
   note={"ja": "外国人の場合、転職先の業務が在留資格に合うかを就労資格証明書で事前確認しておくと、次の更新での不許可を避けられる。",
         "easy": "がいこくじんは、つぎの しごとが ビザに あうか たしかめて おくと あんしんです。",
         "en": "For foreign residents, pre-confirming that the new job fits your status avoids a refusal at renewal."}),
 Q("name_changed", ["marriage"], "core", "結婚により姓（名字）が変わりますか？", "けっこんで なまえが かわりますか？",
   "Will your surname change?", "boolean", ["kaisei-tetsuzuki", "zairyu-kisai-henko-kekkon"],
   note={"ja": "変わる場合、免許・銀行・カード・保険を1か所ずつ変更する必要がある。外国人はさらに入管への届出（14日以内）が加わる。",
         "easy": "かわる ばあい、1つずつ てつづきが ひつようです。", "en": "Each institution must be updated individually; foreign residents also report to immigration within 14 days."}),
 Q("spouse_becomes_dependent", ["marriage"], "detailed", "配偶者を扶養に入れますか？", "はいぐうしゃを ふように いれますか？",
   "Will your spouse become your dependent?", "boolean", ["hifuyousha-todoke"]),
]
# 既存条件の再利用
for q in C['conditions']:
    if q['id'] == 'is_foreign_resident':
        q['scenarios'] = ["death", "arrival", "moving", "employment", "retirement", "marriage", "childbirth"]
        q['affects'] += ["zairyu-shikaku-henko-shuro", "shozoku-kikan-todokede-nyusha",
                         "shozoku-kikan-todokede-ridatsu", "shuro-shikaku-shomeisho",
                         "zairyu-kisai-henko-kekkon", "kodomo-zairyu-shutoku"]
    if q['id'] == 'insurance':
        q['scenarios'] = sorted(set(q['scenarios']) | {"employment"})
json.dump(C, open('conditions.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

# ── シナリオ ──
def SC(sid, ja, easy, en, ids, theme, sig):
    return {"id": sid, "name": {"ja": ja, "easy": easy, "en": en},
            "official_theme": theme, "status": "complete", "procedures": ids, "signature_output": sig}

S['scenarios'] += [
 SC("employment", "就職するとき", "しごとを はじめる とき", "When you start a job",
    ["shakai-hoken-kanyu", "kokuho-dattai-shushoku", "zairyu-shikaku-henko-shuro", "shozoku-kikan-todokede-nyusha"],
    "c06 生活",
    {"id": "kokuho-double-bill",
     "title": {"ja": "会社の保険に入っても、国民健康保険は自動では抜けない", "en": "Employer coverage does not cancel your National Health Insurance"},
     "punchline": {"ja": "届出をしないと保険料が二重に請求され続ける。14日以内。",
                   "en": "Without filing, you keep being billed for both. Within 14 days."}}),
 SC("retirement", "退職・転職するとき", "しごとを やめる・かえる とき", "When you leave or change jobs",
    ["kenko-hoken-sentaku", "nenkin-shubetsu-henko", "shitsugyo-kyufu", "juminzei-nofu-henko",
     "shozoku-kikan-todokede-ridatsu", "shuro-shikaku-shomeisho"],
    "c06 生活",
    {"id": "ninikeizoku-20days",
     "title": {"ja": "任意継続を選べるのは20日間だけ", "en": "You have only 20 days to elect voluntary continuation"},
     "punchline": {"ja": "国保は14日、任意継続は20日。20日を過ぎると任意継続という選択肢そのものが消える。",
                   "en": "14 days for National Health Insurance, 20 for continuation — after which the option is gone for good."}}),
 SC("marriage", "結婚するとき", "けっこん する とき", "When you get married",
    ["konin-todoke", "kaisei-tetsuzuki", "hifuyousha-todoke", "zairyu-kisai-henko-kekkon"],
    "c06 生活 /「出産、育児、結婚、介護・死別などのライフイベントに伴う手続・支援の案内」",
    {"id": "kaisei-chain",
     "title": {"ja": "改姓は1か所ずつ手作業。まとめて変える仕組みは無い", "en": "A name change must be done institution by institution"},
     "punchline": {"ja": "順序が効く。免許証を先に変えると、それが本人確認書類になって以降が楽になる。",
                   "en": "Order matters: change your licence first and it becomes the ID for everything else."}}),
 SC("childbirth", "子どもが生まれたとき", "こどもが うまれた とき", "When a child is born",
    ["shussho-todoke", "jidou-teate-shussho", "kodomo-hoken-kanyu", "nyuyoji-iryosho",
     "shussan-ichijikin", "kodomo-zairyu-shutoku"],
    "c06 生活 /「出産、育児、結婚、介護・死別などのライフイベントに伴う手続・支援の案内」",
    {"id": "birth-not-automatic",
     "title": {"ja": "出生届を出しただけでは、保険も手当も始まらない", "en": "Registering the birth starts nothing else"},
     "punchline": {"ja": "健康保険・児童手当・医療証はすべて別々の申請。児童手当は15日を1日でも過ぎるとその月分が消える。外国籍の子は30日以内に在留資格の取得が必要で、過ぎると在留資格が一段下がる。",
                   "en": "Insurance, allowance and medical subsidy are separate applications. One day late on the 15-day allowance and that month is lost; a foreign child missing the 30-day residence application is permanently downgraded."},
     "based_on_real_case": False}),
]
json.dump(S, open('scenarios.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

print("追加: %d手続 / %d書類 / %d条件 / 4シナリオ" % (len(new), 5, 5))
print("合計: %d手続 / %dシナリオ" % (len(N['procedures']), len(S['scenarios'])))
