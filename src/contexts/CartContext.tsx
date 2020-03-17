import React, { createContext, useContext, useState } from 'react';
import { SizeSymbol } from '../generated/types';

export interface CartItem {
  size?: keyof typeof SizeSymbol | '';
  name: string;
  price: number;
  imageUrl: string;
}

export const CartContext = createContext<{
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}>({
  cartItems: [],
  setCartItems: () => []
});

const CartContextProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  return { ...ctx };
};

export default CartContextProvider;
