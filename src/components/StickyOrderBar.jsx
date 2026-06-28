import { useEffect, useState } from "react";
import { useCart } from "../cart/CartContext";

function euro(n) {
  return n.toFixed(2).replace(".", ",") + " €";
}

export default function StickyOrderBar() {
  const { count, total, open, toggleCart } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 380);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || open) return null;

  return (
    <div className="sticky-order" role="region" aria-label="Commander rapidement">
      <a href="#menu-pizzas" className="sticky-order__menu btn btn-ghost">
        Voir la carte
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