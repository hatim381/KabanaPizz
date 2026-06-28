import ssl
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SIDES = ROOT / "public" / "sides"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36"
ctx = ssl._create_unverified_context()

items = {
    "cheesy-bread.jpg": "https://scontent-mrs2-3.xx.fbcdn.net/v/t1.6435-9/55448585_2066306900072989_9133630331587395584_n.jpg?stp=dst-jpg_tt6&cstp=mx952x1192&ctp=p600x600&_nc_cat=102&ccb=1-7&_nc_sid=b96d88&_nc_ohc=GKUVSVHudfIQ7kNvwGbZ_zI&_nc_oc=AdrKxh1Fcu0FU2g2x-F9JHZnElPl-ckShFySVVka8EtX-JuZlF9U75_Z1TYxcCI_ZVI&_nc_zt=23&_nc_ht=scontent-mrs2-3.xx&_nc_gid=zjf4HPVuDNsN6FMKjypdMg&_nc_ss=7b289&oh=00_Af9Ho2wWhBcrqxW3qHp5Ug-yT2StfQH0N2NpZUcC7Y_Ceg&oe=6A68CBEC",
    "chicken-wings.png": "https://www.dominos.fr/ManagedAssets/FR/product/ECBFWSF/FR_ECBFWSF_fr_hero_13706.png?v-1614395041",
}

for filename, url in items.items():
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30, context=ctx) as res:
        data = res.read()
    out = SIDES / filename
    out.write_bytes(data)
    print(f"OK {out} ({len(data)} bytes)")