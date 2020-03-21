import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SizeSymbol } from '../generated/types';
import { addItem, getCartTotals, incItem } from './CartContext.utils';

export interface ICartItem {
  id: string;
  size?: keyof typeof SizeSymbol | '';
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface ICartContext {
  cartItems: ICartItem[];
  addItemToCart: (item: ICartItem) => void;
  incItemInCart: (item: ICartItem) => void;
  cartVisible: boolean;
  toggleCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
  totals: {
    total: number;
    totalPrice: number;
  };
}

export const CartContext = createContext<ICartContext>({
  cartItems: [],
  addItemToCart: (_: ICartItem) => [],
  incItemInCart: (_: ICartItem) => [],
  cartVisible: true,
  toggleCartVisible: () => {},
  totals: {
    total: 0,
    totalPrice: 0
  }
});

const CartContextProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cartVisible, toggleCartVisible] = useState(false);
  const [totals, countTotals] = useState({
    total: 0,
    totalPrice: 0
  });

  useEffect(() => {
    setCartItems(prevState => [...prevState, ...Cookies.getJSON('cartItems')]);
  }, []);

  useEffect(() => {
    countTotals(getCartTotals(cartItems));
    Cookies.set('cartItems', cartItems);
  }, [JSON.stringify(cartItems)]);

  const addItemToCart = (item: ICartItem) => {
    setCartItems(addItem(cartItems, item));
  };

  const incItemInCart = (item: ICartItem) =>
    setCartItems(incItem(cartItems, item));

  return (
    <CartContext.Provider
      value={{
        cartVisible,
        toggleCartVisible,
        cartItems,
        addItemToCart,
        incItemInCart,
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
