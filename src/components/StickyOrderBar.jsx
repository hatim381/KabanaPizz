import { useCart } from "../cart/CartContext";

function euro(n) {
  return n.toFixed(2).replace(".", ",") + " €";
}

export default function StickyOrderBar() {
  const { count, total, open, toggleCart } = useCart();

  if (open) return null;

  return (
    <div className="sticky-order" role="region" aria-label="Commander rapidement">
      <a href="#carte" className="sticky-order__menu btn btn-ghost">
        Menu
      </a>
      <button type="button" className="sticky-order__cart btn btn-primary" onClick={toggleCart}>
        <span className="sticky-order__cart-icon" aria-hidden="true">🛒</span>
        <span className="sticky-order__cart-text">
          {count > 0 ? (
            <>
              Panier · <strong>{euro(total)}</strong>
            </>
          ) : (
            "Voir le panier"
          )}
        </span>
        {count > 0 && <span className="sticky-order__badge">{count}</span>}
      </button>
    </div>
  );
}