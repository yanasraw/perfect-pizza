import React from 'react';
import { cn } from '@/shared/lib/utils';
import { WhiteBlock } from '../white-block';
import { FormInput, FormTextarea } from '../form';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Delivery address" className={cn('', className)}>
      <div className="flex flex-col gap-5">
        <FormInput name="address" className="text-base" placeholder="Delivery address" />
        <FormTextarea name="comment" className="text-base" placeholder="Comment to the order" rows={5} />
      </div>
    </WhiteBlock>
  );
};