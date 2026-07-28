import type React from "react";
import type { UsersQueryVariables } from "@/gql/graphql";
import { UserRoleArr } from "../../../utils/constants";
import Input from "../../Input/Input";
import Select from "../../Select/Select";

interface Props {
	variables: UsersQueryVariables;
	refetch: any;
}

/**
 * Admin user filters (#89). The `UsersFilters.styles.ts` auto-fit grid becomes
 * the equivalent Tailwind grid; the shared `Input`/`Select` controls compose in.
 */
const UsersFilters: React.FC<Props> = ({ variables, refetch }) => {
	return (
		<div className="grid w-full grid-cols-[repeat(auto-fit,minmax(100px,1fr))] justify-items-end gap-x-5">
			<Input
				label="search user by email"
				name="email"
				placeholder="search"
				type="search"
				icon="/search-icon.svg"
				small
				value={variables.email as string}
				onChange={(e) =>
					refetch({
						...variables,
						email: e.target.value,
					})
				}
			/>
			<Select
				label="role"
				value={variables.role}
				onChange={(role) => refetch({ ...variables, role })}
				placeHolder="role"
				options={UserRoleArr}
				small
			/>
			<Select
				label="users per page"
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

export default UsersFilters;
