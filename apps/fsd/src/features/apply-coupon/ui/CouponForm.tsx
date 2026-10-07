import React, { useState } from 'react';
import { Input, Button } from '../../../shared/ui';
import { applyCoupon } from '../model/applyCoupon';

interface Props {
  onApply: (discount: number) => void;
}

export const CouponForm: React.FC<Props> = ({ onApply }) => {
  const [code, setCode] = useState('');

  const handleSubmit = async () => {
    const discount = await applyCoupon(code);
    onApply(discount);
  };

  return (
    <div>
      <Input value={code} onChange={e => setCode(e.target.value)} placeholder="Coupon code" />
      <Button onClick={handleSubmit}>Apply</Button>
    </div>
  );
};
