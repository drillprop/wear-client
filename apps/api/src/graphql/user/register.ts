import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { hashPassword } from "../../auth/password.js";
import { user } from "../../db/schema.js";
import { builder } from "../builder.js";
import { RegisterInput } from "./inputs.js";
import { UserRef } from "./user.type.js";

/**
 * `register` — create an account and start a session. Email format/length are
 * validated by the zod plugin; uniqueness is checked here (a DB lookup the input
 * validator can't do). The password is bcrypt-hashed before insert, and a
 * session is issued for the new user so the client is logged in immediately.
 */
builder.mutationField("register", (t) =>
	t.field({
		type: UserRef,
		nullable: false,
		args: {
			input: t.arg({ type: RegisterInput, required: true }),
		},
		resolve: async (_root, { input }, ctx) => {
			const [existing] = await ctx.db
				.select({ id: user.id })
				.from(user)
				.where(eq(user.email, input.email))
				.limit(1);
			if (existing) {
				throw new GraphQLError("Email already in use");
			}

			const password = await hashPassword(input.password);
			const [created] = await ctx.db
				.insert(user)
				.values({ email: input.email, password })
				.returning();
			if (!created) {
				throw new GraphQLError("Failed to create account");
			}

			ctx.issueSession({ id: created.id, email: created.email });
			return created;
		},
	}),
);
