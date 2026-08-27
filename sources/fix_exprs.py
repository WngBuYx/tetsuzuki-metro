# -*- coding: utf-8 -*-
import json, os, re
os.chdir(r"F:\AI\tetsuzuki_metro\data")
N = json.load(open('procedures.json', encoding='utf-8'))
C = {q['id']: q for q in json.load(open('conditions.json', encoding='utf-8'))['conditions']}

FIX = {
 # 意図は「国民年金で、区役所が窓口になるもの（障害基礎・遺族基礎・寡婦年金）」。
 # そんな選択肢は無いので、国民年金そのものに直す。
 "nenkin_type==kokumin_kuyakusho": "nenkin_type==kokumin",
 # choice(across/within) に true を当てていた
 "moving_across_municipality==true": "moving_across_municipality==across",
 # choice(yes/no/unknown) に true を当てていた。
 # 設計方針は「わからない場合こそ相続放棄を強調する」なので !=no が正しい。
 "possible_debt==true": "possible_debt!=no",
}
n = 0
for p in N['procedures']:
    for key in ('appears_when', 'skippable_when'):
        if key in p:
            for i, e in enumerate(p[key]):
                if e in FIX:
                    print("  %-28s %s  →  %s" % (p['id'], e, FIX[e]))
                    p[key][i] = FIX[e]; n += 1
json.dump(N, open('procedures.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print("修正 %d件" % n)

# ---- 厳格版バリデータ（true/false を choice に当てる誤りも検出する） ----
print()
print("=== 再検証（厳格版） ===")
bad = 0
for p in N['procedures']:
    for e in p.get('appears_when', []) + p.get('skippable_when', []):
        for part in re.split(r'\s*\|\|\s*|\s*&&\s*', e):
            m = re.match(r'([A-Za-z_][A-Za-z0-9_]*)\s*(==|!=|>=|<=|>|<)\s*(.+)$', part.strip())
            if not m:
                print("  [解析不能] %s (%s)" % (part, p['id'])); bad += 1; continue
            v, op, val = m.group(1), m.group(2), m.group(3).strip()
            q = C.get(v)
            if not q:
                print("  [未定義] %s (%s)" % (v, p['id'])); bad += 1; continue
            t = q['type']
            if t == 'choice':
                vals = {o['value'] for o in q.get('options', [])}
                if val not in vals:
                    print("  [選択肢に無い] %s%s%s → %s (%s)" % (v, op, val, sorted(vals), p['id'])); bad += 1
                if op in ('>=', '<=', '>', '<'):
                    print("  [choiceに大小比較] %s (%s)" % (part, p['id'])); bad += 1
            elif t == 'boolean':
                if val not in ('true', 'false'):
                    print("  [booleanに非bool] %s (%s)" % (part, p['id'])); bad += 1
            elif t == 'number':
                if not re.fullmatch(r'-?\d+(\.\d+)?', val):
                    print("  [numberに非数値] %s (%s)" % (part, p['id'])); bad += 1
print("エラー: %d件" % bad if bad else "エラーなし")
