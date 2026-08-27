import json, urllib.parse, urllib.request, time
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
API="https://catalog.data.metro.tokyo.lg.jp/api/3/action/package_search"
# 東京23区の全国地方公共団体コード(先頭6桁) -> orgスラッグ t1310xx
wards = {
 "千代田区":"t131016","中央区":"t131024","港区":"t131032","新宿区":"t131041","文京区":"t131059",
 "台東区":"t131067","墨田区":"t131075","江東区":"t131083","品川区":"t131091","目黒区":"t131105",
 "大田区":"t131113","世田谷区":"t131121","渋谷区":"t131130","中野区":"t131148","杉並区":"t131156",
 "豊島区":"t131164","北区":"t131172","荒川区":"t131181","板橋区":"t131199","練馬区":"t131202",
 "足立区":"t131211","葛飾区":"t131229","江戸川区":"t131237",
}
def q(query, fq=None, rows=5):
    p={"q":query,"rows":rows}
    if fq: p["fq"]=fq
    url=API+"?"+urllib.parse.urlencode(p)
    req=urllib.request.Request(url, headers={"User-Agent":UA})
    with urllib.request.urlopen(req, timeout=60) as r: d=json.load(r)
    return d.get("result",{})

print("%-8s %6s %6s  %s" % ("区","全DS","公共施設","ヒットしたデータセット名"))
print("-"*95)
rows=[]
for w,slug in wards.items():
    tot=q("*:*", fq="organization:%s"%slug, rows=0).get("count",0)
    r=q("公共施設一覧 施設一覧 公共施設情報", fq="organization:%s"%slug, rows=8)
    hits=[it for it in r.get("results",[]) if any(k in it["title"] for k in ("公共施設","施設一覧"))]
    names=[]
    for it in hits[:3]:
        fmts=sorted({x.get("format","") for x in it.get("resources",[])})
        names.append("%s%s"%(it["title"], fmts))
    rows.append((w,tot,len(hits),names))
    print("%-8s %6d %6d  %s" % (w, tot, len(hits), " / ".join(names)[:70] if names else "—"))
    time.sleep(0.15)
