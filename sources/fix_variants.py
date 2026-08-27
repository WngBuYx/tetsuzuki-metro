# -*- coding: utf-8 -*-
"""複数シナリオで再利用している条件に、シナリオ別の問い方を持たせる。
   死別シナリオの文面（「亡くなられた方の…」）を、そのまま引っ越しや来日で見せない。"""
import json, os
os.chdir(r"F:\AI\tetsuzuki_metro\data")
C = json.load(open('conditions.json', encoding='utf-8'))

V = {
 "insurance": {
   "moving": {"ja": "あなたの健康保険は次のどれですか？",
              "easy": "あなたの けんこうほけんは どれですか？",
              "en": "Which health insurance do you have?"}},
 "nenkin_type": {
   "moving": {"ja": "あなたの年金は次のどれですか？",
              "easy": "あなたの ねんきんは どれですか？",
              "en": "Which pension are you enrolled in?"}},
 "kaigo_nintei": {
   "moving": {"ja": "要介護認定を受けていますか？",
              "easy": "かいごの にんていを うけて いますか？",
              "en": "Are you certified for long-term care?"}},
 "has_mynumber_card": {
   "arrival": {"ja": "マイナンバーカードをお持ちですか？",
               "easy": "マイナンバーカードを もって いますか？",
               "en": "Do you have a My Number card?"},
   "moving":  {"ja": "マイナンバーカードをお持ちですか？",
               "easy": "マイナンバーカードを もって いますか？",
               "en": "Do you have a My Number card?"}},
 "age": {
   "arrival": {"ja": "あなたの年齢は？", "easy": "なんさいですか？", "en": "How old are you?"}},
}

# 選択肢の文面もシナリオで変わるもの（死別は過去形・第三者、他は現在形・本人）
OPT = {
 "insurance": {
   "moving": {"shaho": {"ja": "勤務先の健康保険（社会保険）",
                        "easy": "かいしゃの ほけん", "en": "Employer's health insurance"}}},
 "nenkin_type": {
   "moving": {"none": {"ja": "加入していない／わからない",
                       "easy": "はいって いない", "en": "Not enrolled / not sure"}}},
}

n_q = n_o = 0
for q in C['conditions']:
    qid = q['id']
    if qid in V:
        q['question_variants'] = V[qid]
        n_q += 1
    if qid in OPT:
        for scen, over in OPT[qid].items():
            for o in q.get('options', []):
                if o['value'] in over:
                    o.setdefault('label_variants', {})[scen] = over[o['value']]
                    n_o += 1

C['note'] += " question_variants がある条件は、シナリオごとに問い方を差し替える（死別の『亡くなられた方の…』を引っ越しや来日でそのまま出さない）。"
json.dump(C, open('conditions.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

# 検証: 複数シナリオに属し、かつ死別由来の語が残っている条件を洗い出す
BAD = ("亡くなられた", "故人", "しんだ 人", "the deceased")
print("question_variants を付与: %d条件 / option の言い換え: %d件" % (n_q, n_o))
print()
print("=== 複数シナリオで使う条件の点検 ===")
for q in C['conditions']:
    if len(q['scenarios']) > 1 and q['tier'] != 'profile':
        base = q['question']['ja'] + q['question']['en']
        has_var = 'question_variants' in q
        leftover = [s for s in q['scenarios'] if s != 'death'
                    and not (has_var and s in q['question_variants'])
                    and any(b in base for b in BAD)]
        mark = "NG" if leftover else "ok"
        print("  [%s] %-22s %s%s" % (mark, q['id'], '/'.join(q['scenarios']),
                                     ("  ← %s 用の文面が無い" % ','.join(leftover)) if leftover else ""))
