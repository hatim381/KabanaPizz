// Récupère de vraies photos (Wikimedia Commons, libres de droits) pour les boissons.
import fs from "node:fs";
import path from "node:path";

const UA = "KabanaPizzSite/1.0 (contact: site kabana-pizz; usage non-commercial illustratif)";

// Pour chaque boisson : requête de recherche Commons + mots à exclure (logos, svg, pubs…)
const queries = {
  "coca-cola-33": { q: "Coca-Cola can red drink", exclude: ["logo", "svg", "truck", "polar", "headquarters"] },
  "coca-cola-125": { q: "Coca-Cola bottle plastic 1.5", exclude: ["logo", "svg", "glass", "old", "crushed"] },
  "coca-cherry-33": { q: "Coca-Cola Cherry can bottle", exclude: ["logo", "svg"] },
  "coca-zero-33": { q: "Coca-Cola Zero can lata", exclude: ["logo", "svg"] },
  "coca-zero-125": { q: "Coca-Cola Zero bottle", exclude: ["logo", "svg"] },
  "fanta-125": { q: "Fanta bottle orange plastic", exclude: ["logo", "svg", "glass", "old", "strawberry"] },
  "oasis-tropical-33": { q: "Fruit_oasis.JPG", exclude: ["logo", "svg"] },
  "oasis-tropical-2l": { q: "Oasis Summer Fruits", exclude: ["logo", "svg"] },
  "oasis-cassis-33": { q: "blackcurrant juice bottle", exclude: ["logo", "svg"] },
  "orangina-33": { q: "Orangina bottle", exclude: ["logo", "svg", "caravane", "advert"] },
  "perrier-33": { q: "Perrier green glass bottle", exclude: ["logo", "svg", "harmsworth", "laurent", "loop"] },
  "canada-dry-33": { q: "Canada Dry ginger ale bottles", exclude: ["logo", "svg", "1948", "thirsty", "steady", "poster", "advert"] },
  "tropico-33": { q: "fruit punch drink bottle orange", exclude: ["logo", "svg", "alcohol", "cocktail", "rum"] },
  "ice-tea-33": { q: "iced tea bottle lemon", exclude: ["logo", "svg"] },
  "lipton-ice-tea-125": { q: "Lipton Ice Tea Green", exclude: ["logo", "svg"] },
  "redbull-25": { q: "Red Bull energy drink can", exclude: ["logo", "svg", "car", "headquarters", "RB4", "RB11"] },
  "eau-50": { q: "plastic mineral water bottle", exclude: ["logo", "svg", "waste", "microplastic"] },
  "eau-plate-150": { q: "plastic mineral water bottle 1.5L", exclude: ["logo", "svg", "waste", "microplastic"] },
};

async function searchCommons(q, exclude) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
    q
  )}&srnamespace=6&format=json&srlimit=15`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`réponse non-JSON (probablement throttle) : ${text.slice(0, 120)}`);
  }
  const results = data?.query?.search ?? [];
  for (const r of results) {
    const title = r.title; // "File:Xxx.jpg"
    const lower = title.toLowerCase();
    if (!/\.(jpe?g|png)$/i.test(title)) continue;
    if (exclude.some((bad) => lower.includes(bad.toLowerCase()))) continue;
    return title.replace(/^File:/, "");
  }
  return null;
}

async function download(filename, outPath) {
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=900`;
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} en téléchargeant ${filename}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
}

const onlyId = process.argv[2];
const ids = onlyId ? [onlyId] : Object.keys(queries);

for (const id of ids) {
  const { q, exclude } = queries[id];
  try {
    const filename = await searchCommons(q, exclude);
    if (!filename) {
      console.error(`ECHEC ${id}: aucun résultat Commons pour "${q}"`);
      continue;
    }
    const ext = path.extname(filename).toLowerCase() === ".png" ? ".png" : ".jpg";
    const outPath = path.join("public", "drinks", `${id}${ext}`);
    await download(filename, outPath);
    console.log(`OK  ${id} <- ${filename} -> ${outPath}`);
  } catch (err) {
    console.error(`ECHEC ${id}:`, err.message);
  }
  await new Promise((r) => setTimeout(r, 3000));
}
