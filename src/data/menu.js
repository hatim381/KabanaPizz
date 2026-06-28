// Kabana Pizz — données du menu et de l'établissement
// Les prix sont des exemples réalistes pour une pizzeria de kiosque.
// À ajuster facilement ici : c'est la seule source de vérité du menu.

export const restaurant = {
  name: "Kabana Pizz",
  tagline: "La pizza de la cabane, cuite au feu",
  description:
    "Pizzas artisanales, légumes frais coupés du jour, pâte travaillée à la main. Délicieux et pas cher.",
  // Images — déposez les fichiers dans /public et gardez ces chemins
  logo: "/logo.png",
  heroImage: "/hero.jpg",
  address: {
    street: "14 rue Général Leclerc",
    city: "Brie-Comte-Robert",
    zip: "77170",
    region: "Île-de-France",
  },
  phone: "07 71 73 61 15",
  phoneRaw: "0771736115",
  // Numéro WhatsApp qui reçoit les commandes (format international, sans + ni espaces)
  // 33 = France, puis le numéro sans le 0 initial.
  whatsapp: "33618362121",
  phoneBackup: "06 59 51 76 67",
  phoneBackupRaw: "0659517667",
  uberEats:
    "https://www.order.store/fr/store/kabana-pizz/G4m5ToisTTacVwuXwAAmmg",
  google: "https://g.page/r/CewJhBR5-88MEA0/review",
  facebook: "https://www.facebook.com/kabanapizz",
  flyer:
    "https://www.kabanapizz.fr/wp-content/uploads/2026/06/FlyerKabanaPizz.pdf",
  mapsQuery:
    "Kabana Pizz, 14 rue Général Leclerc 77170 Brie-Comte-Robert",
};

// Horaires — facilement modifiables. 0 = dimanche … 6 = samedi
// (source : flyer officiel. Jours fériés : 18h00–22h00, non géré ici.)
export const hours = [
  { day: "Lundi", index: 1, open: "18:30", close: "21:45", open2: null, close2: null },
  { day: "Mardi", index: 2, open: "11:30", close: "13:45", open2: "18:30", close2: "21:45" },
  { day: "Mercredi", index: 3, open: "11:30", close: "13:45", open2: "18:30", close2: "21:45" },
  { day: "Jeudi", index: 4, open: "11:30", close: "13:45", open2: "18:30", close2: "21:45" },
  { day: "Vendredi", index: 5, open: "11:30", close: "13:45", open2: "18:30", close2: "21:45" },
  { day: "Samedi", index: 6, open: "11:45", close: "13:45", open2: "18:30", close2: "21:45" },
  { day: "Dimanche", index: 0, open: "18:15", close: "21:45", open2: null, close2: null },
];

// Toutes les pizzas sont au même tarif, selon la taille (cf. flyer).
export const pizzaSizes = [
  { id: "32", label: "32 cm", sub: "2 pers.", price: 10 },
  { id: "40", label: "40 cm", sub: "3 pers.", price: 17 },
];

