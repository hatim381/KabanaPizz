import { useState } from "react";
import { pizzas, pizzaSizes, sides, drinks, formule, tagLabels, restaurant } from "../data/menu";
import { useReveal } from "../utils/useReveal";
import { useCart } from "../cart/CartContext";

const filters = [
  { key: "all", label: "Toutes" },
  { key: "viande", label: "Viande" },
  { key: "poisson", label: "Poisson" },
  { key: "végé", label: "Végé" },
  { key: "tomate", label: "Base tomate" },
  { key: "crème", label: "Base crème" },
];

function formatPrice(p) {
  return p.toFixed(2).replace(".", ",").replace(",00", "") + " €";
}

// Affiche la photo de la pizza, avec repli sur un visuel généré
// si le fichier est absent ou ne charge pas.
function PizzaMedia({ pizza }) {
  const [error, setError] = useState(false);
  const showImg = pizza.image && !error;

  return (
    <div className="pizza__media">
      {showImg ? (
        <img
          src={pizza.image}
          alt={`Pizza ${pizza.name} : ${pizza.ingredients.join(", ")}`}
          className="pizza__img"
          loading="lazy"
          onError={() => setError(true)}
        />
      ) : (
        <div className="pizza__media-fallback" aria-hidden="true">
          <span>🍕</span>
        </div>
      )}
      {pizza.signature && <span className="pizza__badge">La signature 🔥</span>}
    </div>
  );
}

// Photo générique pour accompagnement / boisson, avec repli si absente.
function ExtraMedia({ item, fallback, badge }) {
  const [error, setError] = useState(false);
  const showImg = item.image && !error;

  return (
    <div className="extra__media">
      {showImg ? (
        <img
          src={item.image}
          alt={item.name}
          className="extra__img"
          loading="lazy"
          onError={() => setError(true)}
        />
      ) : (
        <div className="extra__media-fallback" aria-hidden="true">
          <span>{fallback}</span>
        </div>
      )}
      {badge}
    </div>
  );
}

// Carte pizza avec choix de la taille (32 cm / 40 cm).
function PizzaCard({ pizza }) {
  const { add } = useCart();
  const [size, setSize] = useState(pizzaSizes[0]);

  return (
    <article className={`pizza ${pizza.signature ? "pizza--signature" : ""}`}>
      <PizzaMedia pizza={pizza} />
      <div className="pizza__body">
        <div className="pizza__top">
          <h3 className="pizza__name">{pizza.name}</h3>
        </div>
        <p className="pizza__base">{pizza.base}</p>
        <p className="pizza__ingredients">{pizza.ingredients.join(" · ")}</p>
        <div className="pizza__tags">
          {pizza.tags
            .filter((t) => tagLabels[t] && t !== "signature" && t !== "tomate" && t !== "crème")
            .map((t) => (
              <span key={t} className={`tag tag--${t}`}>
                {tagLabels[t]}
              </span>
            ))}
        </div>

        <div className="pizza__sizes" role="group" aria-label={`Taille pour ${pizza.name}`}>
          {pizzaSizes.map((s) => (
            <button
              key={s.id}
              className={`pizza__size ${size.id === s.id ? "is-active" : ""}`}
              aria-pressed={size.id === s.id}
              onClick={() => setSize(s)}
            >
              <span className="pizza__size-label">{s.label}</span>
              <span className="pizza__size-price">{formatPrice(s.price)}</span>
            </button>
          ))}
        </div>

        <button
          className="pizza__add"
          onClick={() =>
            add({
              id: `${pizza.id}-${size.id}`,
              name: `${pizza.name} · ${size.label}`,
              price: size.price,
            })
          }
          aria-label={`Ajouter ${pizza.name} ${size.label} au panier`}
        >
          Ajouter · {formatPrice(size.price)}
        </button>
      </div>
    </article>
  );
}

export default function Menu() {
  const [filter, setFilter] = useState("all");
  const [ref, visible] = useReveal();
  const { add } = useCart();

  const shown =
    filter === "all" ? pizzas : pizzas.filter((p) => p.tags.includes(filter));

  return (
    <section id="menu">
      <div ref={ref} className={`wrap reveal ${visible ? "is-visible" : ""}`}>
        <header className="menu__head">
          <div>
            <span className="eyebrow">La carte</span>
            <h2 className="section-title">Nos pizzas, à la main</h2>
            <p className="section-lead">
              Pâte fraîche travaillée chaque jour, légumes coupés du matin. Toutes
              nos pizzas : <strong>{formatPrice(pizzaSizes[0].price)}</strong> en{" "}
              {pizzaSizes[0].label} ({pizzaSizes[0].sub}) ·{" "}
              <strong>{formatPrice(pizzaSizes[1].price)}</strong> en{" "}
              {pizzaSizes[1].label} ({pizzaSizes[1].sub}).
            </p>
          </div>
          <a href={restaurant.flyer} target="_blank" rel="noreferrer" className="btn btn-ghost menu__pdf">
            ⤓ Flyer PDF
          </a>
        </header>

        <div className="menu__filters" role="tablist" aria-label="Filtrer les pizzas">
          {filters.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              className={`chip ${filter === f.key ? "chip--active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="menu__grid">
          {shown.map((p) => (
            <PizzaCard key={p.id} pizza={p} />
          ))}
        </div>

        <div className="formule">
          <ExtraMedia
            item={formule}
            fallback="🥪"
            badge={<span className="formule__tag">Midi &amp; soir</span>}
          />
          <div className="formule__body">
            <h3 className="formule__name">{formule.name}</h3>
            <p className="formule__desc">{formule.description}</p>
          </div>
          <div className="formule__action">
            <span className="formule__price">{formatPrice(formule.price)}</span>
            <button
              className="pizza__add formule__add"
              onClick={() => add({ id: `menu-${formule.id}`, name: formule.name, price: formule.price })}
              aria-label={`Ajouter ${formule.name} au panier`}
            >
              Ajouter
            </button>
          </div>
        </div>

        <div className="extras">
          <div className="extras__block">
            <h3 className="drinks__title">Accompagnements</h3>
            <div className="extra__grid">
              {sides.map((s) => (
                <article key={s.id} className="extra">
                  <ExtraMedia item={s} fallback="🍟" />
                  <div className="extra__body">
                    <span className="extra__name">{s.name}</span>
                    <strong className="extra__price">{formatPrice(s.price)}</strong>
                  </div>
                  <button
                    className="extra__add"
                    onClick={() => add({ id: `side-${s.id}`, name: s.name, price: s.price })}
                    aria-label={`Ajouter ${s.name} au panier`}
                  >
                    Ajouter
                  </button>
                </article>
              ))}
            </div>
          </div>

          <div className="extras__block">
            <h3 className="drinks__title">Boissons</h3>
            <div className="extra__grid">
              {drinks.map((d) => (
                <article key={d.id} className="extra">
                  <ExtraMedia item={d} fallback="🥤" />
                  <div className="extra__body">
                    <span className="extra__name">{d.name}</span>
                    <strong className="extra__price">{formatPrice(d.price)}</strong>
                  </div>
                  <button
                    className="extra__add"
                    onClick={() => add({ id: `drink-${d.id}`, name: d.name, price: d.price })}
                    aria-label={`Ajouter ${d.name} au panier`}
                  >
                    Ajouter
                  </button>
                </article>
              ))}
            </div>
            <p className="drinks__note">
              Pains, suppléments et autres : demandez-nous au comptoir ou par téléphone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
