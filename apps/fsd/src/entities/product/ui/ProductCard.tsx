import React from 'react';
import { Product } from '../model/types';

interface Props {
  product: Product;
  actionSlot?: React.ReactNode;
}

export const ProductCard: React.FC<Props> = ({ product, actionSlot }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      {actionSlot}
    </div>
  );
};
