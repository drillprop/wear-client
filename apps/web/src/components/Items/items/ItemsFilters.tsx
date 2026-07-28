import type React from "react";
import type { ItemsQueryVariables } from "@/gql/graphql";
import { CategoryArr, GenderArr } from "../../../utils/constants";
import Input from "../../Input/Input";
import Select from "../../Select/Select";

interface Props {
	variables: ItemsQueryVariables;
	refetch: any;
}

/**
 * Admin item filters (#89). The `ItemsFilters.styles.ts` auto-fit grid becomes
 * the equivalent Tailwind grid; the shared `Input`/`Select` controls compose in.
 */
const ItemsFilters: React.FC<Props> = ({ variables, refetch }) => {
	return (
		<div className="grid w-full grid-cols-[repeat(auto-fit,minmax(100px,1fr))] justify-items-end gap-x-5">
			<Input
				label="search item by name"
				name="name"
				placeholder="search"
				type="search"
				icon="/search-icon.svg"
				small
				value={variables.name as string}
				onChange={(e) =>
					refetch({
						...variables,
						name: e.target.value,
					})
				}
			/>
			<Select
				label="gender"
				value={variables.gender}
				onChange={(gender) => refetch({ ...variables, gender })}
				placeHolder="gender"
				options={GenderArr}
				small
			/>
			<Select
				label="category"
				value={variables.category}
				onChange={(category) => refetch({ ...variables, category })}
				placeHolder="category"
				options={CategoryArr}
				small
			/>
			<Select
				label="items per page"
				onChange={(take) =>
					take && refetch({ ...variables, take: parseInt(take, 10) })
				}
				placeHolder="5"
				value={variables.take}
				options={[5, 10, 15, 20, 25]}
				small
			/>
		</div>
	);
};

export default ItemsFilters;
