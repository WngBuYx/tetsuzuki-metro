# -*- coding: utf-8 -*-
import json, os
os.chdir(r"F:\AI\tetsuzuki_metro\data")

N = json.load(open('procedures.json', encoding='utf-8'))
S = json.load(open('scenarios.json', encoding='utf-8'))
D = json.load(open('documents.json', encoding='utf-8'))

KU = {"type": "kuyakusho", "authority": "市区町村",
      "label": {"ja": "お住まいの市区町村の窓口", "easy": "すんで いる まちの やくしょ", "en": "Your municipal office"}}
def W(t, auth, ja, easy, en):
    return {"type": t, "authority": auth, "label": {"ja": ja, "easy": easy, "en": en}}

def P(pid, line, seq, ja, easy, en, dl, win, req, dep, when, nja, neasy, nen, src, **kw):
    d = dict(id=pid, line=line, seq=seq,
             name={"ja": ja, "easy": easy, "en": en},
             deadline=dl, window=win, requires=req,
             produces=kw.get("produces", []), depends_on=dep, appears_when=when,
             note={"ja": nja, "easy": neasy, "en": nen}, source=src)
    for k in ("critical", "law", "consequence_if_missed", "requires_detail"):
        if k in kw:
            d[k] = kw[k]
    return d

MYNA = "https://myna.go.jp/html/moving_oss_procedure_list.html"

