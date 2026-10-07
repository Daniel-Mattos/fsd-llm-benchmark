export const calculateDiscount = async (code: string): Promise<number> => {
  if (code === 'PROMO10') return 10;
  if (code === 'PROMO20') return 20;
  return 0;
};
