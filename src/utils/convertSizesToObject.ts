import { SizeSymbol } from '../generated/types';

interface Size {
  quantity?: number | null;
  sizeSymbol?: SizeSymbol | null;
}

export default (sizesArr?: Size[] | null) => {
  const sizesObject = Object.values(SizeSymbol).reduce((acc: any, size) => {
    acc[size] = 0;
    return acc;
  }, {});
  if (sizesArr?.length) {
    sizesArr.map((size: any) => {
      sizesObject[size.sizeSymbol] = size.quantity;
    });
  }
  return sizesObject;
};
