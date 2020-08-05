import { Item, Ordered_Item, SizeSymbol, Gender } from '../generated/types';

type OrderedItems = Array<
  Pick<Ordered_Item, 'id' | 'sizeSymbol'> & {
    item: Pick<Item, 'name' | 'price' | 'id' | 'gender'>;
  }
>;

type ConvertedItems = {
  id: string;
  sizeSymbol: SizeSymbol;
  name: string;
  price: number;
  quantity: number;
  gender: Gender;
}[];

const convertOrderedItems = (orderedItems: OrderedItems) =>
  orderedItems?.reduce((acc: ConvertedItems, orderItem) => {
    const existingItem = acc.find(
      (accItem: any) =>
        accItem.sizeSymbol === orderItem.sizeSymbol &&
        accItem.id === orderItem.item.id
    );
    if (!existingItem)
      acc.push({
        id: orderItem.item.id,
        sizeSymbol: orderItem.sizeSymbol,
        name: orderItem.item.name,
        price: orderItem.item.price,
        quantity: 1,
        gender: orderItem.item.gender,
      });
    else existingItem.quantity = existingItem.quantity + 1;

    return acc;
  }, []);

export default convertOrderedItems;
