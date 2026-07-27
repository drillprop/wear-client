"use client";
import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import type React from "react";
import type { UsersQueryVariables } from "@/gql/graphql";
import { users as usersDoc } from "../../graphql/queries/USERS";
import { SiteSubtitle, SiteWrapper } from "../../styles/site.styles";
import { pageToSkip, parsePage } from "../../utils/pagination";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import AppPagination from "../Pagination/AppPagination";
import UsersFilters from "./users/UsersFilters";
import UsersTable from "./users/UsersTable";

const USERS_TAKE = 5;

const Users: React.FC = () => {
	const page = parsePage(useSearchParams()?.get("page"));
	const variables: UsersQueryVariables = {
		take: USERS_TAKE,
		skip: pageToSkip(page, USERS_TAKE),
	};

	const { data, refetch } = useQuery(usersDoc, { variables });

	const count = data?.users.count || 0;
	const users = data?.users.select || [];

	return (
		<SiteWrapper>
			<AdminSideNav />
			<div>
				<SiteSubtitle>List of Users</SiteSubtitle>
				<UsersFilters variables={variables} refetch={refetch} />
				{!!users.length && <UsersTable users={users} />}
				<AppPagination page={page} total={count} take={USERS_TAKE} />
			</div>
		</SiteWrapper>
	);
};

export default Users;
