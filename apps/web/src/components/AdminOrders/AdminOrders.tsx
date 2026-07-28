"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@wear/ui/components/ui/table";
import { cn } from "@wear/ui/lib/utils";
import type React from "react";
import type { OrderStatus } from "@/gql/graphql";
import { deleteOrder } from "../../graphql/mutations/DELETE_ORDER";
import { manageOrder } from "../../graphql/mutations/MANAGE_ORDER";
import { orders } from "../../graphql/queries/ORDERS";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import NoItems from "../NoItems/NoItems";
import Select from "../Select/Select";
import { SiteSubtitle, SiteWrapper } from "../SiteLayout/SiteLayout";

const ORDER_STATUSES: OrderStatus[] = ["PENDING", "PAID", "SENT", "COMPLETED"];
const ordersVariables = { take: 20, skip: 0 };

/**
 * Admin orders table (#89). The bespoke responsive `table.styles.ts` table
 * (which stacked into labelled cards below `900px`) is replaced by the shadcn
 * `Table` primitive — its container scrolls horizontally on small screens
 * rather than card-stacking, matching the #66 default-look restyle. The
 * alternating `grey` row maps onto `bg-muted/50`; `SiteWrapper`/`SiteSubtitle`
 * come from the shared `SiteLayout`.
 */
const AdminOrders: React.FC = () => {
	const { data } = useQuery(orders, { variables: ordersVariables });
	const refetchOrders = [{ query: orders, variables: ordersVariables }];

	const [manage] = useMutation(manageOrder, { refetchQueries: refetchOrders });
	const [remove] = useMutation(deleteOrder, { refetchQueries: refetchOrders });

	const tableColumnNames = ["order", "customer", "status", "delete"];
	const list = data?.orders ?? [];

	return (
		<SiteWrapper>
			<AdminSideNav />
			<div>
				<SiteSubtitle>Orders</SiteSubtitle>
				{list.length ? (
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
							{list.map(
								(order, idx) =>
									order && (
										<TableRow
											key={order.id}
											className={cn(idx % 2 !== 0 && "bg-muted/50")}
										>
											<TableCell>{order.id}</TableCell>
											<TableCell>{order.orderedBy?.email}</TableCell>
											<TableCell>
												<Select
													label="order status"
													small
													value={order.status}
													placeHolder="status"
													options={ORDER_STATUSES}
													onChange={(status) =>
														status &&
														manage({ variables: { id: order.id, status } })
													}
												/>
											</TableCell>
											<TableCell
												className="cursor-pointer"
												onClick={() => remove({ variables: { id: order.id } })}
											>
												delete order
											</TableCell>
										</TableRow>
									),
							)}
						</TableBody>
					</Table>
				) : (
					<NoItems text="No orders" />
				)}
			</div>
		</SiteWrapper>
	);
};

export default AdminOrders;
