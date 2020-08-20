import { SizeSymbol } from '../generated/types';
import { SizesArr } from './constants';

interface Size {
  quantity?: number | null;
  sizeSymbol?: SizeSymbol | null;
}

const convertSizesToObject = (sizesArr?: Size[] | null) => {
  const sizesObject = SizesArr.reduce((acc: any, size) => {
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

export default convertSizesToObject;
