import { useRouter } from "next/router";
import type React from "react";
import { type UsersQueryVariables, useUsersQuery } from "../../generated/types";
import { SiteSubtitle, SiteWrapper } from "../../styles/site.styles";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import Pagination from "../Pagination/Pagination";
import UsersFilters from "./users/UsersFilters";
import UsersTable from "./users/UsersTable";

const Users: React.FC = () => {
	const { query } = useRouter();
	const {
		data,
		refetch,
		variables: rawVariables,
	} = useUsersQuery({
		variables: {
			take: 5,
			skip: 0,
			sortBy: "User.createdAt",
			sortOrder: "ASC",
		},
	});
	// The hook always runs with the variables above, so they are defined at
	// runtime; Apollo Client 3 types them as optional, hence the fallback.
	const variables: UsersQueryVariables = rawVariables ?? {};

	const count = data?.users.count || 0;
	const users = data?.users.select || [];
	const page =
		parseInt(typeof query.page === "string" ? query.page : "", 10) || 1;

	return (
		<SiteWrapper>
			<AdminSideNav />
			<div>
				<SiteSubtitle>List of Users</SiteSubtitle>
				<UsersFilters variables={variables} refetch={refetch} />
				{!!users.length && <UsersTable users={users} />}
				<Pagination
					path={"/admin/users"}
					page={page}
					total={count}
					take={variables.take || 5}
					refetch={refetch}
				/>
			</div>
		</SiteWrapper>
	);
};

export default Users;
