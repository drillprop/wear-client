import { builder } from "../builder.js";

/** GraphQL `UserRole` enum — mirrors the `user_role` Drizzle pg enum. */
export const UserRoleEnum = builder.enumType("UserRole", {
	values: ["ADMIN", "EMPLOYEE", "CUSTOMER"] as const,
});

/**
 * The `User` GraphQL type, derived from the `user` Drizzle table. `password` is
 * deliberately not exposed — it never leaves the server. `role` and the
 * timestamps are custom fields (the plugin can't `expose` an enum or map a
 * `Date` column to the scalar directly); the default all-columns selection makes
 * the underlying row values available to their resolvers.
 */
export const UserRef = builder.drizzleObject("user", {
	name: "User",
	fields: (t) => ({
		id: t.exposeID("id", { nullable: false }),
		email: t.exposeString("email", { nullable: false }),
		firstName: t.exposeString("firstName", { nullable: true }),
		lastName: t.exposeString("lastName", { nullable: true }),
		phoneNumber: t.exposeString("phoneNumber", { nullable: true }),
		newsletter: t.exposeBoolean("newsletter", { nullable: false }),
		// 1:1 relation, resolved by @pothos/plugin-drizzle from the `user.address`
		// relation config. Null until the customer saves an address.
		address: t.relation("address", { nullable: true }),
		role: t.field({
			type: UserRoleEnum,
			nullable: false,
			resolve: (u) => u.role,
		}),
		createdAt: t.field({
			type: "DateTime",
			nullable: false,
			resolve: (u) => u.createdAt,
		}),
		updatedAt: t.field({
			type: "DateTime",
			nullable: false,
			resolve: (u) => u.updatedAt,
		}),
	}),
});
