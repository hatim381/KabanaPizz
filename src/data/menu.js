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
export const hours = [
  { day: "Lundi", index: 1, open: "11:30", close: "14:00", open2: "18:00", close2: "22:30" },
  { day: "Mardi", index: 2, open: "11:30", close: "14:00", open2: "18:00", close2: "22:30" },
  { day: "Mercredi", index: 3, open: "11:30", close: "14:00", open2: "18:00", close2: "22:30" },
  { day: "Jeudi", index: 4, open: "11:30", close: "14:00", open2: "18:00", close2: "22:30" },
  { day: "Vendredi", index: 5, open: "11:30", close: "14:00", open2: "18:00", close2: "23:00" },
  { day: "Samedi", index: 6, open: "18:00", close: "23:00", open2: null, close2: null },
  { day: "Dimanche", index: 0, open: "18:00", close: "22:30", open2: null, close2: null },
];

export const pizzas = [
  {
    id: "cannibale",
    name: "Cannibale",
    base: "Sauce barbecue",
    ingredients: ["mozzarella", "merguez", "bœuf", "poulet rôti"],
    price: 12.5,
    tags: ["spicy", "viande"],
  },
  {
    id: "indiana",
    name: "Indiana",
    base: "Crème fraîche",
    ingredients: ["mozzarella", "emmental", "poulet rôti", "oignons", "champignons"],
    price: 12.5,
    tags: ["crème", "viande"],
  },
  {
    id: "kabana",
    name: "Kabana",
    base: "Sauce tomate",
    ingredients: [
      "mozzarella",
      "peppéroni",
      "oignons",
      "poivrons",
      "olives",
      "champignons",
      "viande hachée",
      "emmental",
    ],
    price: 13.5,
    tags: ["signature", "viande"],
    signature: true,
  },
  {
    id: "chevre-miel",
    name: "Chèvre miel",
    base: "Crème fraîche",
    ingredients: ["mozzarella", "fromage de chèvre", "miel"],
    price: 11.5,
    tags: ["crème", "végé"],
  },
  {
    id: "margarita",
    name: "Margarita",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "olives noires", "origan"],
    price: 9.5,
    tags: ["tomate", "végé"],
  },
  {
    id: "reine",
    name: "Reine",
    base: "Sauce tomate",
    ingredients: ["mozzarella", "jambon", "champignons"],
    price: 11.0,
    tags: ["tomate", "viande"],
  },
];

export const drinks = [
  { name: "Canette 33 cl (Coca, Fanta…)", price: 1.5 },
  { name: "Bouteille de soda", price: 3.0 },
  { name: "Red Bull 25 cl", price: 2.5 },
  { name: "Oasis 2 L", price: 3.5 },
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
  crème: "Base crème",
  tomate: "Base tomate",
  végé: "Végé",
  signature: "Signature",
};
