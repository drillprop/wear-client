"use client";
import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import type { ItemsQueryVariables } from "@/gql/graphql";
import { items as itemsDoc } from "../../graphql/queries/ITEMS";
import { pageToSkip, parsePage } from "../../utils/pagination";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import AppPagination from "../Pagination/AppPagination";
import { SiteSubtitle, SiteWrapper } from "../SiteLayout/SiteLayout";
import CreateItemForm from "./items/CreateItemForm";
import ItemsFilters from "./items/ItemsFilters";
import ItemsTable from "./items/ItemsTable";

const ITEMS_TAKE = 5;

const Items = () => {
	const page = parsePage(useSearchParams()?.get("page"));
	const variables: ItemsQueryVariables = {
		take: ITEMS_TAKE,
		skip: pageToSkip(page, ITEMS_TAKE),
		sortBy: "Item.createdAt",
		sortOrder: "DESC",
		available: false,
	};

	const { data, refetch } = useQuery(itemsDoc, { variables });

	const count = data?.items.count || 0;
	const items = data?.items.select || [];
	return (
		<SiteWrapper>
			<AdminSideNav />
			<div>
				<CreateItemForm variables={variables} />
				<SiteSubtitle>List of Items</SiteSubtitle>
				<ItemsFilters variables={variables} refetch={refetch} />
				{!!items && <ItemsTable items={items} variables={variables} />}
				<AppPagination page={page} total={count} take={ITEMS_TAKE} />
			</div>
		</SiteWrapper>
	);
};

export default Items;
