import React from 'react';
import { render } from '@testing-library/react';
import Cart from './Cart';
import CartContextProvider from '../../contexts/CartContext';

it('throw error if there is no CartProvider', () => {
  // dont log console.error for this particular test
  jest.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => render(<Cart />)).toThrowError(
    'useCart must be used within a CartProvider'
  );
});

it(`doesn't throw error if Cart is within CartContextProvider`, () => {
  const wrapper = (
    <CartContextProvider>
      <Cart />
    </CartContextProvider>
  );

  expect(() => render(wrapper)).not.toThrow();
});
