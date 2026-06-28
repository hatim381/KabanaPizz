import { restaurant } from "../data/menu";
import { getOpenStatus } from "../utils/hours";
import BestSellers from "./BestSellers";

export default function Hero() {
  const status = getOpenStatus();

  return (
    <section className="hero" id="top">
      <h1 className="sr-only">
        Kabana Pizz — pizzas artisanales à Brie-Comte-Robert
      </h1>
      <div className="hero__glow" aria-hidden="true" />
      <div className="wrap hero__inner">
        <div className="hero__content">
          <span className="eyebrow">Kiosque à pizza · Brie-Comte-Robert</span>
          <p className="hero__lead hero__lead--lg">{restaurant.description}</p>

          <div className="hero__actions">
            <a href="#menu-pizzas" className="btn btn-primary">
              Commander maintenant
            </a>
            <a href={`tel:${restaurant.phoneRaw}`} className="btn btn-ghost">
              📞 Appeler
            </a>
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

          <BestSellers variant="hero" />
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
            <strong>10 €</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
