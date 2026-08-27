import json, urllib.request, csv, io, sys
csv.field_size_limit(10**7)
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
def get(u,t=120):
    return urllib.request.urlopen(urllib.request.Request(u,headers={"User-Agent":UA}),timeout=t).read()
def dec(raw):
    if raw[:2] in (b"\xff\xfe", b"\xfe\xff"): 
        return raw.decode("utf-16"), "utf-16"
    for e in ("utf-8-sig","utf-8","cp932"):
        try: return raw.decode(e), e
        except Exception: pass
    return raw.decode("cp932","replace"), "cp932?"
STD=["名称","所在地_連結表記","緯度","経度","電話番号","利用可能曜日","開始時間","終了時間","車椅子可","筆談対応"]
KEY=["区役所","出張所","地域センター","区民事務所","支所"]
for name,pid in json.loads(sys.argv[1]):
    try:
        d=json.loads(get("https://catalog.data.metro.tokyo.lg.jp/api/3/action/package_show?id="+pid))["result"]
        res=[r for r in d["resources"] if (r.get("format") or "").upper()=="CSV"]
        if not res: print("%-6s CSVなし"%name); continue
        raw=get(res[0]["url"]); t,enc=dec(raw)
        rows=[r for r in csv.reader(io.StringIO(t)) if r]
        h=[x.strip().lstrip("\ufeff") for x in rows[0]]; body=rows[1:]
        def fill(k):
            if k not in h: return None
            i=h.index(k); return sum(1 for r in body if len(r)>i and r[i].strip())
        std=sum(1 for k in STD if k in h)
        ni=h.index("名称") if "名称" in h else (2 if len(h)>2 else 0)
        offices=sum(1 for r in body if len(r)>ni and any(k in r[ni] for k in KEY))
        print("%-6s n=%-4d cols=%-3d %-9s 標準%2d/10 | 緯度%s 開始時間%s 車椅子%s | 役所系%d件"%(
            name,len(body),len(h),enc,std,
            fill("緯度"), fill("開始時間") if "開始時間" in h else "列なし",
            fill("車椅子可") if "車椅子可" in h else "列なし", offices))
    except Exception as e:
        print("%-6s ERROR %s"%(name,str(e)[:70]))
