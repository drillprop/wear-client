import { graphql } from "@/gql";

/** `ChangeUserRole` — staff sets another user's role. */
export const changeUserRole = graphql(`
	mutation ChangeUserRole($email: String!, $role: UserRole!) {
		changeUserRole(email: $email, role: $role) {
			message
		}
	}
`);
