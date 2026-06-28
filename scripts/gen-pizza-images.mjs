import fs from "node:fs";
import path from "node:path";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY manquant dans l'environnement.");
  process.exit(1);
}

const { pizzas } = await import("../src/data/menu.js");

const onlyId = process.argv[2]; // optionnel : générer une seule pizza pour tester

function buildPrompt(p) {
  const ingredients = p.ingredients.join(", ");
  return `Professional overhead food photography of a real artisanal wood-fired pizza called "${p.name}", ${p.base.toLowerCase()}, topped with ${ingredients}. Shot on a rustic wooden table, natural daylight, shallow depth of field, melted cheese with slight char on crust, steam rising, appetizing realistic texture, shot with a 50mm lens, photorealistic, no text, no logo, no illustration, not cartoonish, looks like a real photo taken in a restaurant.`;
}

async function generateOne(pizza) {
  const prompt = buildPrompt(pizza);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: { sampleCount: 1, aspectRatio: "4:3" },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} pour ${pizza.id} : ${text.slice(0, 500)}`);
  }

  const data = await res.json();
  const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(`Pas d'image renvoyée pour ${pizza.id} : ${JSON.stringify(data).slice(0, 500)}`);

  const outPath = path.join("public", "pizzas", `${pizza.id}.jpg`);
  fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
  console.log(`OK  ${pizza.id} -> ${outPath}`);
}

const list = onlyId ? pizzas.filter((p) => p.id === onlyId) : pizzas;
if (list.length === 0) {
  console.error(`Pizza inconnue: ${onlyId}`);
  process.exit(1);
}

for (const pizza of list) {
  try {
    await generateOne(pizza);
  } catch (err) {
    console.error(`ECHEC ${pizza.id}:`, err.message);
  }
  // petite pause pour éviter le rate limit
  await new Promise((r) => setTimeout(r, 1500));
}
