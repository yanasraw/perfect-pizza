import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Categories, Container, SortPopup } from '.';
import { Category } from '@prisma/client';

interface Props {
  classname?: string;
  categories: Category[];
}

export const TopBar: React.FC<Props> = ({ categories, classname }) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-20 ', classname)}>
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
