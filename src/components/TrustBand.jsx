import { trustPoints, faqItems, paymentMethods } from "../data/menu";

export default function TrustBand() {
  return (
    <section className="trust" aria-label="Réassurance et informations pratiques">
      <div className="wrap trust__inner">
        <ul className="trust__points">
          {trustPoints.map((point) => (
            <li key={point.title} className="trust__point">
              <span className="trust__icon" aria-hidden="true">
                {point.icon}
              </span>
              <div>
                <strong>{point.title}</strong>
                <span>{point.text}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="trust__payments">
          <strong>Moyens de paiement :</strong> {paymentMethods.join(" · ")}
        </p>
        <div className="trust__faq">
          {faqItems.map((item) => (
            <details key={item.q} className="trust__item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}