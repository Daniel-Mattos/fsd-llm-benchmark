import React from 'react';
import { CartState } from '../../../entities/cart';

interface Props {
  cart: CartState;
  couponSlot?: React.ReactNode;
}

export const CartDrawer: React.FC<Props> = ({ cart, couponSlot }) => {
  const subtotal = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal - cart.discount;

  return (
    <div>
      <h2>Cart</h2>
      {cart.items.map(item => (
        <div key={item.product.id}>
          {item.product.name} x {item.quantity}
        </div>
      ))}
      <p>Discount: ${cart.discount}</p>
      <p>Total: ${total}</p>
      {couponSlot}
    </div>
  );
};
