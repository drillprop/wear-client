import { Item, Ordered_Item, SizeSymbol, Gender } from '../generated/types';

export type OrderedItems = Array<
  Pick<Ordered_Item, 'id' | 'sizeSymbol'> & {
    item: Pick<Item, 'name' | 'price' | 'id' | 'gender'>;
  }
>;

type ConvertedItem = {
  id: string;
  sizeSymbol: SizeSymbol;
  name: string;
  price: number;
  quantity: number;
  gender: Gender;
};

const simplifyOrderedItems = (orderedItems: OrderedItems) =>
  orderedItems?.reduce((acc: ConvertedItem[], orderItem) => {
    const existingItem = acc.find(
      ({ sizeSymbol, id }) =>
        sizeSymbol === orderItem.sizeSymbol && id === orderItem.item.id
    );
    if (!existingItem) {
      return [
        ...acc,
        {
          sizeSymbol: orderItem.sizeSymbol,
          quantity: 1,
          ...orderItem.item,
        },
      ];
    } else {
      existingItem.quantity += 1;
      return acc;
    }
  }, []);

export default simplifyOrderedItems;
