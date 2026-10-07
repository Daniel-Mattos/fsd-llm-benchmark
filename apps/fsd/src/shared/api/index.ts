export const fetchProductsMock = async () => {
  return [
    { id: '1', name: 'Product A', price: 100 },
    { id: '2', name: 'Product B', price: 200 }
  ];
};

export const calculateDiscountMock = async (code: string): Promise<number> => {
  if (code === 'PROMO10') return 10;
  if (code === 'PROMO20') return 20;
  return 0;
};
