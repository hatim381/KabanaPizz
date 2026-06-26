import { useState } from "react";
import { pizzas, drinks, tagLabels, restaurant } from "../data/menu";
import { useReveal } from "../utils/useReveal";
import { useCart } from "../cart/CartContext";

const filters = [
  { key: "all", label: "Toutes" },
  { key: "viande", label: "Viande" },
  { key: "végé", label: "Végé" },
  { key: "tomate", label: "Base tomate" },
  { key: "crème", label: "Base crème" },
];

function formatPrice(p) {
  return p.toFixed(2).replace(".", ",") + " €";
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
              Pâte fraîche travaillée chaque jour, légumes coupés du matin. Prix
              tout compris, sans mauvaise surprise.
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
            <article key={p.id} className={`pizza ${p.signature ? "pizza--signature" : ""}`}>
              {p.signature && <span className="pizza__badge">La signature 🔥</span>}
              <div className="pizza__top">
                <h3 className="pizza__name">{p.name}</h3>
                <span className="pizza__price">{formatPrice(p.price)}</span>
              </div>
              <p className="pizza__base">{p.base}</p>
              <p className="pizza__ingredients">{p.ingredients.join(" · ")}</p>
              <div className="pizza__tags">
                {p.tags
                  .filter((t) => tagLabels[t] && t !== "signature")
                  .map((t) => (
                    <span key={t} className={`tag tag--${t}`}>
                      {tagLabels[t]}
                    </span>
                  ))}
              </div>
              <button
                className="pizza__add"
                onClick={() => add({ id: p.id, name: p.name, price: p.price })}
                aria-label={`Ajouter ${p.name} au panier`}
              >
                Ajouter · {formatPrice(p.price)}
              </button>
            </article>
          ))}
        </div>

        <div className="drinks">
          <h3 className="drinks__title">Boissons</h3>
          <ul className="drinks__list">
            {drinks.map((d, idx) => (
              <li key={d.name}>
                <span>{d.name}</span>
                <span className="drinks__dots" aria-hidden="true" />
                <strong>{formatPrice(d.price)}</strong>
                <button
                  className="drinks__add"
                  onClick={() => add({ id: `drink-${idx}`, name: d.name, price: d.price })}
                  aria-label={`Ajouter ${d.name} au panier`}
                >
                  +
                </button>
              </li>
            ))}
          </ul>
          <p className="drinks__note">
            Pains, suppléments et autres : demandez-nous au comptoir ou par téléphone.
          </p>
        </div>
      </div>
    </section>
  );
}
