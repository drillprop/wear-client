import { render } from '@testing-library/react';
import React from 'react';
import CartContextProvider from '../../contexts/CartContext';
import Cart from './Cart';
import { cartContextRender } from '../../test-utils/cartContextRender';

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

it('renders info about empty cart if cartItems is empty', () => {
  const { getByText, debug } = cartContextRender(<Cart />, {
    store: {
      cartItems: [],
      totals: {},
    },
  });
  expect(getByText('Your Cart is empty')).toBeInTheDocument();
});
