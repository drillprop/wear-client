import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@wear/ui/components/ui/table";
import type React from "react";
import type { ItemsQuery, ItemsQueryVariables } from "@/gql/graphql";
import ItemRow from "./itemsTable/ItemRow";

interface Props {
	items: ItemsQuery["items"]["select"];
	variables: ItemsQueryVariables;
}

/**
 * Admin items table (#89). The responsive `table.styles.ts` table becomes the
 * shadcn `Table` primitive (horizontal scroll on small screens); each row is an
 * `ItemRow`.
 */
const ItemsTable: React.FC<Props> = ({ items, variables }) => {
	const tableColumnNames = [
		"name",
		"price",
		"category",
		"gender",
		"edit item",
		"delete item",
	];
	return (
		<Table className="mt-[50px]">
			<TableHeader>
				<TableRow>
					{tableColumnNames.map((name) => (
						<TableHead key={name} className="uppercase">
							{name}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{items?.map(
					(item, idx) =>
						item && (
							<ItemRow
								grey={idx % 2 !== 0}
								key={item.id}
								id={item.id}
								name={item.name}
								price={item.price}
								imageUrl={item.imageUrl}
								category={item.category}
								gender={item.gender}
								variables={variables}
							/>
						),
				)}
			</TableBody>
		</Table>
	);
};

export default ItemsTable;
