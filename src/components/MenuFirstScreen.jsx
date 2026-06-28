import { menuShortcuts, pizzaSizes, pizzas } from "../data/menu";
import BestSellers from "./BestSellers";

export default function MenuFirstScreen() {
  const price = pizzaSizes[0].price.toFixed(2).replace(".", ",") + " €";

  return (
    <section className="menu-first" id="carte" aria-labelledby="menu-first-title">
      <div className="wrap">
        <nav className="menu-first__shortcuts" aria-label="Catégories de la carte">
          {menuShortcuts.map((item) => (
            <a key={item.href} href={item.href} className="menu-first__shortcut">
              {item.label}
            </a>
          ))}
        </nav>

        <header className="menu-first__head">
          <div>
            <span className="eyebrow">Menu en ligne</span>
            <h2 id="menu-first-title" className="menu-first__title">
              Choisissez votre pizza
            </h2>
            <p className="menu-first__lead">
              Photos, ingrédients et prix affichés. Ajoutez au panier, validez sur WhatsApp.
              Dès <strong>{price}</strong> · prêt en 15-20 min · paiement au retrait.
            </p>
          </div>
          <a href="#menu-pizzas" className="btn btn-ghost menu-first__all">
            Voir toutes les pizzas ({pizzas.length})
          </a>
        </header>

        <p className="menu-first__tunnel">
          <span>1. Ajouter au panier</span>
          <span aria-hidden="true">→</span>
          <span>2. Ouvrir le panier 🛒</span>
          <span aria-hidden="true">→</span>
          <span>3. Commander sur WhatsApp</span>
        </p>

        <BestSellers variant="firstscreen" />
      </div>
    </section>
  );
}