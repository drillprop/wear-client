import simplifyOrderedItems, { OrderedItems } from './simplifyOrderedItems';

it('return empty array if empty array is passed', () => {
  expect(simplifyOrderedItems([])).toStrictEqual([]);
});

it('convert one order item with nested item to array with one item', () => {
  const mockOrder: OrderedItems = [
    {
      id: 'ecbe03b4-a7d2-4f34-82af-203a9a2c9c17',
      sizeSymbol: 'XS',
      item: {
        gender: 'WOMAN',
        id: 'a748ff48-a9db-47b1-aab5-93a23e9f50ec',
        name: 'floral long sleeve dress',
        price: 289,
      },
    },
  ];
  expect(simplifyOrderedItems(mockOrder)).toStrictEqual([
    {
      id: 'a748ff48-a9db-47b1-aab5-93a23e9f50ec',
      sizeSymbol: 'XS',
      name: 'floral long sleeve dress',
      price: 289,
      quantity: 1,
      gender: 'WOMAN',
    },
  ]);
});

it('convert ordered items with nested item to simplified array', () => {
  const mockOrder: OrderedItems = [
    {
      id: 'ecbe03b4-a7d2-4f34-82af-203a9a2c9c17',
      sizeSymbol: 'XS',
      item: {
        gender: 'WOMAN',
        id: 'a748ff48-a9db-47b1-aab5-93a23e9f50ec',
        name: 'floral long sleeve dress',
        price: 289,
      },
    },
    {
      id: 'd267c589-06a6-4208-bc86-6eb96ddc5137',
      sizeSymbol: 'M',
      item: {
        gender: 'WOMAN',
        id: '6902a63d-31f3-4480-9b14-e3b1bac9ceef',
        name: 'long white dress',
        price: 123,
      },
    },
    {
      id: '0c1eef90-c9c3-44d9-9d22-3e3a688a161b',
      sizeSymbol: 'S',
      item: {
        gender: 'WOMAN',
        id: '6902a63d-31f3-4480-9b14-e3b1bac9ceef',
        name: 'long white dress',
        price: 123,
      },
    },
    {
      id: '57153570-625a-4fcd-a470-e23632d31233',
      sizeSymbol: 'M',
      item: {
        gender: 'WOMAN',
        id: '6902a63d-31f3-4480-9b14-e3b1bac9ceef',
        name: 'long white dress',
        price: 123,
      },
    },
  ];
  const result = [
    {
      id: 'a748ff48-a9db-47b1-aab5-93a23e9f50ec',
      sizeSymbol: 'XS',
      name: 'floral long sleeve dress',
      price: 289,
      quantity: 1,
      gender: 'WOMAN',
    },
    {
      id: '6902a63d-31f3-4480-9b14-e3b1bac9ceef',
      sizeSymbol: 'M',
      name: 'long white dress',
      price: 123,
      quantity: 2,
      gender: 'WOMAN',
    },
    {
      id: '6902a63d-31f3-4480-9b14-e3b1bac9ceef',
      sizeSymbol: 'S',
      name: 'long white dress',
      price: 123,
      quantity: 1,
      gender: 'WOMAN',
    },
  ];
  expect(simplifyOrderedItems(mockOrder)).toStrictEqual(result);
});
