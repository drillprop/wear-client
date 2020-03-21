import { ICartItem } from './CartContext';

export const addItem = (
  items: ICartItem[],
  itemToAdd: ICartItem
): ICartItem[] => {
  const existingItemIdx = items.findIndex(
    item => item.id === itemToAdd.id && item.size === itemToAdd.size
  );

  if (existingItemIdx >= 0) {
    const [splicedItem] = items.splice(existingItemIdx, 1);
    splicedItem.quantity = splicedItem.quantity + 1;
    items.unshift(splicedItem);
    return items;
  }
  return [{ ...itemToAdd, quantity: 1 }, ...items];
};

export const getCartTotals = (items: ICartItem[]) => {
  if (!items) return { total: 0, totalPrice: 0 };
  return items.reduce(
    (acc, item) => {
      acc.total = acc.total + item.quantity;
      acc.totalPrice = acc.totalPrice + item.price * item.quantity;
      return acc;
    },
    { total: 0, totalPrice: 0 }
  );
};