// Photos des pizzas : déposez simplement un fichier nommé d'après l'`id`
// dans public/pizzas/  (ex. public/pizzas/kabana.jpg) — il s'affiche
// automatiquement. Si le fichier n'existe pas (ou ne charge pas), un visuel
// de remplacement soigné s'affiche à la place. Formats : .jpg, .png ou .webp
// (gardez l'extension .jpg ci-dessous ou adaptez le champ `image`).
export const pizzas = [
  {
    id: "margherita",
    name: "Margherita",
    image: "/pizzas/margherita.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "olives noires", "origan"],
    tags: ["tomate", "végé"],
  },
  {
    id: "quatre-fromages",
    name: "4 fromages",
    image: "/pizzas/quatre-fromages.jpg",
    base: "Sauce tomate ou crème fraîche",
    ingredients: ["mozzarella", "emmental", "bleu", "chèvre"],
    tags: ["tomate", "crème", "végé"],
  },
  {
    id: "orientale",
    name: "Orientale",
    image: "/pizzas/orientale.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "merguez", "oignons", "poivrons"],
    tags: ["tomate", "viande"],
  },
  {
    id: "tex-mex",
    name: "Tex mex",
    image: "/pizzas/tex-mex.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "oignons", "piments", "merguez", "bœuf"],
    tags: ["tomate", "viande", "spicy"],
  },
  {
    id: "reine",
    name: "Reine",
    image: "/pizzas/reine.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "jambon", "champignons"],
    tags: ["tomate", "viande"],
  },
  {
    id: "hawaienne",
    name: "Hawaïenne",
    image: "/pizzas/hawaienne.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "jambon", "ananas"],
    tags: ["tomate", "viande"],
  },
  {
    id: "cannibale",
    name: "Cannibale",
    image: "/pizzas/cannibale.jpg",
    base: "Sauce barbecue",
    ingredients: ["mozzarella", "merguez", "bœuf", "poulet rôti"],
    tags: ["viande", "spicy"],
  },
  {
    id: "pecheur",
    name: "Pêcheur",
    image: "/pizzas/pecheur.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "thon", "oignons", "olives", "filet de crème fraîche"],
    tags: ["tomate", "poisson"],
  },
  {
    id: "kabana",
    name: "Kabana",
    image: "/pizzas/kabana.jpg",
    base: "Sauce tomate",
    ingredients: [
      "mozzarella",
      "peperonni",
      "oignons",
      "champignons",
      "poivrons",
      "olives noires",
      "bœuf",
    ],
    tags: ["signature", "tomate", "viande"],
    signature: true,
  },
  {
    id: "campione",
    name: "Campione",
    image: "/pizzas/campione.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "viande hachée", "œuf", "emmental", "origan"],
    tags: ["tomate", "viande"],
  },
  {
    id: "calzone",
    name: "Calzone (soufflé)",
    image: "/pizzas/calzone.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "jambon", "œuf"],
    tags: ["tomate", "viande"],
  },
  {
    id: "savoyarde",
    name: "Savoyarde",
    image: "/pizzas/savoyarde.jpg",
    base: "Crème fraîche",
    ingredients: ["mozzarella", "pommes de terre", "lardons", "emmental français"],
    tags: ["crème", "viande"],
  },
  {
    id: "chevre-miel",
    name: "Chèvre miel",
    image: "/pizzas/chevre-miel.jpg",
    base: "Crème fraîche",
    ingredients: ["mozzarella", "fromage de chèvre", "miel"],
    tags: ["crème", "végé"],
  },
  {
    id: "norvegienne",
    name: "Norvégienne",
    image: "/pizzas/norvegienne.jpg",
    base: "Crème fraîche",
    ingredients: ["mozzarella", "oignons", "saumon", "pommes de terre", "aneth"],
    tags: ["crème", "poisson"],
  },
  {
    id: "vegetarienne",
    name: "Végétarienne",
    image: "/pizzas/vegetarienne.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "oignons", "champignons", "poivrons", "olives", "zeste d'origan"],
    tags: ["tomate", "végé"],
  },
  {
    id: "indiana",
    name: "Indiana",
    image: "/pizzas/indiana.jpg",
    base: "Crème fraîche",
    ingredients: ["mozzarella", "emmental", "poulet rôti", "oignons", "champignons"],
    tags: ["crème", "viande"],
  },
  {
    id: "mexicaine",
    name: "Mexicaine",
    image: "/pizzas/mexicaine.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "pepperoni", "viande hachée", "piments", "poivrons", "emmental"],
    tags: ["tomate", "viande", "spicy"],
  },
  {
    id: "raclette",
    name: "Raclette",
    image: "/pizzas/raclette.jpg",
    base: "Crème fraîche",
    ingredients: [
      "mozzarella",
      "jambon",
      "lardons",
      "oignons frais",
      "pommes de terre",
      "fromage à raclette",
      "emmental",
    ],
    tags: ["crème", "viande"],
  },
  {
    id: "pepperonni-lover",
    name: "Pepperonni Lover",
    image: "/pizzas/pepperonni-lover.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "pepperoni halal"],
    tags: ["tomate", "viande"],
  },
  {
    id: "jambon-lover",
    name: "Jambon Lover",
    image: "/pizzas/jambon-lover.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "jambon"],
    tags: ["tomate", "viande"],
  },
  {
    id: "cheese-lover",
    name: "Cheese Lover",
    image: "/pizzas/cheese-lover.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "emmental"],
    tags: ["tomate", "végé"],
  },
  {
    id: "merguez-lover",
    name: "Merguez Lover",
    image: "/pizzas/merguez-lover.jpg",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "merguez halal"],
    tags: ["tomate", "viande"],
  },
];

