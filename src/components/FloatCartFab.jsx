import { useCart } from "../cart/CartContext";

function euro(n) {
  return n.toFixed(2).replace(".", ",") + " €";
}

export default function FloatCartFab() {
  const { count, total, open, toggleCart } = useCart();

  if (open) return null;

  return (
    <button
      type="button"
      className="float-cart"
      onClick={toggleCart}
      aria-label={
        count > 0
          ? `Ouvrir le panier, ${count} article${count > 1 ? "s" : ""}, total ${euro(total)}`
          : "Ouvrir le panier pour commander"
      }
    >
      <span className="float-cart__icon" aria-hidden="true">
        🛒
      </span>
      <span className="float-cart__label">
        {count > 0 ? (
          <>
            Panier · <strong>{euro(total)}</strong>
          </>
        ) : (
          "Panier"
        )}
      </span>
      {count > 0 && <span className="float-cart__badge">{count}</span>}
    </button>
  );
}