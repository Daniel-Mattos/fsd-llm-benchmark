import { useState } from 'react';
import { Product } from '../types/product';
import { CartState } from '../types/cart';

export const useCart = () => {
  const [cart, setCart] = useState<CartState>({ items: [], discount: 0 });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.items.find(item => item.product.id === product.id);
      if (existing) {
        return {
          ...prev,
          items: prev.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return { ...prev, items: [...prev.items, { product, quantity: 1 }] };
    });
  };

  const applyDiscount = (discount: number) => {
    setCart(prev => ({ ...prev, discount }));
  };

  return { cart, addToCart, applyDiscount };
};
