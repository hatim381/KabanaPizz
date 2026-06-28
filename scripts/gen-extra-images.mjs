import fs from "node:fs";
import path from "node:path";

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("GEMINI_API_KEY manquant dans l'environnement.");
  process.exit(1);
}

const { sides, drinks, formule } = await import("../src/data/menu.js");

const prompts = {
  "cheesy-bread": "Professional overhead food photography of real cheesy garlic bread sticks, melted mozzarella stretching, golden baked crust, served on a wooden board, natural daylight, photorealistic, no text, no logo.",
  "chicken-wings": "Professional overhead food photography of 6 real crispy fried chicken wings on a plate, golden brown glaze, steam rising, rustic wooden table, natural daylight, photorealistic, no text, no logo.",
  chickeninos: "Professional overhead food photography of crispy breaded chicken strips (chickeninos) on a plate with dip sauce, golden crust, rustic wooden table, natural daylight, photorealistic, no text, no logo.",
  potatoes: "Professional overhead food photography of a real portion of crispy seasoned potato wedges in a paper cone, golden fried, rustic wooden table, natural daylight, photorealistic, no text, no logo.",
  brownie: "Professional close-up food photography of a real rich chocolate brownie square, fudgy texture, dusted with cocoa, on a small plate, warm natural light, photorealistic, no text, no logo.",
  kabanito: "Professional overhead food photography of a real kebab sandwich combo meal: a wrapped sandwich, a portion of golden french fries, and a soda cup, arranged on a wooden tray, natural daylight, appetizing, photorealistic, no text, no logo.",

  // Boissons : photo produit nette, identité visuelle réaliste (couleurs/forme),
  // sans reproduire de logo exact pour rester sobre.
  "coca-cola-33": "Sharp high-resolution product photo of a cold red soda can (Coca-Cola style), realistic condensation droplets, upright on a rustic wooden table, soft studio lighting, shallow depth of field, vivid red and white branding colors, photorealistic.",
  "coca-cola-125": "Sharp high-resolution product photo of a 1.25L black plastic soda bottle (Coca-Cola style) filled with dark cola, red cap and red label accents, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "coca-cherry-33": "Sharp high-resolution product photo of a cold dark red soda can (Coca-Cola Cherry style) with cherry imagery accents, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "coca-zero-33": "Sharp high-resolution product photo of a cold black soda can (Coca-Cola Zero style) with red accent, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "coca-zero-125": "Sharp high-resolution product photo of a 1.25L black plastic soda bottle (Coca-Cola Zero style) filled with dark cola, black cap, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "fanta-125": "Sharp high-resolution product photo of a 1.25L orange plastic soda bottle (Fanta orange style) filled with bright orange soda, orange cap, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "oasis-tropical-33": "Sharp high-resolution product photo of a cold yellow and orange tropical fruit juice can, condensation droplets, upright on a rustic wooden table, soft studio lighting, vivid tropical colors, photorealistic.",
  "oasis-tropical-2l": "Sharp high-resolution product photo of a 2L clear plastic bottle filled with vivid orange tropical fruit juice, yellow cap, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "oasis-cassis-33": "Sharp high-resolution product photo of a cold deep purple blackcurrant fruit juice can, condensation droplets, upright on a rustic wooden table, soft studio lighting, vivid purple colors, photorealistic.",
  "orangina-33": "Sharp high-resolution product photo of a cold round-bottomed orange soda bottle (Orangina style) with pulp visible, orange cap, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "perrier-33": "Sharp high-resolution product photo of a cold green sparkling mineral water bottle (Perrier style), green glass texture, condensation droplets, visible bubbles, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "canada-dry-33": "Sharp high-resolution product photo of a cold pale green ginger ale soda can, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "tropico-33": "Sharp high-resolution product photo of a cold tropical fruit punch soda bottle, vivid yellow-orange colors, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "ice-tea-33": "Sharp high-resolution product photo of a cold pale yellow iced tea bottle with lemon accents, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "lipton-ice-tea-125": "Sharp high-resolution product photo of a 1.25L yellow plastic iced tea bottle (Lipton style) with lemon slice imagery, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "redbull-25": "Sharp high-resolution product photo of a cold slim blue and silver energy drink can, condensation droplets, upright on a rustic wooden table, soft studio lighting, vivid colors, photorealistic.",
  "eau-50": "Sharp high-resolution product photo of a cold clear 50cl plastic mineral water bottle, blue cap, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
  "eau-plate-150": "Sharp high-resolution product photo of a cold clear 1.5L plastic still mineral water bottle, blue cap, condensation droplets, upright on a rustic wooden table, soft studio lighting, photorealistic.",
};

const targets = [
  ...sides.map((s) => ({ id: s.id, dir: "sides" })),
  ...drinks.map((d) => ({ id: d.id, dir: "drinks" })),
  { id: formule.id, dir: "formule" },
];

const onlyId = process.argv[2];

async function generateOne({ id, dir }) {
  const prompt = prompts[id];
  if (!prompt) throw new Error(`Pas de prompt défini pour ${id}`);

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
    throw new Error(`HTTP ${res.status} pour ${id} : ${text.slice(0, 500)}`);
  }

  const data = await res.json();
  const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(`Pas d'image renvoyée pour ${id} : ${JSON.stringify(data).slice(0, 500)}`);

  const outPath = path.join("public", dir, `${id}.jpg`);
  fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
  console.log(`OK  ${id} -> ${outPath}`);
}

const list = onlyId ? targets.filter((t) => t.id === onlyId) : targets;
if (list.length === 0) {
  console.error(`Élément inconnu: ${onlyId}`);
  process.exit(1);
}

for (const target of list) {
  try {
    await generateOne(target);
  } catch (err) {
    console.error(`ECHEC ${target.id}:`, err.message);
  }
  await new Promise((r) => setTimeout(r, 1500));
}
