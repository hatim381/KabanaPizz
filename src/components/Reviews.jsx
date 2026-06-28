import { useState } from "react";
import { reviews, restaurant } from "../data/menu";
import { useReveal } from "../utils/useReveal";

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [ref, visible] = useReveal();

  const go = (dir) => {
    setIndex((i) => (i + dir + reviews.length) % reviews.length);
  };

  return (
    <section id="avis" className="reviews">
      <div ref={ref} className={`wrap reveal ${visible ? "is-visible" : ""}`}>
        <div className="reviews__head">
          <div>
            <span className="eyebrow">Ce qu'on en dit</span>
            <h2 className="section-title">« Le repas des dieux »</h2>
            <p className="reviews__summary">
              <span className="reviews__score" aria-label="Note moyenne 4,8 sur 5">★ 4,8/5</span>
              <span>· {reviews.length} avis clients · Google &amp; Facebook</span>
            </p>
          </div>
          <div className="reviews__nav">
            <button className="reviews__arrow" aria-label="Avis précédent" onClick={() => go(-1)}>‹</button>
            <button className="reviews__arrow" aria-label="Avis suivant" onClick={() => go(1)}>›</button>
          </div>
        </div>

        <div className="reviews__grid">
          {reviews.slice(0, 3).map((r, i) => (
            <blockquote key={i} className="review review--card">
              <div className="review__stars" aria-label="5 étoiles sur 5">★★★★★</div>
              <p className="review__text">{r.text}</p>
              <footer className="review__foot">
                <strong>{r.author}</strong>
                <span className="review__source">via {r.source}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="reviews__stage">
          {reviews.map((r, i) => (
            <blockquote
              key={i}
              className={`review ${i === index ? "review--active" : ""}`}
              aria-hidden={i !== index}
            >
              <div className="review__stars" aria-label="5 étoiles sur 5">★★★★★</div>
              <p className="review__text">{r.text}</p>
              <footer className="review__foot">
                <strong>{r.author}</strong>
                <span className="review__source">via {r.source}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="reviews__dots" role="tablist" aria-label="Choisir un avis">
          {reviews.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Avis ${i + 1}`}
              className={`reviews__dot ${i === index ? "reviews__dot--active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <div className="reviews__actions">
          <a href={restaurant.google} target="_blank" rel="noreferrer" className="btn btn-ghost">
            Laisser un avis Google
          </a>
        </div>
      </div>
    </section>
  );
}
