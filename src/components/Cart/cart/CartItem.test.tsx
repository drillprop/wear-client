import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import CartContextProvider, {
  CartContext,
  ICartItem,
} from '../../../contexts/CartContext';
import CartItem from './CartItem';

const mockItem: ICartItem = {
  id: '123',
  imageUrl: 'www.imageUrl.com/imageurl.png',
  name: 'some nice item',
  price: 58,
  quantity: 2,
  size: 'XS',
};

it('throw error if CartItem is not inside CartProvider', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => render(<CartItem item={mockItem} />)).toThrowError(
    'useCart must be used within a CartProvider'
  );
});

it(`doesn't throw error if CartItem is within CartContextProvider`, () => {
  const wrapper = (
    <CartContextProvider>
      <CartItem item={mockItem} />
    </CartContextProvider>
  );

  expect(() => render(wrapper)).not.toThrow();
});

it('calls context methods', () => {
  const incItemInCart = jest.fn();
  const decrItemInCart = jest.fn();
  const removeItemFromCart = jest.fn();

  const { getByTestId } = render(
    <CartContext.Provider
      value={{
        addItemToCart: jest.fn(),
        cartItems: [],
        cartVisible: false,
        decrItemInCart,
        removeItemFromCart,
        incItemInCart,
        toggleCartVisible: jest.fn(),
        totals: {
          total: 0,
          totalPrice: 0,
        },
      }}
    >
      <CartItem item={mockItem} />
    </CartContext.Provider>
  );
  const increaseButton = getByTestId('increase');
  fireEvent.click(increaseButton);
  expect(incItemInCart).toBeCalledTimes(1);

  const decreaseButton = getByTestId('decrease');
  fireEvent.click(decreaseButton);
  expect(decrItemInCart).toBeCalledTimes(1);

  const removeButton = getByTestId('remove');
  fireEvent.click(removeButton);
  expect(decrItemInCart).toBeCalledTimes(1);
});

it('calculate price of item correctly', () => {
  const { getByTestId } = render(
    <CartContextProvider>
      <CartItem item={mockItem} />
    </CartContextProvider>
  );
  expect(getByTestId('item-price')).toHaveTextContent('$ 116');
});
