import React, { useState } from 'react';
import { calculateDiscount } from '../services/discountService';

interface Props {
  onApply: (discount: number) => void;
}

export const CouponInput: React.FC<Props> = ({ onApply }) => {
  const [code, setCode] = useState('');

  const handleApply = async () => {
    const discount = await calculateDiscount(code);
    onApply(discount);
  };

  return (
    <div>
      <input value={code} onChange={e => setCode(e.target.value)} placeholder="Coupon code" />
      <button onClick={handleApply}>Apply</button>
    </div>
  );
};
