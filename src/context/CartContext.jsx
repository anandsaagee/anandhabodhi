import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

// Helper: get price for a product (handles frameVariants, posterVariants, or plain price)
function getProductBasePrice(product) {
  if (product.frameVariants && product.frameVariants.length > 0) {
    return product.frameVariants[0].price;
  }
  if (product.posterVariants && product.posterVariants.length > 0) {
    return product.posterVariants[0].price;
  }
  return product.price || 0;
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variant, quantity = 1 } = action.payload;
      const key = `${product.id}__${variant || 'default'}`;
      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      // Determine unit price based on variant selection
      let unitPrice = getProductBasePrice(product);
      if (variant && product.frameVariants) {
        const fv = product.frameVariants.find((v) => v.size === variant);
        if (fv) unitPrice = fv.price;
      }
      if (variant && product.posterVariants) {
        const pv = product.posterVariants.find((v) => v.size === variant);
        if (pv) unitPrice = pv.price;
      }
      return {
        ...state,
        items: [
          ...state.items,
          { key, product, variant, quantity, unitPrice },
        ],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((i) => i.key !== action.payload.key),
      };
    }
    case 'UPDATE_QTY': {
      const { key, quantity } = action.payload;
      if (quantity < 1) {
        return {
          ...state,
          items: state.items.filter((i) => i.key !== key),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === key ? { ...i, quantity } : i
        ),
      };
    }
    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

const STORAGE_KEY = 'ab_cart_v1';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return { items: [] };
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }, [state]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ items: state.items, totalItems, totalPrice, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
