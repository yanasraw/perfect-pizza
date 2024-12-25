import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';
interface Props {
  name: string;
  imageUrl: string;
  price: number;
  id: number;
  ingredients: Ingredient[];
  classname?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, imageUrl, price, ingredients, classname }) => {
  return (
    <div className={cn('', classname)}>
      <Link href={`/product/${id}`} scroll={false}>
        <div
          className={cn('flex justify-center p-6 bg-secondary rounded-lg h-[260px]', {
            'bg-white': id === 1 || id === 2,
          })}
        >
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">{ingredients.map((ingredient) => ingredient.name).join(', ')}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            From <b>{price} $</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus className="mr-1" size={20} />
            Add to cart
          </Button>
        </div>
      </Link>
    </div>
  );
};
