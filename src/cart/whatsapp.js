import { restaurant } from "../data/menu";

function euro(n) {
  return n.toFixed(2).replace(".", ",") + " €";
}

// Construit le lien wa.me avec le récapitulatif de commande pré-rempli
export function buildWhatsappOrder({ items, total, mode, name, note }) {
  const lines = [];
  lines.push("Bonjour Kabana Pizz ! Je souhaite commander :");
  lines.push("");

  items.forEach((i) => {
    lines.push(`• ${i.qty}× ${i.name} — ${euro(i.price * i.qty)}`);
  });

  lines.push("");
  lines.push(`Total : ${euro(total)}`);
  lines.push(`Mode : ${mode === "emporter" ? "À emporter" : "Sur place"}`);
  if (name && name.trim()) lines.push(`Nom : ${name.trim()}`);
  if (note && note.trim()) lines.push(`Note : ${note.trim()}`);
  lines.push("");
  lines.push("Merci !");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${restaurant.whatsapp}?text=${text}`;
}
