import React from 'react';
import { cn } from '@/shared/lib/utils';
import { WhiteBlock } from './white-block';
import { DashedDetails } from './dashed-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';

interface Props {
  loading?: boolean;
  totalAmount: number;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ className, loading, totalAmount }) => {
  const VAT = 4;
  const DELIVERY_PRICE = 125;
  const vatPrice = (totalAmount * VAT) / 100;
  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Total:</span>
        {loading ? (
          <Skeleton className="w-48 h-11" />
        ) : (
          <span className="h-11 text-3xl font-extrabold">{totalAmount + DELIVERY_PRICE + vatPrice} $</span>
        )}
      </div>

      <DashedDetails
        description="Total cart price"
        price={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : totalAmount}
        beforeAdornment={<Package size={18} className="text-gray-300" />}
      />
      <DashedDetails
        description="Taxes"
        price={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : vatPrice}
        beforeAdornment={<Percent size={18} className="text-gray-300" />}
      />
      <DashedDetails
        description="Delivery"
        price={loading ? <Skeleton className="w-16 h-6 rounded-[6px]" /> : DELIVERY_PRICE}
        beforeAdornment={<Truck size={18} className="text-gray-300" />}
      />

      <Button loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Go to payment
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
