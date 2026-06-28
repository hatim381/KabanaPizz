import { restaurant, pizzaSizes } from "../data/menu";
import { getOpenStatus } from "../utils/hours";
import { useCart } from "../cart/CartContext";

export default function Hero() {
  const status = getOpenStatus();
  const { toggleCart } = useCart();
  const fromPrice = pizzaSizes[0].price.toFixed(2).replace(".", ",") + " €";

  return (
    <section className="hero" id="top">
      <h1 className="sr-only">
        Kabana Pizz — pizzas artisanales à Brie-Comte-Robert
      </h1>
      <div className="hero__glow" aria-hidden="true" />
      <div className="wrap hero__inner">
        <div className="hero__content">
          <span className="eyebrow">Kiosque à pizza · Brie-Comte-Robert</span>
          <p className="hero__lead hero__lead--lg">
            Pizzas artisanales · pâte fraîche · dès {fromPrice}
          </p>

          <div className="hero__actions">
            <a href="#carte" className="btn btn-primary">
              Voir le menu
            </a>
            <button type="button" className="btn btn-ghost" onClick={toggleCart}>
              Commander
            </button>
          </div>

          <div className="hero__meta">
            <span className={`status-pill ${status.open ? "status-pill--open" : "status-pill--closed"}`}>
              <span className="status-dot" aria-hidden="true" />
              {status.open
                ? `${status.label} · jusqu'à ${status.until} · prêt en ${status.prepTime}`
                : status.opensAt
                ? `Fermé · ouvre à ${status.opensAt}`
                : status.label}
            </span>
            <span className="hero__rating">
              <strong>4,8/5</strong> <em>· 120+ avis Google &amp; Facebook</em>
            </span>
          </div>

          <p className="hero__hint">
            Menu, panier et commande WhatsApp ci-dessous ↓
          </p>
        </div>

        <div className="hero__card">
          <div className="hero__photo">
            <div className="hero__pizza-glow" aria-hidden="true" />
            <img
              src={restaurant.heroImage}
              alt="Le kiosque Kabana Pizz et son enseigne orange à Brie-Comte-Robert"
              className="hero__img"
              loading="eager"
            />
          </div>
          <div className="hero__price-tag" aria-hidden="true">
            <span>dès</span>
            <strong>{fromPrice}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
