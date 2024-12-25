import { cn } from '@/shared/lib/utils';
import { CircleCheck } from 'lucide-react';
import React from 'react';
interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: VoidFunction;
  classname?: string;
}

export const IngredientItem: React.FC<Props> = ({ imageUrl, name, price, active, onClick, classname }) => {
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white border border-transparent transition-all duration-300',
        { 'border border-primary': active },
        classname
      )}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <img src={imageUrl} width={110} height={110} alt={name} />
      <span className="text-sx mb-1 min-h-[50px]">{name}</span>
      <span className="font-bold">{price} $</span>
    </div>
  );
};
