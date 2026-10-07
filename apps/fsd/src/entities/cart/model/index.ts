// @steiger-disable-next-line fsd/forbidden-imports
import type { Product } from '../../product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  discount: number;
}
