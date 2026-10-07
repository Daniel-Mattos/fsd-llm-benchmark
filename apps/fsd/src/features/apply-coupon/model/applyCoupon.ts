import { calculateDiscountMock } from '../../../shared/api';

export const applyCoupon = async (code: string) => {
  return await calculateDiscountMock(code);
};
