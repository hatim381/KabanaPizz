import { useState } from "react";
import { useCart } from "./CartContext";
import { buildWhatsappOrder } from "./whatsapp";

function euro(n) {
  return n.toFixed(2).replace(".", ",") + " €";
}

export default function CartDrawer() {
  const { items, open, total, count, inc, dec, remove, clear, closeCart } = useCart();
  const [mode, setMode] = useState("emporter");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  const empty = items.length === 0;

  const handleOrder = () => {
    if (empty) return;
    const url = buildWhatsappOrder({ items, total, mode, name, note });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div
        className={`cart-overlay ${open ? "cart-overlay--show" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`cart ${open ? "cart--open" : ""}`}
        aria-label="Votre commande"
        aria-hidden={!open}
      >
        <header className="cart__head">
          <h2 className="cart__title">
            Votre commande
            {count > 0 && <span className="cart__count">{count}</span>}
          </h2>
          <button className="cart__close" onClick={closeCart} aria-label="Fermer le panier">
            ✕
          </button>
        </header>

        {empty ? (
          <div className="cart__empty">
            <span className="cart__empty-emoji" aria-hidden="true">🍕</span>
            <p>Votre panier est vide.</p>
            <p className="cart__empty-sub">Ajoutez une pizza depuis la carte pour commencer.</p>
            <button className="btn btn-ghost" onClick={closeCart}>
              Voir la carte
            </button>
          </div>
        ) : (
          <>
            <div className="cart__items">
              {items.map((i) => (
                <div key={i.id} className="cart-item">
                  <div className="cart-item__info">
                    <span className="cart-item__name">{i.name}</span>
                    <span className="cart-item__price">{euro(i.price)}</span>
                  </div>
                  <div className="cart-item__controls">
                    <div className="qty">
                      <button onClick={() => dec(i.id)} aria-label={`Retirer un ${i.name}`}>−</button>
                      <span aria-live="polite">{i.qty}</span>
                      <button onClick={() => inc(i.id)} aria-label={`Ajouter un ${i.name}`}>+</button>
                    </div>
                    <span className="cart-item__subtotal">{euro(i.price * i.qty)}</span>
                    <button
                      className="cart-item__remove"
                      onClick={() => remove(i.id)}
                      aria-label={`Supprimer ${i.name}`}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart__form">
              <div className="cart__mode" role="group" aria-label="Mode de retrait">
                <button
                  className={`cart__mode-btn ${mode === "emporter" ? "is-active" : ""}`}
                  onClick={() => setMode("emporter")}
                >
                  À emporter
                </button>
                <button
                  className={`cart__mode-btn ${mode === "place" ? "is-active" : ""}`}
                  onClick={() => setMode("place")}
                >
                  Sur place
                </button>
              </div>

              <label className="cart__field">
                <span>Votre nom (facultatif)</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Hatim"
                />
              </label>

              <label className="cart__field">
                <span>Note (facultatif)</span>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ex : pizza bien cuite, sans olives…"
                />
              </label>
            </div>

            <footer className="cart__foot">
              <div className="cart__total">
                <span>Total</span>
                <strong>{euro(total)}</strong>
              </div>
              <button className="btn btn-whatsapp" onClick={handleOrder}>
                <span aria-hidden="true">🟢</span> Commander sur WhatsApp
              </button>
              <p className="cart__hint">
                Votre commande s'ouvre dans WhatsApp, prête à envoyer. Le paiement
                se fait au retrait.
              </p>
              <button className="cart__clear" onClick={clear}>
                Vider le panier
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
