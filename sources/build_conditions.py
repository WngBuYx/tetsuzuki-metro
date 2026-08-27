# -*- coding: utf-8 -*-
"""conditions.json を「フラットな条件リスト + シナリオ/ティア タグ」へ再構成し、
   引っ越し・来日シナリオで悬空していた13条件を追加する。"""
import json, os, re, collections
os.chdir(r"F:\AI\tetsuzuki_metro\data")

old = json.load(open('conditions.json', encoding='utf-8'))
N = json.load(open('procedures.json', encoding='utf-8'))
S = json.load(open('scenarios.json', encoding='utf-8'))

# --- 既存18件を引き継ぐ（死別シナリオ由来） ---
out = []
for q in old['core']:
    fu = q.pop('follow_up', None)
    q['scenarios'] = ['death']
    q['tier'] = 'core'
    out.append(q)
    if fu:
        fu['scenarios'] = ['death']
        fu['tier'] = 'follow_up'
        fu['parent'] = q['id']
        fu.setdefault('affects', q.get('affects', []))
        out.append(fu)
for q in old['detailed']:
    q['scenarios'] = ['death']
    q['tier'] = 'detailed'
    out.append(q)

def Q(qid, scen, tier, ja, easy, en, typ, affects, options=None, note=None, critical=False):
    d = {"id": qid, "scenarios": scen, "tier": tier,
         "question": {"ja": ja, "easy": easy, "en": en},
         "type": typ, "affects": affects}
    if options: d["options"] = options
    if note:    d["note"] = note
    if critical: d["critical"] = True
    return d

def O(v, ja, easy, en): return {"value": v, "label": {"ja": ja, "easy": easy, "en": en}}

