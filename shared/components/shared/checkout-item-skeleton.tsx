import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Skeleton } from '../ui';

interface Props {
  className?: string;
}

export const CheckoutItemSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-between ', className)}>
      <div className="flex items-center gap-5 flex-1">
        <Skeleton className="w-[60px] h-[60px] rounded-full" />
        <div className="flex w-2/4 flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        <div className="flex flex-1">
          <Skeleton className="h-6 w-14 ml-3" />

          <Skeleton className="h-7 w-24 ml-[74px]" />
        </div>
      </div>
    </div>
  );
};
