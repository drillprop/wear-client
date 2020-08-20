import { SizeSymbol } from '../generated/types';
import { SizesArr } from './constants';

export interface SizeElem {
  quantity?: number | null;
  sizeSymbol?: SizeSymbol | null;
}

export type SizesObject = {
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
};

const convertSizesToObject = (sizesArr: SizeElem[]) => {
  return SizesArr.reduce((acc: Partial<SizesObject>, size) => {
    const givenSize = sizesArr.find((s) => s.sizeSymbol === size);
    acc[givenSize?.sizeSymbol || size] = givenSize?.quantity || 0;
    return acc;
  }, {});
};

export default convertSizesToObject;
