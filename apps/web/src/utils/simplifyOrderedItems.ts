import type { Gender, SizeSymbol, UserOrdersQuery } from "@/gql/graphql";

/** The `orderedItems` shape as the generated `UserOrders` document returns it. */
export type OrderedItems = NonNullable<
	NonNullable<UserOrdersQuery["userOrders"]["select"]>[number]["orderedItems"]
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
		// The schema allows a null line-item / a null nested item; skip those.
		if (!orderItem?.item) {
			return acc;
		}
		const item = orderItem.item;
		const existingItem = acc.find(
			({ sizeSymbol, id }) =>
				sizeSymbol === orderItem.sizeSymbol && id === item.id,
		);
		if (!existingItem) {
			return [
				...acc,
				{
					sizeSymbol: orderItem.sizeSymbol,
					quantity: 1,
					...item,
				},
			];
		}
		existingItem.quantity += 1;
		return acc;
	}, []);

export default simplifyOrderedItems;
