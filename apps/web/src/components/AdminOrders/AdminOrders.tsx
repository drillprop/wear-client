"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import type React from "react";
import type { OrderStatus } from "@/gql/graphql";
import { deleteOrder } from "../../graphql/mutations/DELETE_ORDER";
import { manageOrder } from "../../graphql/mutations/MANAGE_ORDER";
import { orders } from "../../graphql/queries/ORDERS";
import { SiteSubtitle, SiteWrapper } from "../../styles/site.styles";
import {
	Table,
	TableBody,
	TableBodyRow,
	TableData,
	TableHead,
	TableHeadCell,
} from "../../styles/table.styles";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import NoItems from "../NoItems/NoItems";
import Select from "../Select/Select";

const ORDER_STATUSES: OrderStatus[] = ["PENDING", "PAID", "SENT", "COMPLETED"];
const ordersVariables = { take: 20, skip: 0 };

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
					<Table tableColumnNames={tableColumnNames}>
						<TableHead>
							<tr>
								{tableColumnNames.map((name) => (
									<TableHeadCell key={name}>{name}</TableHeadCell>
								))}
							</tr>
						</TableHead>
						<TableBody>
							{list.map(
								(order, idx) =>
									order && (
										<TableBodyRow key={order.id} grey={idx % 2 !== 0}>
											<TableData>{order.id}</TableData>
											<TableData>{order.orderedBy?.email}</TableData>
											<TableData>
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
											</TableData>
											<TableData
												onClick={() => remove({ variables: { id: order.id } })}
											>
												delete order
											</TableData>
										</TableBodyRow>
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
