import React, { createContext, useState } from 'react';
import { SizeSymbol } from '../generated/types';

export interface CartItem {
  size: SizeSymbol;
  name: string;
  price: number;
  imageUrl: string;
}

export const CartContext = createContext<any>({
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

export default CartContextProvider;