new = [
 # ---------- プロフィール（全シナリオ共通・最初に1回だけ聞く） ----------
 Q("is_foreign_resident", ["death","arrival","moving"], "profile",
   "あなたは外国籍の方ですか？", "あなたは がいこくせきですか？", "Are you a foreign national?",
   "boolean", ["juukyochi-todokede","juukyochi-henko","zairyu-kisai-henko","shikakugai-katsudo",
               "zairyu-kikan-koushin","mynumber-yuukoukikan-henko","mynumber-tokurei-encho","dattai-ichijikin"],
   note={"ja":"「はい」の場合、在留線（住居地届出・在留期間更新・マイナンバーカードの有効期間変更など）が追加される。日本人には存在しない手続が8つ増える。",
         "easy":"「はい」の ばあい、ざいりゅうカードの てつづきが ふえます。",
         "en":"If yes, the Residency Line appears — eight procedures that do not exist for Japanese nationals."}),

 # ---------- 来日1年目 ----------
 Q("stay_over_3months", ["arrival"], "core",
   "在留資格の期間は3か月を超えますか？", "にほんに 3かげつ より ながく いますか？",
   "Is your status of residence longer than three months?",
   "boolean", ["kokuho-kanyu-gaikokujin"],
   note={"ja":"3か月を超える在留資格があれば、国民健康保険の加入は「義務」であり任意ではない。入国当初が3か月以下でも、その後3か月を超えると認められる場合は加入対象になる。",
         "easy":"3かげつを こえる ばあい、こくみん けんこうほけんに かならず はいります。えらべません。",
         "en":"Over three months makes National Health Insurance mandatory, not optional."}, critical=True),

 Q("has_employer_insurance", ["arrival","moving"], "core",
   "勤務先の健康保険に入っていますか？", "かいしゃの けんこうほけんに はいって いますか？",
   "Are you covered by an employer health insurance plan?",
   "boolean", ["kokuho-kanyu-gaikokujin"],
   note={"ja":"勤務先の健康保険に入っている場合、国民健康保険には加入しない。",
         "easy":"かいしゃの ほけんが ある ばあい、こくほには はいりません。",
         "en":"If you have employer coverage you do not enroll in National Health Insurance."}),

 Q("has_employer_pension", ["arrival"], "detailed",
   "勤務先の厚生年金に入っていますか？", "かいしゃの ねんきんに はいって いますか？",
   "Are you enrolled in an employees' pension through work?",
   "boolean", ["kokumin-nenkin-kanyu"],
   note={"ja":"厚生年金に加入していれば国民年金の手続きは勤務先が行うため、本人の届出は不要。",
         "easy":"かいしゃの ねんきんが ある ばあい、じぶんでは しません。",
         "en":"If you are in the employees' pension your employer handles it."}),

 Q("will_work_part_time", ["arrival"], "core",
   "アルバイトをする予定はありますか？", "アルバイトを する よてい が ありますか？",
   "Do you plan to work part-time?",
   "boolean", ["shikakugai-katsudo"],
   note={"ja":"★「はい」なら、働き始める『前』に入管で資格外活動許可を取る必要がある。無許可で働くと不法就労となり、1年以下の懲役または200万円以下の罰金、在留資格取消・退去強制の対象になりうる。許可を得ても週28時間まで。",
         "easy":"★はたらく まえに にゅうかんで きょかを とって ください。きょかが ないと ばっせられます。1しゅうかん 28じかんまでです。",
         "en":"You must obtain permission BEFORE starting work. Working without it is illegal employment with serious consequences."}, critical=True),

 Q("renewal_pending_at_card_expiry", ["arrival"], "detailed",
   "在留期間の更新を申請中で、マイナンバーカードの有効期限が近づいていますか？",
   "ざいりゅうきかんを しんせいちゅうで、カードの きげんが ちかいですか？",
   "Is your residence renewal still under review while your My Number card is about to expire?",
   "boolean", ["mynumber-tokurei-encho"],
   note={"ja":"★「はい」なら、在留カード裏面の『在留資格更新許可申請中』のハンコを持って区役所へ行けば、カードの有効期限を特例で2か月延長できる（再延長は不可）。この延長を知らずに期限を過ぎるとカードは失効し、再交付に1か月半と1,000円かかる。",
         "easy":"★ざいりゅうカードの うらの ハンコを もって くやくしょへ いくと、2かげつ のばせます。1かいだけです。",
         "en":"If yes, take the stamped residence card to the ward office for a one-time two-month extension."}, critical=True),

 Q("name_or_nationality_changed", ["arrival"], "detailed",
   "氏名・国籍などが変わりましたか？", "なまえや こくせきが かわりましたか？",
   "Have your name or nationality changed?",
   "boolean", ["zairyu-kisai-henko"],
   note={"ja":"★住所の変更は市区町村、氏名・国籍等の変更は入管。同じ在留カードでも窓口が分かれる。",
         "easy":"★じゅうしょは くやくしょ、なまえは にゅうかんです。",
         "en":"Address changes go to the municipality; name and nationality changes go to immigration."}),

 Q("leaving_japan", ["arrival"], "detailed",
   "日本を離れる（帰国する）予定はありますか？", "にほんを でる よてい が ありますか？",
   "Are you planning to leave Japan?",
   "boolean", ["dattai-ichijikin"],
   note={"ja":"年金の加入期間が6か月以上あれば、出国後2年以内に脱退一時金を請求できる。2026年4月1日から支給上限が60か月から96か月に引き上げられた。",
         "easy":"6かげつ いじょう ねんきんを はらった 人は、でてから 2ねん いないに もうしこめます。",
         "en":"With six or more months of contributions you can claim a lump-sum withdrawal within two years of departure."}),

 # ---------- 引っ越し ----------
 Q("moving_across_municipality", ["moving"], "core",
   "引っ越し先は今と別の区市町村ですか？", "ひっこしさきは いまと ちがう まちですか？",
   "Are you moving to a different municipality?",
   "choice", ["tenshutsu-todoke"],
   options=[O("across","別の区市町村へ引っ越す","ちがう まちへ ひっこす","To a different municipality"),
            O("within","同じ区市町村の中で引っ越す","おなじ まちの なかで ひっこす","Within the same municipality")],
   note={"ja":"同一区市町村内なら「転居届」のみで、転出届・転入届は不要。国保・介護なども住所変更だけで済む。",
         "easy":"おなじ まちの なかなら、てつづきは すくないです。",
         "en":"Within the same municipality you file only a change-of-address notice, which is far simpler."}),

 Q("has_children", ["moving"], "core",
   "児童手当を受け取っているお子さんはいますか？", "じどう てあてを もらって いる こどもが いますか？",
   "Do you receive child allowance for any children?",
   "boolean", ["jidou-teate-moving"],
   note={"ja":"★15日特例。転出予定日の翌日から15日以内に新住所地へ認定請求を出せば、申請が翌月にずれ込んでも前月分から支給される。過ぎた分は遡って受け取れない。",
         "easy":"★15にち いないに もうしこむと、まえの つきから もらえます。おくれると もらえません。",
         "en":"File within 15 days and payment continues from the prior month; miss it and that money is gone."}, critical=True),

 Q("has_drivers_license", ["moving"], "detailed",
   "運転免許証をお持ちですか？", "うんてん めんきょしょうを もって いますか？",
   "Do you have a driver licence?",
   "boolean", ["menkyo-juusho-henko"],
   note={"ja":"日数の定めはないが、更新通知が旧住所に届いて免許更新自体を逃す原因になる。",
         "easy":"はやめに して ください。おしらせが とどかなく なります。",
         "en":"No fixed deadline, but renewal notices go to your registered address."}),

 Q("has_dog", ["moving"], "detailed",
   "犬を飼っていますか？", "いぬを かって いますか？", "Do you have a dog?",
   "boolean", ["inu-touroku-henko"],
   note={"ja":"狂犬病予防法に基づき30日以内の届出が必要。旧区の鑑札を新区の鑑札と交換する。",
         "easy":"30にち いないに とどけます。",
         "en":"Required within 30 days under the Rabies Prevention Act."}),

 Q("needs_inkan_shomei", ["moving"], "detailed",
   "近いうちに印鑑証明が必要になる予定はありますか？（不動産・自動車・相続など）",
   "いんかん しょうめいが ひつように なりますか？",
   "Will you need a seal certificate soon (property, car, inheritance)?",
   "boolean", ["inkan-touroku-moving"],
   note={"ja":"転出により旧区の印鑑登録は自動的に失効している。新区での再登録は自動では行われないため、必要になる前に自分で登録し直す。",
         "easy":"まえの まちの とうろくは きえて います。あたらしい まちで もういちど します。",
         "en":"Your old registration lapsed automatically; the new one is not created for you."}),
]

