"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { changeUserRole } from "../../graphql/mutations/CHANGE_USER_ROLE";
import { singleUser } from "../../graphql/queries/SINGLE_USER";
import { SiteSubtitle, SiteWrapper } from "../../styles/site.styles";
import { UserRoleArr } from "../../utils/constants";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Select from "../Select/Select";

const SingleUser: React.FC = () => {
	const id = useSearchParams()?.get("id") ?? "";
	const { data } = useQuery(singleUser, { variables: { id } });
	const user = data?.user;

	const [changeRole, { error, data: roleData }] = useMutation(changeUserRole, {
		refetchQueries: [{ query: singleUser, variables: { id } }],
	});

	return (
		<SiteWrapper>
			<AdminSideNav />
			<div>
				<SiteSubtitle>User</SiteSubtitle>
				{user ? (
					<>
						<p>{user.email}</p>
						<p>
							{user.firstName} {user.lastName}
						</p>
						<p>role: {user.role}</p>
						<ErrorMessage error={error?.message} />
						{roleData?.changeUserRole.message}
						<Select
							label="change role"
							value={user.role}
							placeHolder="role"
							options={UserRoleArr}
							onChange={(role) =>
								role && changeRole({ variables: { email: user.email, role } })
							}
						/>
					</>
				) : (
					<p>No such user</p>
				)}
			</div>
		</SiteWrapper>
	);
};

export default SingleUser;
