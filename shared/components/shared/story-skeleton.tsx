import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Skeleton } from '../ui';

interface Props {
  className?: string;
}

export const StorySkeleton: React.FC<Props> = ({ className }) => {
  return <Skeleton className="w-[222px] h-[300px] rounded-sm" />;
};
