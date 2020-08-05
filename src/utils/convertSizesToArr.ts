import { SizeSymbol } from '../generated/types';

const convertSizesToArr = (sizeObj: any) => {
  return Object.values(SizeSymbol)
    .map(
      (sizeSymbol) =>
        sizeObj[sizeSymbol] >= 0 && {
          sizeSymbol,
          quantity: parseInt(sizeObj[sizeSymbol]),
        }
    )
    .filter(Boolean);
};

export default convertSizesToArr;
