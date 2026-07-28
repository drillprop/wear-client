import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@wear/ui/components/ui/table";
import type React from "react";
import type { UsersQuery } from "@/gql/graphql";
import UserRow from "./usersTable/UserRow";

interface Props {
	users: UsersQuery["users"]["select"];
}

/**
 * Admin users table (#89). The responsive `table.styles.ts` table becomes the
 * shadcn `Table` primitive (horizontal scroll on small screens); each row is a
 * `UserRow`.
 */
const UsersTable: React.FC<Props> = ({ users }) => {
	const tableColumnNames = ["email", "full name", "role", "orders"];
	return (
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
				{users.map(
					(user, idx) =>
						user && (
							<UserRow
								grey={idx % 2 !== 0}
								key={user.id}
								email={user.email}
								role={user.role}
								id={user.id}
								fullName={`${user.firstName || ""} ${user.lastName || ""}`}
							/>
						),
				)}
			</TableBody>
		</Table>
	);
};

export default UsersTable;
