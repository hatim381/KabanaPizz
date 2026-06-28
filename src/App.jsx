import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Order from "./components/Order";
import Reviews from "./components/Reviews";
import Info from "./components/Info";
import { Footer, CookieBanner } from "./components/Footer";
import { CartProvider } from "./cart/CartContext";
import CartDrawer, { CartToast } from "./cart/CartDrawer";
import TrustBand from "./components/TrustBand";
import StickyOrderBar from "./components/StickyOrderBar";
import { restaurant, hours, pizzas, pizzaSizes } from "./data/menu";
import "./App.css";

// Donnees structurees Schema.org pour le SEO local (horaires, note, menu)
function injectStructuredData() {
  const dayMap = {
    1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday",
    5: "Friday", 6: "Saturday", 0: "Sunday",
  };
  const openingHoursSpecification = [];
  hours.forEach((h) => {
    if (h.open && h.close)
      openingHoursSpecification.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${dayMap[h.index]}`,
        opens: h.open, closes: h.close,
      });
    if (h.open2 && h.close2)
      openingHoursSpecification.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${dayMap[h.index]}`,
        opens: h.open2, closes: h.close2,
      });
  });

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    servesCuisine: "Pizza",
    priceRange: "€",
    telephone: `+33${restaurant.phoneRaw.slice(1)}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address.street,
      addressLocality: restaurant.address.city,
      postalCode: restaurant.address.zip,
      addressCountry: "FR",
    },
    url: "https://www.kabanapizz.fr/",
    openingHoursSpecification,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "120",
    },
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: {
        "@type": "MenuSection",
        name: "Pizzas",
        hasMenuItem: pizzas.map((p) => ({
          "@type": "MenuItem",
          name: p.name,
          description: `${p.base}, ${p.ingredients.join(", ")}`,
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "EUR",
            lowPrice: pizzaSizes[0].price.toFixed(2),
            highPrice: pizzaSizes.at(-1).price.toFixed(2),
            offerCount: pizzaSizes.length,
          },
        })),
      },
    },
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

export default function App() {
  useEffect(() => {
    injectStructuredData();
  }, []);

  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <TrustBand />
        <Menu />
        <Order />
        <Reviews />
        <Info />
      </main>
      <Footer />
      <CartDrawer />
      <CartToast />
      <StickyOrderBar />
      <CookieBanner />
    </CartProvider>
  );
}