new = [
 P("tenshutsu-todoke", "yakusho", 20,
   "転出届の提出（旧住所の区市町村）", "でていく ことを まえの やくしょに とどける",
   "Notify your old municipality that you are moving out",
   {"value": 14, "unit": "day", "from": "moving", "kind": "legal",
    "note": "引っ越しの14日前から、当日以降14日以内"}, KU,
   ["honninkakunin"], [], ["moving_across_municipality==true"],
   "引っ越しの14日前から手続きできる。転出証明書が交付され、これが転入届に必要になる（マイナンバーカードで転入する場合は不要なことが多い）。★この時点で印鑑登録は自動的に失効する。",
   "ひっこしの 14にち まえから できます。いんかんとうろくは この ときに きえます。",
   "Can be filed from 14 days before the move. Issues the certificate needed at your new address. Your seal registration lapses automatically here.",
   MYNA, produces=["tenshutsu-shomeisho"]),

 P("tennyu-todoke", "yakusho", 21,
   "転入届の提出（新住所の区市町村）", "ひっこした ことを あたらしい やくしょに とどける",
   "Register your new address",
   {"value": 14, "unit": "day", "from": "moving", "kind": "irreversible"}, KU,
   ["tenshutsu-shomeisho", "honninkakunin", "mynumber-card"], ["tenshutsu-todoke"], [],
   "★引っ越した日から14日以内。★この期限を過ぎるとマイナンバーカードが失効する。転入届と同時にカードの継続利用手続きを行うこと。国保・年金・児童手当・介護など、ほぼ全ての後続手続がこの駅を通らないと始まらない、路線図の中心駅。",
   "★14にち いないに して ください。すぎると マイナンバーカードが つかえなく なります。ほかの てつづきも ぜんぶ この あとです。",
   "Within 14 days of moving. Miss it and your My Number card is invalidated. Almost every other procedure depends on this one: the hub station of the map.",
   MYNA, critical=True,
   consequence_if_missed={"ja": "マイナンバーカードが失効し、再交付に手数料と1か月以上を要する。",
                          "en": "The My Number card is invalidated; reissue costs a fee and over a month."}),

 P("mynumber-keizoku-riyou", "yakusho", 22,
   "マイナンバーカードの継続利用手続き", "マイナンバーカードを つづけて つかう てつづき",
   "Keep your My Number card usable after the move",
   {"value": None, "unit": None, "from": "with_tennyu", "kind": "irreversible"}, KU,
   ["mynumber-card"], ["tennyu-todoke"], ["has_mynumber_card==true"],
   "★転入届と同時に行う。忘れるとカードが使えなくなる。★外国人の場合はこれとは別に、在留期間の満了によっても失効する（→ 在留線）。引っ越しと在留期間更新が重なる時期は、失効経路が二つあることになる。",
   "てんにゅうとどけと いっしょに して ください。わすれると カードが つかえなく なります。",
   "Do it together with the move-in notification. Foreign residents face a second, separate expiry route via their residence period.",
   MYNA, critical=True),

 P("kokuho-tetsuzuki-moving", "hoken", 20,
   "国民健康保険の資格喪失・加入（引っ越し）", "こくみん けんこうほけんの てつづき",
   "Transfer your National Health Insurance",
   {"value": 14, "unit": "day", "from": "moving", "kind": "legal"}, KU,
   ["kokuho-shikaku-kakuninsho", "honninkakunin"], ["tennyu-todoke"], ["insurance==kokuho"],
   "旧区で転出日から14日以内に喪失、新区で転入日から14日以内に加入。★空白期間があると、その間の医療費は全額自己負担（10割）になる。同一区内の引っ越しなら住所変更のみ（14日以内）。",
   "まえの くで やめて、あたらしい くで はいります。どちらも 14にち いないです。あいだが あくと びょういんだいが ぜんぶ じぶんもちに なります。",
   "Cancel within 14 days at the old ward and enroll within 14 days at the new one. Any gap means paying 100% of medical costs.",
   "https://www.city.osaka.lg.jp/fukushi/page/0000369734.html", critical=True),

 P("nenkin-juusho-henko", "nenkin", 20,
   "国民年金の住所変更", "こくみん ねんきんの じゅうしょへんこう",
   "Update your National Pension address",
   {"value": 14, "unit": "day", "from": "moving", "kind": "legal"}, KU,
   ["nenkin-techo"], ["tennyu-todoke"], ["nenkin_type==kokumin"],
   "第1号被保険者は市区町村の窓口で行う。会社員（第2号）は勤務先が手続きするため本人の届出は不要。マイナンバーと基礎年金番号が結び付いていれば省略できる場合がある。",
   "じぶんで はらって いる 人は やくしょで します。かいしゃいんは かいしゃが します。",
   "Category-1 insured file at the municipal office; employees are handled by their employer.",
   MYNA),

 P("jidou-teate-moving", "yakusho", 23,
   "児童手当の認定請求（転入先）", "じどう てあての もうしこみ",
   "Claim child allowance at your new municipality",
   {"value": 15, "unit": "day", "from": "moving", "kind": "irreversible"}, KU,
   ["honninkakunin", "seikyuunin-kouza"], ["tennyu-todoke"], ["has_children==true"],
   "★15日特例。転出予定日の翌日から15日以内に新住所地へ認定請求を出せば、申請が翌月にずれ込んでも前月分から支給される。★過ぎるとその分は遡って受け取れない。旧住所地では「受給事由消滅届」を出す。",
   "★15にち いないに もうしこむと、まえの つきから もらえます。おくれると その ぶんは もらえません。",
   "The 15-day rule: file within 15 days of your planned move-out date and payment continues from the prior month. Miss it and that money is gone.",
   "https://www.the0123.com/column/housemoving-childcareallowance.html", critical=True),

 P("kaigo-juusho-henko", "hoken", 21,
   "介護保険の住所変更・受給資格証明の提出", "かいごほけんの じゅうしょへんこう",
   "Transfer long-term care insurance",
   {"value": 14, "unit": "day", "from": "moving", "kind": "legal"}, KU,
   ["kaigo-hihokenshasho"], ["tennyu-todoke"], ["kaigo_nintei==true"],
   "要介護認定を受けている場合、旧区で「受給資格証明書」をもらい、転入日から14日以内に新区へ提出すると認定が引き継がれる。★14日を過ぎると認定を取り直しになる場合がある。",
   "かいごの にんていを うけて いる 人は、まえの くで しょうめいしょを もらって、14にち いないに あたらしい くへ だします。",
   "Carry your certification over by submitting the eligibility certificate within 14 days, otherwise you may be re-assessed from scratch.",
   MYNA, critical=True),

 P("inkan-touroku-moving", "yakusho", 24,
   "印鑑登録（新住所での再登録）", "いんかんとうろくを もういちど する",
   "Re-register your seal",
   {"value": None, "unit": None, "from": None, "kind": "none"}, KU,
   ["honninkakunin"], ["tennyu-todoke"], ["needs_inkan_shomei==true"],
   "転出により旧区の印鑑登録は自動的に失効している。新区での登録は自動では行われないため、印鑑証明が必要になる場面（不動産・自動車・相続など）の前に自分で登録し直す必要がある。",
   "まえの くの いんかんとうろくは きえて います。あたらしい くで もういちど とうろくします。",
   "Your old registration lapsed on moving out and the new one is not created for you.",
   MYNA),

 P("menkyo-juusho-henko", "minkan", 20,
   "運転免許証の住所変更", "うんてん めんきょしょうの じゅうしょへんこう",
   "Update your driver licence address",
   {"value": None, "unit": None, "from": "moving", "kind": "practical"},
   W("keisatsu", "警察", "警察署・運転免許センター", "けいさつしょ", "Police station or licence centre"),
   ["honninkakunin"], ["tennyu-todoke"], ["has_drivers_license==true"],
   "明確な日数の定めはないが「速やかに」とされる。更新通知が旧住所に届いて免許の更新自体を逃す原因になるため早めに。本人確認書類として使う機会も多い。",
   "はやめに して ください。おくれると こうしんの おしらせが とどきません。",
   "No fixed deadline but do it promptly: renewal notices are sent to your registered address.",
   MYNA),

 P("inu-touroku-henko", "minkan", 21,
   "犬の登録事項変更届", "いぬの とうろくの へんこう",
   "Update your dog registration",
   {"value": 30, "unit": "day", "from": "moving", "kind": "legal"}, KU,
   ["inu-kansatsu"], ["tennyu-todoke"], ["has_dog==true"],
   "狂犬病予防法に基づく届出。30日以内。旧区の鑑札を新区の鑑札と交換する。",
   "いぬを かって いる 人は 30にち いないに とどけます。",
   "Required within 30 days under the Rabies Prevention Act.",
   MYNA, law="狂犬病予防法"),

 P("yubin-tensou", "minkan", 22,
   "郵便物の転送届", "ゆうびんぶつの てんそう", "Set up mail forwarding",
   {"value": 1, "unit": "year", "from": "application", "kind": "practical"},
   W("minkan", "日本郵便", "郵便局・e転居", "ゆうびんきょく", "Post office or online"),
   [], [], [],
   "1年間、旧住所宛の郵便物が新住所に転送される。★行政からの通知（保険証・納税通知・免許更新の案内など）を取りこぼさないための保険になるので、引っ越し直後に最優先で出しておくとよい。",
   "1ねんかん、まえの じゅうしょの ゆうびんが とどきます。さいしょに やって おくと あんしんです。",
   "Forwards mail for one year: a safety net for official notices you would otherwise miss.",
   MYNA),

 P("lifeline-moving", "minkan", 23,
   "電気・ガス・水道の移転手続き", "でんき・ガス・すいどうの てつづき",
   "Transfer electricity, gas and water",
   {"value": None, "unit": None, "from": None, "kind": "practical"},
   W("minkan", "民間", "契約している事業者", "けいやくして いる かいしゃ", "Your utility providers"),
   [], [], [],
   "ガスの開栓は立ち会いが必要なため、引っ越し日が決まったらすぐ予約する（繁忙期は数日待ちになる）。",
   "ガスは たちあいが ひつようです。はやめに よやくして ください。",
   "Gas reconnection needs someone present, so book as soon as your date is fixed.",
   MYNA),

 P("ginko-juusho-henko", "minkan", 24,
   "銀行・カード・携帯などの住所変更", "ぎんこう・カード・けいたいの じゅうしょへんこう",
   "Update your address with banks, cards and phone",
   {"value": None, "unit": None, "from": None, "kind": "practical"},
   W("minkan", "民間", "契約している事業者", "けいやくして いる かいしゃ", "The companies you contract with"),
   ["honninkakunin"], ["tennyu-todoke"], [],
   "新しい住所が記載された本人確認書類を求められることが多いため、転入届のあとに行う。",
   "あたらしい じゅうしょの みぶんしょうめいが いる ことが おおいので、てんにゅうとどけの あとに します。",
   "Usually requires ID showing the new address, so do it after registering the move.",
   MYNA),
]

N['procedures'].extend(new)
json.dump(N, open('procedures.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

D['documents'] += [
 {"id": "tenshutsu-shomeisho",
  "name": {"ja": "転出証明書", "easy": "でていく ことの しょうめいしょ", "en": "Certificate of moving out"},
  "fee": 0, "issued_by": "旧住所地の市区町村（転出届の際に交付）", "lead_time_days": 0},
 {"id": "inu-kansatsu",
  "name": {"ja": "犬の鑑札", "easy": "いぬの かんさつ", "en": "Dog registration tag"},
  "fee": 0, "issued_by": "旧住所地の市区町村", "lead_time_days": 0},
]
json.dump(D, open('documents.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

# 在留カードの住居地変更は「来日」と「引っ越し」で共有される = 乗換駅
mv = [p['id'] for p in new] + ["juukyochi-henko"]
for s in S['scenarios']:
    if s['id'] == 'moving':
        s['status'] = 'complete'
        s['procedures'] = mv
        s.pop('planned_procedures', None)
json.dump(S, open('scenarios.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

print("引っ越しシナリオ: %d駅（新規%d + 共有1）" % (len(mv), len(new)))
print("全国共通グラフ: %d手続" % len(N['procedures']))
