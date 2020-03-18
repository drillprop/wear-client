import { CartItem } from './CartContext';

export const addItem = (items: CartItem[], itemToAdd: CartItem): CartItem[] => {
  const isCartExist = items.find(
    item => item.id === itemToAdd.id && item.size === itemToAdd.size
  );

  if (isCartExist) {
    return items.map(item =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...items, { ...itemToAdd, quantity: 1 }];
};
