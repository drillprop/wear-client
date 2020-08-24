import {
  addItem,
  incItem,
  decrItem,
  getCartTotals,
  removeItem,
} from './CartContext.utils';
import { ICartItem } from './CartContext';

const mockNewItem: ICartItem = {
  id: '123',
  imageUrl: 'http://example.com/image.jpg',
  name: 'some nice trousers',
  price: 432,
  quantity: 1,
  size: 'XS',
};

describe('addItem', () => {
  it('correctly add one item to empty cart', () => {
    const mockPrevCart: ICartItem[] = [];
    expect(addItem(mockPrevCart, mockNewItem)).toStrictEqual([mockNewItem]);
  });

  it('correctly increase quantity of an item in cart, if item in cart already exists', () => {
    const mockPrevCart: ICartItem[] = [
      {
        id: '123',
        imageUrl: 'http://example.com/image.jpg',
        name: 'some nice trousers',
        price: 432,
        quantity: 1,
        size: 'XS',
      },
    ];
    expect(addItem(mockPrevCart, mockNewItem)).toStrictEqual([
      {
        id: '123',
        imageUrl: 'http://example.com/image.jpg',
        name: 'some nice trousers',
        price: 432,
        quantity: 2,
        size: 'XS',
      },
    ]);
  });
  it('correctly add an item to cart when the cart is not empty and set new item at the beginning of an array', () => {
    const mockPrevCart: ICartItem[] = [
      {
        id: '12322',
        imageUrl: 'http://example.com/image.jpg',
        name: 'gray t-shirt',
        price: 22,
        quantity: 1,
        size: 'M',
      },
    ];

    expect(addItem(mockPrevCart, mockNewItem)).toStrictEqual([
      {
        id: '123',
        imageUrl: 'http://example.com/image.jpg',
        name: 'some nice trousers',
        price: 432,
        quantity: 1,
        size: 'XS',
      },
      {
        id: '12322',
        imageUrl: 'http://example.com/image.jpg',
        name: 'gray t-shirt',
        price: 22,
        quantity: 1,
        size: 'M',
      },
    ]);
  });
});

describe('incItem', () => {
  it('increment item quantity in cart', () => {
    const mockPrevCart: ICartItem[] = [
      {
        id: '12322',
        imageUrl: 'http://example.com/image.jpg',
        name: 'gray t-shirt',
        price: 22,
        quantity: 1,
        size: 'M',
      },
      {
        id: '123',
        imageUrl: 'http://example.com/image.jpg',
        name: 'some nice trousers',
        price: 432,
        quantity: 1,
        size: 'XS',
      },
    ];
    expect(incItem(mockPrevCart, mockNewItem)).toStrictEqual([
      {
        id: '12322',
        imageUrl: 'http://example.com/image.jpg',
        name: 'gray t-shirt',
        price: 22,
        quantity: 1,
        size: 'M',
      },
      {
        id: '123',
        imageUrl: 'http://example.com/image.jpg',
        name: 'some nice trousers',
        price: 432,
        quantity: 2,
        size: 'XS',
      },
    ]);
  });
});

describe('decrItem', () => {
  it('decrease item quantity in cart', () => {
    const mockPrevCart: ICartItem[] = [
      {
        id: '12322',
        imageUrl: 'http://example.com/image.jpg',
        name: 'gray t-shirt',
        price: 22,
        quantity: 1,
        size: 'M',
      },
      {
        id: '123',
        imageUrl: 'http://example.com/image.jpg',
        name: 'some nice trousers',
        price: 432,
        quantity: 2,
        size: 'XS',
      },
    ];
    expect(decrItem(mockPrevCart, mockNewItem)).toStrictEqual([
      {
        id: '12322',
        imageUrl: 'http://example.com/image.jpg',
        name: 'gray t-shirt',
        price: 22,
        quantity: 1,
        size: 'M',
      },
      {
        id: '123',
        imageUrl: 'http://example.com/image.jpg',
        name: 'some nice trousers',
        price: 432,
        quantity: 1,
        size: 'XS',
      },
    ]);
  });

  it('removes item from cart if quantity of the item is equal 1', () => {
    const mockPrevCart: ICartItem[] = [
      {
        id: '12322',
        imageUrl: 'http://example.com/image.jpg',
        name: 'gray t-shirt',
        price: 22,
        quantity: 1,
        size: 'M',
      },
      {
        id: '123',
        imageUrl: 'http://example.com/image.jpg',
        name: 'some nice trousers',
        price: 432,
        quantity: 1,
        size: 'XS',
      },
    ];
    expect(decrItem(mockPrevCart, mockNewItem)).toHaveLength(1);
    expect(decrItem(mockPrevCart, mockNewItem)).toStrictEqual([
      {
        id: '12322',
        imageUrl: 'http://example.com/image.jpg',
        name: 'gray t-shirt',
        price: 22,
        quantity: 1,
        size: 'M',
      },
    ]);
  });
});
