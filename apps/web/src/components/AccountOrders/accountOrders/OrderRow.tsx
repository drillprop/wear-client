"use client";
import { TableCell, TableRow } from "@wear/ui/components/ui/table";
import { cn } from "@wear/ui/lib/utils";
import type React from "react";
import { useState } from "react";
import type { OrderStatus } from "@/gql/graphql";
import formatDBDate from "../../../utils/formatDBDate";
import simplifyOrderedItems, {
	type OrderedItems,
} from "../../../utils/simplifyOrderedItems";
import LinkAnchor from "../../LinkAnchor/LinkAnchor";

interface Props {
	grey?: boolean;
	id?: string;
	createdAt?: string;
	status?: OrderStatus;
	orderedItems?: OrderedItems | null;
}

/**
 * Order-history row (#88). `table.styles.ts` `TableBodyRow`/`TableData` become
 * the shadcn `TableRow`/`TableCell`; the alternating `grey` row maps onto
 * `bg-muted/50`, and clicking a row toggles a details row. `OrderRow.styles.ts`
 * (the details layout — its whole body was a `max-width:900` card-mode override
 * that the shadcn scroll-table no longer needs) ports to a small Tailwind block.
 */
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
			<TableRow
				className={cn("cursor-pointer", grey && "bg-muted/50")}
				onClick={() =>
					setDetailsVisible((isDetailsVisible) => !isDetailsVisible)
				}
			>
				<TableCell>{id}</TableCell>
				<TableCell>{date}</TableCell>
				<TableCell>$ {totalPrice}</TableCell>
				<TableCell>{status}</TableCell>
			</TableRow>
			{isDetailsVisible && (
				<TableRow>
					<TableCell colSpan={5}>
						<h3 className="m-0">Ordered Items</h3>
						<div className="mt-[15px]">
							{convertedItems.map((item) => (
								<div
									key={item.id + item.sizeSymbol}
									className="mt-[5px] flex w-[300px] justify-between [&>div]:mr-5"
								>
									<div>
										{item.quantity} x{" "}
										<LinkAnchor highlight href={`/shop/item?id=${item.id}`}>
											{item.name}
										</LinkAnchor>
									</div>
									<div> size: {item.sizeSymbol}</div>
									<div> $ {item.price}</div>
								</div>
							))}
						</div>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default OrderRow;
