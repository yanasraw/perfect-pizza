import React from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
  text: string;
  className?: string;
}

export const ErrorText: React.FC<Props> = ({ className, text }) => {
  return <div className={cn('text-red-500 text-sm', className)}>{text}</div>;
};
