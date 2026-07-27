"use client";
import type React from "react";
import { useState } from "react";
import type { OrderStatus } from "@/gql/graphql";
import { TableBodyRow, TableData } from "../../../styles/table.styles";
import formatDBDate from "../../../utils/formatDBDate";
import simplifyOrderedItems, {
	type OrderedItems,
} from "../../../utils/simplifyOrderedItems";
import LinkAnchor from "../../LinkAnchor/LinkAnchor";
import {
	DetailsColumn,
	DetailsHeading,
	DetailsRow,
	DetailsWrapper,
} from "./OrderRow.styles";

interface Props {
	grey?: boolean;
	id?: string;
	createdAt?: string;
	status?: OrderStatus;
	orderedItems?: OrderedItems | null;
}

const OrderRow: React.FC<Props> = ({
	grey,
	id,
	createdAt,
	status,
	orderedItems,
}) => {
	const [isDetailsVisible, setDetailsVisible] = useState(false);

	const totalPrice = orderedItems?.reduce(
		(acc, orderItem) => acc + (orderItem?.item?.price ?? 0),
		0,
	);

	const date = createdAt && formatDBDate(createdAt);
	const convertedItems = simplifyOrderedItems(orderedItems || []);

	return (
		<>
			<TableBodyRow
				grey={grey}
				onClick={() =>
					setDetailsVisible((isDetailsVisible) => !isDetailsVisible)
				}
			>
				<TableData>{id}</TableData>
				<TableData>{date}</TableData>
				<TableData>$ {totalPrice}</TableData>
				<TableData>{status}</TableData>
			</TableBodyRow>
			{isDetailsVisible && (
				<DetailsRow>
					<TableData colSpan={5}>
						<DetailsHeading>Ordered Items</DetailsHeading>
						<DetailsWrapper>
							{convertedItems.map((item) => (
								<DetailsColumn key={item.id + item.sizeSymbol}>
									<div>
										{item.quantity} x{" "}
										<LinkAnchor highlight href={`/shop/item?id=${item.id}`}>
											{item.name}
										</LinkAnchor>
									</div>
									<div> size: {item.sizeSymbol}</div>
									<div> $ {item.price}</div>
								</DetailsColumn>
							))}
						</DetailsWrapper>
					</TableData>
				</DetailsRow>
			)}
		</>
	);
};

export default OrderRow;
