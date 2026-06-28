import { useEffect, useState } from "react";
import { restaurant } from "../data/menu";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__brand">
          <span className="footer__name">Kabana Pizz</span>
          <p>{restaurant.tagline}</p>
        </div>
        <div className="footer__col">
          <h4>Aller à</h4>
          <a href="#menu">La carte</a>
          <a href="#commander">Commander</a>
          <a href="#avis">Avis</a>
          <a href="#infos">Infos</a>
        </div>
        <div className="footer__col">
          <h4>Suivez-nous</h4>
          <a href={restaurant.facebook} target="_blank" rel="noreferrer">Facebook</a>
          <a href={restaurant.google} target="_blank" rel="noreferrer">Google</a>
          <a href={restaurant.uberEats} target="_blank" rel="noreferrer">Uber Eats</a>
        </div>
        <div className="footer__col">
          <h4>Contact</h4>
          <a href={`tel:${restaurant.phoneRaw}`}>{restaurant.phone}</a>
          <a href={`tel:${restaurant.phoneBackupRaw}`}>{restaurant.phoneBackup}</a>
          <span className="footer__addr">
            {restaurant.address.street}, {restaurant.address.zip}{" "}
            {restaurant.address.city}
          </span>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <span>© 2016–{new Date().getFullYear()} Kabana Pizz</span>
        <a href="/mentions-legales">Mentions légales</a>
      </div>
    </footer>
  );
}

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("kabana-cookies")) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  const accept = (value) => {
    try {
      localStorage.setItem("kabana-cookies", value);
    } catch {
      /* stockage indisponible : on ferme quand même */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="cookie" role="dialog" aria-label="Préférences cookies">
      <p>
        On utilise des cookies de mesure d'audience pour améliorer le site. Vous
        pouvez accepter ou continuer sans.
      </p>
      <div className="cookie__actions">
        <button className="btn btn-ghost" onClick={() => accept("refused")}>
          Continuer sans
        </button>
        <button className="btn btn-primary" onClick={() => accept("accepted")}>
          J'accepte
        </button>
      </div>
    </div>
  );
}
