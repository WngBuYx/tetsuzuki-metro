import sys, json, urllib.parse, urllib.request
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
API="https://catalog.data.metro.tokyo.lg.jp/api/3/action/package_search"
def search(q, rows=5):
    url=API+"?"+urllib.parse.urlencode({"q":q,"rows":rows})
    req=urllib.request.Request(url, headers={"User-Agent":UA})
    with urllib.request.urlopen(req, timeout=60) as r: d=json.load(r)
    res=d.get("result",{})
    print("=== %s === total:%s" % (q, res.get("count")))
    for it in res.get("results",[]):
        org=(it.get("organization") or {}).get("title","")
        fmts=sorted({x.get("format","") for x in it.get("resources",[])})
        print("  -", it.get("title"), "|", org, "|", fmts, "|", it.get("name"))
    print()
for q in sys.argv[1:]: search(q)
