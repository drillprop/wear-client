"use client";
import { useMutation } from "@apollo/client/react";
import { TableCell, TableRow } from "@wear/ui/components/ui/table";
import { cn } from "@wear/ui/lib/utils";
import { useRouter } from "next/navigation";
import type React from "react";
import type { Category, Gender, ItemsQueryVariables } from "@/gql/graphql";
import { deleteItem } from "../../../../graphql/mutations/DELETE_ITEM";
import { items } from "../../../../graphql/queries/ITEMS";
import LinkAnchor from "../../../LinkAnchor/LinkAnchor";

interface Props {
	grey?: boolean;
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	category: Category;
	gender: Gender;
	variables: ItemsQueryVariables;
}

/**
 * Admin item row (#89). `table.styles.ts` `TableBodyRow`/`TableData` become the
 * shadcn `TableRow`/`TableCell`; the alternating `grey` row maps onto
 * `bg-muted/50`. The old `<Link>`-wrapping-`<tr>` (invalid markup) becomes a
 * `router.push` on row click that navigates to the item's shop page; the edit
 * and delete cells stop propagation so they act on their own targets.
 */
const ItemRow: React.FC<Props> = ({
	id,
	name,
	price,
	category,
	gender,
	variables,
	grey,
}) => {
	const router = useRouter();
	const [remove] = useMutation(deleteItem, {
		variables: { id },
		refetchQueries: [{ query: items, variables }],
	});

	return (
		<TableRow
			className={cn("cursor-pointer", grey && "bg-muted/50")}
			onClick={() => router.push(`/shop/item?id=${id}`)}
		>
			<TableCell>{name}</TableCell>
			<TableCell>{price}</TableCell>
			<TableCell>{category}</TableCell>
			<TableCell>{gender}</TableCell>
			<TableCell onClick={(e) => e.stopPropagation()}>
				<LinkAnchor href={`/admin/items/${id}`}>edit item</LinkAnchor>
			</TableCell>
			<TableCell
				onClick={(e) => {
					e.stopPropagation();
					remove();
				}}
			>
				delete item
			</TableCell>
		</TableRow>
	);
};

export default ItemRow;
