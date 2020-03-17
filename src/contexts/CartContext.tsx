import React, { createContext, useState } from 'react';

interface Context {
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<never[]>>;
}

export const CartContext = createContext<Context>({
  cartItems: [],
  setCartItems: () => []
});

const CartContextProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
