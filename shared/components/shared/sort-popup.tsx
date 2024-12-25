import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface Props {
  classname?: string;
}

export const SortPopup: React.FC<Props> = ({ classname }) => {
  return (
    <div
      className={cn('inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer', classname)}
    >
      <ArrowUpDown size={16} />
      <b>Sort:</b>
      <b className="text-primary">tranding</b>
    </div>
  );
};
