import React from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string;
  price?: React.ReactNode;
  description?: string;
  beforeAdornment?: React.ReactNode;
}

export const DashedDetails: React.FC<Props> = ({ description, price, className, beforeAdornment }) => {
  return (
    <div className={cn('flex my-4 items-center', className)}>
      {beforeAdornment}
      <span className="flex flex-1 text-lg text-neutral-500 ml-3">
        {description}
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>
      <span className="font-bold text-lg flex">{price} $</span>
    </div>
  );
};
