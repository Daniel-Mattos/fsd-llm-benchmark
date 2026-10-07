import React from 'react';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CouponInput } from './components/CouponInput';

export const App: React.FC = () => {
  const { products } = useProducts();
  const { cart, addToCart, applyDiscount } = useCart();

  return (
    <div>
      <h1>Product Catalog</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
        <div style={{ width: 300 }}>
          <CartDrawer cart={cart} />
          <CouponInput onApply={applyDiscount} />
        </div>
      </div>
    </div>
  );
};

export default App;
