"use client";
import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import type React from "react";
import type { Category, Gender, ItemsQueryVariables } from "@/gql/graphql";
import { deleteItem } from "../../../../graphql/mutations/DELETE_ITEM";
import { items } from "../../../../graphql/queries/ITEMS";
import { TableBodyRow, TableData } from "../../../../styles/table.styles";
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

const ItemRow: React.FC<Props> = ({
	id,
	name,
	price,
	category,
	gender,
	variables,
	grey,
}) => {
	const [remove] = useMutation(deleteItem, {
		variables: { id },
		refetchQueries: [{ query: items, variables }],
	});

	return (
		<Link href={`/shop/item?id=${id}`}>
			<TableBodyRow grey={grey}>
				<TableData>{name}</TableData>
				<TableData>{price}</TableData>
				<TableData>{category}</TableData>
				<TableData>{gender}</TableData>
				<TableData>
					<LinkAnchor href={`/admin/items/${id}`}>edit item</LinkAnchor>
				</TableData>
				<TableData
					onClick={(e) => {
						e.stopPropagation();
						remove();
					}}
				>
					delete item
				</TableData>
			</TableBodyRow>
		</Link>
	);
};

export default ItemRow;
