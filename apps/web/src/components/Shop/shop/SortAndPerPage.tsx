import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import type { ItemsQueryVariables } from "@/gql/graphql";
import Select from "../../Select/Select";

type SortType = "newest" | "lowest price" | "highest price";

interface Props {
	refetch: (variables?: Partial<ItemsQueryVariables>) => void;
	variables: ItemsQueryVariables;
	/** Concrete catalogue path (e.g. `/shop/man`) to reset to on a per-page change. */
	basePath: string;
}

const SortAndPerPage: React.FC<Props> = ({ refetch, variables, basePath }) => {
	const [sortValue, setSortValue] = useState<SortType>("newest");

	const router = useRouter();

	const handleSort = (sort: SortType) => {
		if (sort === "newest")
			refetch({
				...variables,
				sortBy: "Item.createdAt",
				sortOrder: "DESC",
			});
		else if (sort === "lowest price")
			refetch({
				...variables,
				sortBy: "Item.price",
				sortOrder: "ASC",
			});
		else if (sort === "highest price")
			refetch({
				...variables,
				sortBy: "Item.price",
				sortOrder: "DESC",
			});
		setSortValue(sort);
	};
	return (
		<>
			<Select
				label="sort by"
				value={sortValue}
				placeHolder="name"
				options={["newest", "lowest price", "highest price"]}
				onChange={handleSort}
				small
			/>
			<Select
				label="items per page"
				onChange={(take) => {
					// Changing page size resets pagination to the first page.
					if (variables.skip) {
						router.push(basePath);
					}
					take && refetch({ ...variables, skip: 0, take: parseInt(take, 10) });
				}}
				value={variables?.take || 6}
				placeHolder="6"
				options={[6, 12, 18, 24, 30]}
				small
			/>
		</>
	);
};

export default SortAndPerPage;
