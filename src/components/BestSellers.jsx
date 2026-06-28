import { useState } from "react";
import { pizzas, pizzaSizes, bestSellerIds } from "../data/menu";
import { useCart } from "../cart/CartContext";

function formatPrice(p) {
  return p.toFixed(2).replace(".", ",").replace(",00", "") + " €";
}

const bestSellers = bestSellerIds
  .map((id) => pizzas.find((p) => p.id === id))
  .filter(Boolean);

export default function BestSellers({ variant = "menu" }) {
  const { add } = useCart();
  const defaultSize = pizzaSizes[0];
  const isFirstScreen = variant === "firstscreen";

  return (
    <div className={`bestsellers bestsellers--${variant}`}>
      {variant === "menu" && (
        <div className="bestsellers__head">
          <h3 className="bestsellers__title">Les plus commandées</h3>
          <p className="bestsellers__lead">Choix rapide — ajoutez en un clic, taille {defaultSize.label}.</p>
        </div>
      )}
      {isFirstScreen && (
        <p className="bestsellers__firstscreen-label">Top ventes · taille {defaultSize.label}</p>
      )}
      <div className="bestsellers__grid" role="list">
        {bestSellers.map((pizza) => (
          <BestSellerCard
            key={pizza.id}
            pizza={pizza}
            size={defaultSize}
            compact={false}
            prominent={isFirstScreen}
            onAdd={() =>
              add({
                id: `${pizza.id}-${defaultSize.id}`,
                name: `${pizza.name} · ${defaultSize.label}`,
                price: defaultSize.price,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}

function BestSellerCard({ pizza, size, compact, prominent, onAdd }) {
  const [error, setError] = useState(false);

  return (
    <article
      className={`bestseller-card ${compact ? "bestseller-card--compact" : ""} ${prominent ? "bestseller-card--prominent" : ""}`}
      role="listitem"
    >
      <a href={`#pizza-${pizza.id}`} className="bestseller-card__media">
        {pizza.image && !error ? (
          <img
            src={pizza.image}
            alt={pizza.name}
            loading="lazy"
            onError={() => setError(true)}
          />
        ) : (
          <span className="bestseller-card__fallback" aria-hidden="true">
            🍕
          </span>
        )}
        {pizza.signature && <span className="bestseller-card__badge">Signature</span>}
      </a>
      <div className="bestseller-card__body">
        <a href={`#pizza-${pizza.id}`} className="bestseller-card__name">
          {pizza.name}
        </a>
        {!compact && (
          <>
            <p className="bestseller-card__base">{pizza.base}</p>
            <p className="bestseller-card__ingredients">
              {pizza.ingredients.slice(0, 5).join(" · ")}
              {pizza.ingredients.length > 5 ? "…" : ""}
            </p>
          </>
        )}
        <div className="bestseller-card__foot">
          <span className="bestseller-card__price">
            {formatPrice(size.price)}
            <small>{size.label}</small>
          </span>
          <button
            type="button"
            className="bestseller-card__add"
            onClick={onAdd}
            aria-label={`Ajouter ${pizza.name} ${size.label} au panier`}
          >
            {prominent ? "Ajouter au panier" : compact ? "+" : "Ajouter"}
          </button>
        </div>
      </div>
    </article>
  );
}