out.extend(new)

# 既存条件を他シナリオでも再利用する（重複して聞かない）
reuse = {
 "insurance":       ["moving"],
 "nenkin_type":     ["moving"],
 "kaigo_nintei":    ["moving"],
 "has_mynumber_card": ["arrival", "moving"],
 "age":             ["arrival"],
}
for q in out:
    if q["id"] in reuse:
        q["scenarios"] = sorted(set(q["scenarios"]) | set(reuse[q["id"]]))

C = {
 "$schema_version": "0.2",
 "note": "条件はフラットなリストで持ち、scenarios と tier で絞り込む。tier: profile=最初に1回だけ / core=そのシナリオで必ず聞く / detailed=「もっと詳しく」で開く / follow_up=親の回答次第。全て未回答のまま先へ進めること（遺族や来日直後の人に尋問をしない）。",
 "tiers": {
   "profile":  {"ja":"最初に1回だけ","en":"Asked once at the start"},
   "core":     {"ja":"そのシナリオの必須質問","en":"Core question for the scenario"},
   "detailed": {"ja":"「もっと詳しく」で開く","en":"Behind a 'more detail' toggle"},
   "follow_up":{"ja":"親の回答次第で出る","en":"Shown depending on the parent answer"}
 },
 "conditions": out,
}
json.dump(C, open('conditions.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

# ---- 検証 ----
defined = {q['id'] for q in out}
used = collections.defaultdict(list)
for p in N['procedures']:
    for expr in p.get('appears_when', []) + p.get('skippable_when', []):
        lhs = re.split(r'==|!=|>=|<=|>|<', expr)[0]
        for v in re.findall(r'[A-Za-z_][A-Za-z0-9_]*', lhs):
            if v not in ('true', 'false'):
                used[v].append(p['id'])
missing = sorted(v for v in used if v not in defined)
unused  = sorted(v for v in defined if v not in used)
print("条件 %d件（既存18 + 新規%d）" % (len(out), len(new)))
print("未定義（悬空）:", missing or "なし")
print("未使用:", unused or "なし")
print()
for s in S['scenarios']:
    sid = s['id']
    tc = collections.Counter(q['tier'] for q in out if sid in q['scenarios'])
    print("  %-8s %-22s 質問 profile%d / core%d / detailed%d / follow_up%d"
          % (sid, s['name']['ja'], tc['profile'], tc['core'], tc['detailed'], tc['follow_up']))
