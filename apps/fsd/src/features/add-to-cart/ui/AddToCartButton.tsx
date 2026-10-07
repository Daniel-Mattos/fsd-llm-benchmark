import React from 'react';
import { Button } from '../../../shared/ui';
import { Product } from '../../../entities/product';

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export const AddToCartButton: React.FC<Props> = ({ product, onAdd }) => {
  return <Button onClick={() => onAdd(product)}>Add to Cart</Button>;
};