// Pizzas mises en avant (les plus commandées).
export const bestSellerIds = ["kabana", "reine", "cannibale", "margherita"];

// Boissons suggérées en upsell panier.
export const upsellDrinkIds = ["coca-cola-33", "oasis-tropical-33", "eau-50"];

export const paymentMethods = ["Espèces", "Carte bancaire", "Sans contact"];

export const trustPoints = [
  { icon: "★", title: "4,8/5", text: "120+ avis Google & Facebook" },
  { icon: "⏱", title: "15-20 min", text: "Préparation à emporter" },
  { icon: "💳", title: "Paiement", text: "Espèces, carte ou sans contact au retrait" },
  { icon: "🛵", title: "Uber Eats", text: "Livraison dans le 77" },
];

export const faqItems = [
  {
    q: "Comment commander ?",
    a: "Ajoutez vos produits au panier, validez sur WhatsApp, ou appelez directement le kiosque.",
  },
  {
    q: "Paiement et livraison ?",
    a: "Paiement au retrait sur place. Livraison possible via Uber Eats dans le secteur.",
  },
  {
    q: "Délais de préparation ?",
    a: "Comptez 15 à 20 minutes selon l'affluence. Commandez à l'avance par téléphone si vous êtes pressé.",
  },
];

// Raccourcis d'ancrage vers les sections de la carte.
export const menuShortcuts = [
  { href: "#menu-pizzas", label: "Pizzas" },
  { href: "#menu-accompagnements", label: "Accompagnements" },
  { href: "#menu-boissons", label: "Boissons" },
];

// Accompagnements — prix unique TTC.
// Photos : déposez un fichier nommé d'après l'`id` dans public/sides/.
export const sides = [
  { id: "cheesy-bread", name: "Cheesy bread", price: 5, image: "/sides/cheesy-bread.jpg" },
  { id: "chicken-wings", name: "Chicken wings (6 pièces)", price: 5, image: "/sides/chicken-wings.png" },
  { id: "chickeninos", name: "Chickeninos (6 pièces)", price: 5, image: "/sides/chickeninos.jpg" },
  { id: "potatoes", name: "Potatoes (300 g)", price: 5, image: "/sides/potatoes.jpg" },
  { id: "brownie", name: "Brownie chocolat", price: 2, image: "/sides/brownie.jpg" },
];

// Formule du midi et du soir.
export const formule = {
  id: "kabanito",
  name: "Menu Kabanito",
  price: 7,
  description:
    "Sandwich + frites + boisson 33 cl au choix (sauf bière) + une sauce (fromagère, algérienne, samouraï, burger).",
  availability: "Midi et soir",
  image: "/formule/kabanito.jpg",
};

