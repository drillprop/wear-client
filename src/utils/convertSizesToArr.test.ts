import convertSizesToArr from './convertSizesToArr';

it('convert object with sizes to array', () => {
  const mockSizes = {
    XS: 123,
    S: 0,
    M: 11,
    L: 30,
    XL: 44,
    XXL: 0,
  };
  expect(convertSizesToArr(mockSizes)).toStrictEqual([
    { sizeSymbol: 'XS', quantity: 123 },
    { sizeSymbol: 'S', quantity: 0 },
    { sizeSymbol: 'M', quantity: 11 },
    { sizeSymbol: 'L', quantity: 30 },
    { sizeSymbol: 'XL', quantity: 44 },
    { sizeSymbol: 'XXL', quantity: 0 },
  ]);
});
