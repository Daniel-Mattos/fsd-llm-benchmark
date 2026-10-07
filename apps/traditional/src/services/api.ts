import { Product } from '../types/product';

export const fetchProducts = async (): Promise<Product[]> => {
  return [
    { id: '1', name: 'Product A', price: 100 },
    { id: '2', name: 'Product B', price: 200 }
  ];
};
