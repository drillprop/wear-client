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
  totals: {
    total: number;
    totalPrice: number;
  };
}>({
  cartItems: [],
  addItemToCart: (_: CartItem) => [],
  cartVisible: true,
  toggleCartVisible: () => {},
  totals: {
    total: 0,
    totalPrice: 0
  }
});

const CartContextProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartVisible, toggleCartVisible] = useState(false);
  const [totals, incTotals] = useState({
    total: 0,
    totalPrice: 0
  });
  const addItemToCart = (item: CartItem) => {
    incTotals(({ total, totalPrice }) => ({
      total: total + 1,
      totalPrice: totalPrice + item.price
    }));
    setCartItems(addItem(cartItems, item));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        cartVisible,
        toggleCartVisible,
        totals
      }}
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
