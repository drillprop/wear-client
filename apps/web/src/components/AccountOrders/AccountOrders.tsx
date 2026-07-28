"use client";
import { useQuery } from "@apollo/client/react";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@wear/ui/components/ui/table";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { userOrders } from "../../graphql/queries/USER_ORDERS";
import { pageToSkip, parsePage } from "../../utils/pagination";
import AccountSideNav from "../AccountSideNav/AccountSideNav";
import Button from "../Button/Button";
import LinkAnchor from "../LinkAnchor/LinkAnchor";
import NoItems from "../NoItems/NoItems";
import AppPagination from "../Pagination/AppPagination";
import { SiteSubtitle, SiteWrapper } from "../SiteLayout/SiteLayout";
import OrderRow from "./accountOrders/OrderRow";

const ORDERS_TAKE = 5;

/**
 * Account order history (#88). The bespoke responsive `table.styles.ts` table
 * (which stacked into labelled cards below `900px`) is replaced by the shadcn
 * `Table` primitive — its container scrolls horizontally on small screens
 * rather than card-stacking, matching the #66 default-look restyle.
 * `SiteWrapper`/`SiteSubtitle` come from the shared `SiteLayout`; `table.styles`
 * stays for the admin tables until #89.
 */
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
							<Button className="mt-5 w-[200px]">back to shop</Button>
						</LinkAnchor>
					</NoItems>
				)}
				<AppPagination page={page} total={count} take={ORDERS_TAKE} />
			</div>
		</SiteWrapper>
	);
};

export default AccountOrders;