// Catalogue boissons aligné sur la carte Uber Eats officielle.
// Photos : déposez un fichier nommé d'après l'`id` dans public/drinks/.
export const drinks = [
  { id: "coca-cola-33", name: "Coca-Cola 33 cl", price: 3.5, image: "/drinks/coca-cola-33.jpg" },
  { id: "coca-cola-125", name: "Coca-Cola 1,25 L", price: 5.0, image: "/drinks/coca-cola-125.jpg" },
  { id: "coca-cherry-33", name: "Coca-Cola Cherry 33 cl", price: 3.5, image: "/drinks/coca-cherry-33.jpg" },
  { id: "coca-zero-33", name: "Coca Zero 33 cl", price: 3.5, image: "/drinks/coca-zero-33.jpg" },
  { id: "coca-zero-125", name: "Coca-Cola Zero 1,25 L", price: 5.0, image: "/drinks/coca-zero-125.jpg" },
  { id: "fanta-125", name: "Fanta 1,25 L", price: 5.0, image: "/drinks/fanta-125.png" },
  { id: "oasis-tropical-33", name: "Oasis Tropical 33 cl", price: 3.5, image: "/drinks/oasis-tropical-33.jpg" },
  { id: "oasis-tropical-2l", name: "Oasis Tropical 2 L", price: 6.0, image: "/drinks/oasis-tropical-2l.jpg" },
  { id: "oasis-cassis-33", name: "Oasis Cassis 33 cl", price: 3.5, image: "/drinks/oasis-cassis-33.jpg" },
  { id: "orangina-33", name: "Orangina 33 cl", price: 3.5, image: "/drinks/orangina-33.jpg" },
  { id: "perrier-33", name: "Perrier 33 cl", price: 3.5, image: "/drinks/perrier-33.png" },
  { id: "canada-dry-33", name: "Canada Dry 33 cl", price: 3.5, image: "/drinks/canada-dry-33.webp" },
  { id: "tropico-33", name: "Tropico 33 cl", price: 3.5, image: "/drinks/tropico-33.jpg" },
  { id: "ice-tea-33", name: "Ice Tea 33 cl", price: 3.5, image: "/drinks/ice-tea-33.jpg" },
  { id: "lipton-ice-tea-125", name: "Lipton Ice Tea 1,25 L", price: 4.5, image: "/drinks/lipton-ice-tea-125.jpg" },
  { id: "redbull-25", name: "Red Bull 25 cl", price: 4.5, image: "/drinks/redbull-25.png" },
  { id: "eau-50", name: "Eau 50 cl", price: 1.5, image: "/drinks/eau-50.jpg" },
  { id: "eau-plate-150", name: "Eau plate 1,5 L", price: 2.5, image: "/drinks/eau-plate-150.webp" },
];

export const reviews = [
  {
    author: "Cliente fidèle",
    source: "Google",
    text: "Excellentes pizzas, ça fait 3 fois que je viens et je ne suis vraiment pas déçue. Très bon rapport qualité-prix, ingrédients de qualité. Les meilleures pizzas du coin à emporter !",
  },
  {
    author: "Famille B.",
    source: "Facebook",
    text: "Mes enfants de 8 et 10 ans ont dit : « c'est le repas des dieux ». Je conseille de manger sur place car rien ne vaut une pizza sortie du four !",
  },
  {
    author: "Habitué du coin",
    source: "Google",
    text: "Une pâte luisante et croustillante sort du four, la cuisson est bien maîtrisée, les ingrédients frais. Pour de la restauration rapide, vous rivalisez avec les meilleures pizzerias d'Île-de-France.",
  },
  {
    author: "Client régulier",
    source: "Google",
    text: "Pizza très bonne et de qualité, bien garnies et cuisson respectée. J'y vais au moins 2 fois par mois, je préfère faire de la route pour manger une bonne pizza.",
  },
  {
    author: "Voisin satisfait",
    source: "Google",
    text: "Super pizza, je ne commande qu'ici, c'est toujours bon ! Le rapport qualité-prix est imbattable, rien à voir avec des pizzas au goût de carton.",
  },
  {
    author: "Nouvelle cliente",
    source: "Facebook",
    text: "Pizzas tellement bonnes ! La pâte et les garnitures excellentes ! Je recommande sans hésiter.",
  },
];

export const tagLabels = {
  spicy: "Épicé",
  viande: "Viande",
  poisson: "Poisson",
  crème: "Base crème",
  tomate: "Base tomate",
  végé: "Végé",
  signature: "Signature",
};
