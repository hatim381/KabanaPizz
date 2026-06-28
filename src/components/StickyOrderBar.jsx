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
        <span aria-hidden="true">🛒</span>
        {count > 0 ? (
          <>
            Panier · <strong>{euro(total)}</strong>
            <span className="sticky-order__badge">{count}</span>
          </>
        ) : (
          "Commander"
        )}
      </button>
    </div>
  );
}