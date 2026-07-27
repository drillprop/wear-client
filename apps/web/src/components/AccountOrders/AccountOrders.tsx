"use client";
import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { userOrders } from "../../graphql/queries/USER_ORDERS";
import { SiteSubtitle, SiteWrapper } from "../../styles/site.styles";
import {
	Table,
	TableBody,
	TableHead,
	TableHeadCell,
} from "../../styles/table.styles";
import { pageToSkip, parsePage } from "../../utils/pagination";
import AccountSideNav from "../AccountSideNav/AccountSideNav";
import Button from "../Button/Button";
import LinkAnchor from "../LinkAnchor/LinkAnchor";
import NoItems from "../NoItems/NoItems";
import AppPagination from "../Pagination/AppPagination";
import OrderRow from "./accountOrders/OrderRow";

const ORDERS_TAKE = 5;

const AccountOrders: React.FC = () => {
	const page = parsePage(useSearchParams()?.get("page"));
	const skip = pageToSkip(page, ORDERS_TAKE);
	const tableColumnNames = ["order", "date", "total price", "status"];
	const { data } = useQuery(userOrders, {
		variables: { take: ORDERS_TAKE, skip },
	});

	const count = data?.userOrders?.count;
	return (
		<SiteWrapper>
			<AccountSideNav />
			<div>
				<SiteSubtitle>Your orders</SiteSubtitle>
				{data?.userOrders?.select?.length ? (
					<Table tableColumnNames={tableColumnNames}>
						<TableHead>
							<tr>
								{tableColumnNames.map((name) => (
									<TableHeadCell key={name}>{name}</TableHeadCell>
								))}
							</tr>
						</TableHead>
						<TableBody>
							{data?.userOrders?.select?.map(
								(userOrder, idx) =>
									userOrder && (
										<OrderRow
											grey={idx % 2 !== 0}
											createdAt={userOrder.createdAt}
											status={userOrder.status}
											id={userOrder.id}
											orderedItems={userOrder.orderedItems}
											key={userOrder.id}
										/>
									),
							)}
						</TableBody>
					</Table>
				) : (
					<NoItems text="No orders">
						<LinkAnchor href="/">
							<Button marginTop="20px" width="200px">
								back to shop
							</Button>
						</LinkAnchor>
					</NoItems>
				)}
				<AppPagination page={page} total={count} take={ORDERS_TAKE} />
			</div>
		</SiteWrapper>
	);
};

export default AccountOrders;
