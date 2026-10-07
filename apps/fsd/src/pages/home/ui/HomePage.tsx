import React, { useEffect, useState } from 'react';
import { fetchProductsMock } from '../../../shared/api';
import { Product, ProductCard } from '../../../entities/product';
import { CartState } from '../../../entities/cart';
import { AddToCartButton } from '../../../features/add-to-cart';
import { CouponForm } from '../../../features/apply-coupon';
import { CartDrawer } from '../../../widgets/cart-drawer';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartState>({ items: [], discount: 0 });

  useEffect(() => {
    fetchProductsMock().then(setProducts);
  }, []);

  const handleAddToCart = (product: Product) => {
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

  const handleApplyDiscount = (discount: number) => {
    setCart(prev => ({ ...prev, discount }));
  };

  return (
    <div>
      <h1>Product Catalog</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              actionSlot={<AddToCartButton product={product} onAdd={handleAddToCart} />}
            />
          ))}
        </div>
        <div style={{ width: 300 }}>
          <CartDrawer
            cart={cart}
            couponSlot={<CouponForm onApply={handleApplyDiscount} />}
          />
        </div>
      </div>
    </div>
  );
};
