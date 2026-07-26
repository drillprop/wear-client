import { useRouter } from "next/router";
import type React from "react";
import { useUserOrdersQuery } from "../../generated/types";
import { SiteSubtitle, SiteWrapper } from "../../styles/site.styles";
import {
	Table,
	TableBody,
	TableHead,
	TableHeadCell,
} from "../../styles/table.styles";
import AccountSideNav from "../AccountSideNav/AccountSideNav";
import Button from "../Button/Button";
import LinkAnchor from "../LinkAnchor/LinkAnchor";
import NoItems from "../NoItems/NoItems";
import Pagination from "../Pagination/Pagination";
import OrderRow from "./accountOrders/OrderRow";

const AccountOrders: React.FC = () => {
	const { query } = useRouter();
	const page =
		parseInt(typeof query.page === "string" ? query.page : "", 10) || 1;
	const tableColumnNames = ["order", "date", "total price", "status"];
	const { data, variables, refetch } = useUserOrdersQuery({
		variables: {
			take: 5,
			skip: 0,
		},
	});

	const count = data?.userOrders?.count;
	return (
		<SiteWrapper>
			<AccountSideNav />
			<div>
				<SiteSubtitle>Your orders</SiteSubtitle>
				{data?.userOrders?.select.length ? (
					<Table tableColumnNames={tableColumnNames}>
						<TableHead>
							<tr>
								{tableColumnNames.map((name) => (
									<TableHeadCell key={name}>{name}</TableHeadCell>
								))}
							</tr>
						</TableHead>
						<TableBody>
							{data?.userOrders?.select.map(
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
				<Pagination
					path={"/account/orders"}
					page={page}
					total={count}
					take={variables?.take || 5}
					refetch={refetch}
				/>
			</div>
		</SiteWrapper>
	);
};

export default AccountOrders;
