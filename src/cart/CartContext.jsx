import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "kabana-cart";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* stockage indisponible */
  }
  return { items: [], open: false };
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      // clé unique par produit (id seul ici, pas de variantes)
      const existing = state.items.find((i) => i.id === action.item.id);
      let items;
      if (existing) {
        items = state.items.map((i) =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        items = [...state.items, { ...action.item, qty: 1 }];
      }
      return { ...state, items, open: true };
    }
    case "INC":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: i.qty + 1 } : i
        ),
      };
    case "DEC":
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0),
      };
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN":
      return { ...state, open: true };
    case "CLOSE":
      return { ...state, open: false };
    case "TOGGLE":
      return { ...state, open: !state.open };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items: state.items, open: false })
      );
    } catch {
      /* stockage indisponible : on ignore */
    }
  }, [state.items]);

  const count = state.items.reduce((n, i) => n + i.qty, 0);
  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  const value = {
    items: state.items,
    open: state.open,
    count,
    total,
    add: (item) => dispatch({ type: "ADD", item }),
    inc: (id) => dispatch({ type: "INC", id }),
    dec: (id) => dispatch({ type: "DEC", id }),
    remove: (id) => dispatch({ type: "REMOVE", id }),
    clear: () => dispatch({ type: "CLEAR" }),
    openCart: () => dispatch({ type: "OPEN" }),
    closeCart: () => dispatch({ type: "CLOSE" }),
    toggleCart: () => dispatch({ type: "TOGGLE" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans CartProvider");
  return ctx;
}
