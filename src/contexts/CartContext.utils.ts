import { CartItem } from './CartContext';

export const addItem = (items: CartItem[], itemToAdd: CartItem): CartItem[] => {
  const isCartExist = items.findIndex(
    item => item.id === itemToAdd.id && item.size === itemToAdd.size
  );

  if (isCartExist >= 0) {
    const [splicedItem] = items.splice(isCartExist, 1);
    splicedItem.quantity = splicedItem.quantity + 1;
    items.unshift(splicedItem);
    return items;
  }
  return [{ ...itemToAdd, quantity: 1 }, ...items];
};
