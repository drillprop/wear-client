import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { user } from "../../db/schema.js";
import { builder } from "../builder.js";
import { SuccessMessageRef } from "../shared/success-message.js";
import { UserRoleEnum } from "./user.type.js";

/**
 * `changeUserRole` — admin user administration: set another account's role,
 * addressed by email (the admin-facing identifier). Gated to `admin`; a missing
 * email is a hard error rather than a silent no-op so the caller knows the change
 * didn't land.
 */
builder.mutationField("changeUserRole", (t) =>
	t.field({
		type: SuccessMessageRef,
		nullable: false,
		authScopes: { admin: true },
		args: {
			email: t.arg.string({ required: true }),
			role: t.arg({ type: UserRoleEnum, required: true }),
		},
		resolve: async (_root, { email, role }, ctx) => {
			const updated = await ctx.db
				.update(user)
				.set({ role })
				.where(eq(user.email, email))
				.returning({ id: user.id });
			if (updated.length === 0) {
				throw new GraphQLError("User not found");
			}
			return { message: "User role updated" };
		},
	}),
);
