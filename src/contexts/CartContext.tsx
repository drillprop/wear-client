import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SizeSymbol } from '../generated/types';
import {
  addItem,
  getCartTotals,
  incItem,
  decrItem,
  removeItem,
} from './CartContext.utils';

export interface ICartItem {
  id: string;
  size?: keyof typeof SizeSymbol | '';
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface Cart {
  cartItems: ICartItem[];
  addItemToCart: (item: ICartItem) => void;
  removeItemFromCart: (item: ICartItem) => void;
  incItemInCart: (item: ICartItem) => void;
  decrItemInCart: (item: ICartItem) => void;
  cartVisible: boolean;
  toggleCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
  totals: {
    total: number;
    totalPrice: number;
  };
}

export const CartContext = createContext<Cart | undefined>(undefined);

const CartContextProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cartVisible, toggleCartVisible] = useState(false);
  const [totals, countTotals] = useState({
    total: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    setCartItems((prevState) => [
      ...prevState,
      ...Cookies.getJSON('cartItems'),
    ]);
  }, []);

  useEffect(() => {
    countTotals(getCartTotals(cartItems));
    Cookies.set('cartItems', cartItems);
  }, [JSON.stringify(cartItems)]);

  const addItemToCart = (item: ICartItem) => {
    setCartItems(addItem(cartItems, item));
  };

  const removeItemFromCart = (item: ICartItem) => {
    setCartItems(removeItem(cartItems, item));
  };

  const incItemInCart = (item: ICartItem) =>
    setCartItems(incItem(cartItems, item));

  const decrItemInCart = (item: ICartItem) =>
    setCartItems(decrItem(cartItems, item));

  return (
    <CartContext.Provider
      value={{
        cartVisible,
        toggleCartVisible,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        incItemInCart,
        decrItemInCart,
        totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (ctx === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
};

export default CartContextProvider;
