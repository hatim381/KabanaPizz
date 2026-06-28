import { useEffect, useState } from "react";
import { restaurant, menuShortcuts } from "../data/menu";
import { getOpenStatus } from "../utils/hours";
import { useCart } from "../cart/CartContext";

export default function Navbar() {
  const [status, setStatus] = useState(getOpenStatus());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, toggleCart } = useCart();

  useEffect(() => {
    const t = setInterval(() => setStatus(getOpenStatus()), 60000);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      clearInterval(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const links = [
    ...menuShortcuts,
    { href: "#commander", label: "Commander" },
    { href: "#avis", label: "Avis" },
    { href: "#infos", label: "Infos" },
  ];

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="wrap nav__inner">
        <a href="#top" className="nav__brand" aria-label="Kabana Pizz, accueil">
          <img src={restaurant.logo} alt="" className="nav__logo" aria-hidden="true" />
          <span className="nav__name">
            Kabana<span className="nav__name-accent"> Pizz</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Navigation principale">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <span
            className={`status-pill ${status.open ? "status-pill--open" : "status-pill--closed"}`}
            title={
              status.open
                ? `Ouvert jusqu'à ${status.until}`
                : status.opensAt
                ? `Ouvre à ${status.opensAt}`
                : "Fermé pour le moment"
            }
          >
            <span className="status-dot" aria-hidden="true" />
            {status.label}
          </span>
          <a href={`tel:${restaurant.phoneRaw}`} className="btn btn-primary nav__cta">
            Appeler
          </a>
          <button
            className="nav__cart"
            onClick={toggleCart}
            aria-label={`Ouvrir le panier${count > 0 ? `, ${count} article${count > 1 ? "s" : ""}` : ""}`}
          >
            <span className="nav__cart-icon" aria-hidden="true">🛒</span>
            <span className="nav__cart-label">Panier{count > 0 ? ` (${count})` : ""}</span>
            {count > 0 && <span className="nav__cart-badge" aria-hidden="true">{count}</span>}
          </button>
          <button
            className="nav__burger"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav__mobile">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${restaurant.phoneRaw}`}
            className="btn btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Appeler pour commander
          </a>
        </div>
      )}
    </header>
  );
}
