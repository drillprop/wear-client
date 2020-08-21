import { SizesArr } from './constants';

type SizesObject = {
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
};

const convertSizesToArr = (sizeObj: SizesObject) => {
  return SizesArr.map(
    (sizeSymbol) =>
      sizeObj[sizeSymbol] >= 0 && {
        sizeSymbol,
        quantity: sizeObj[sizeSymbol],
      }
  );
};

export default convertSizesToArr;
