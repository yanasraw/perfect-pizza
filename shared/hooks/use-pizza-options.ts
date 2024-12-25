import React from 'react';
import { Variant } from '../components/shared/group-variants';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '../lib';
import { ProductItem } from '@prisma/client';

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const availableSizes = getAvailablePizzaSizes(items, type);

  const currentItemId = items.find((item) => item.size === size && item.pizzaType === type)?.id;

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  React.useEffect(() => {
    const prevSelectedSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled);
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!prevSelectedSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
