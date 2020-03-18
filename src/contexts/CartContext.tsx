import React, { createContext, useContext, useState } from 'react';
import { SizeSymbol } from '../generated/types';
import { addItem } from './CartContext.utils';

export interface CartItem {
  id: string;
  size?: keyof typeof SizeSymbol | '';
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export const CartContext = createContext<{
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  cartVisible: boolean;
  toggleCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  cartItems: [],
  addItemToCart: (_: CartItem) => [],
  cartVisible: true,
  toggleCartVisible: () => {}
});

const CartContextProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartVisible, toggleCartVisible] = useState(false);

  const addItemToCart = (item: CartItem) =>
    setCartItems(addItem(cartItems, item));

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, cartVisible, toggleCartVisible }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  return { ...ctx };
};

export default CartContextProvider;
