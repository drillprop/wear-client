import convertSizesToObject, { SizeElem } from './convertSizesToObject';

it('convert empty array to object', () => {
  expect(convertSizesToObject([])).toStrictEqual({
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
  });
});

it('convert array with sizes to object', () => {
  const mockArray: SizeElem[] = [
    {
      quantity: 20,
      sizeSymbol: 'S',
    },
    {
      quantity: 44,
      sizeSymbol: 'M',
    },
    {
      quantity: 30,
      sizeSymbol: 'L',
    },
    {
      quantity: 11,
      sizeSymbol: 'XXL',
    },
  ];
  expect(convertSizesToObject(mockArray)).toStrictEqual({
    XS: 0,
    S: 20,
    M: 44,
    L: 30,
    XL: 0,
    XXL: 11,
  });
});
