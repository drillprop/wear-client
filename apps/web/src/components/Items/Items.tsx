import { useRouter } from "next/router";
import { type ItemsQueryVariables, useItemsQuery } from "../../generated/types";
import { SiteSubtitle, SiteWrapper } from "../../styles/site.styles";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import Pagination from "../Pagination/Pagination";
import CreateItemForm from "./items/CreateItemForm";
import ItemsFilters from "./items/ItemsFilters";
import ItemsTable from "./items/ItemsTable";

const Items = () => {
	const { query } = useRouter();
	const {
		data,
		refetch,
		variables: rawVariables,
	} = useItemsQuery({
		variables: {
			take: 5,
			skip: 0,
			sortBy: "Item.createdAt",
			sortOrder: "DESC",
			available: false,
		},
	});
	// The hook always runs with the variables above, so they are defined at
	// runtime; Apollo Client 3 types them as optional, hence the fallback.
	const variables: ItemsQueryVariables = rawVariables ?? {};

	const page =
		parseInt(typeof query.page === "string" ? query.page : "", 10) || 1;

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
				<Pagination
					path={"/admin/items"}
					page={page}
					total={count}
					take={variables.take || 5}
					refetch={refetch}
				/>
			</div>
		</SiteWrapper>
	);
};

export default Items;
