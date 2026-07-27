import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { verifyPassword } from "../../auth/password.js";
import { user } from "../../db/schema.js";
import { builder } from "../builder.js";
import { LoginInput } from "./inputs.js";
import { UserRef } from "./user.type.js";

/**
 * `login` — verify credentials and start a session. A single generic error for
 * both "no such email" and "wrong password" avoids leaking which emails exist.
 * The password hash is fetched explicitly here and never exposed onward.
 */
builder.mutationField("login", (t) =>
	t.field({
		type: UserRef,
		nullable: false,
		args: {
			input: t.arg({ type: LoginInput, required: true }),
		},
		resolve: async (_root, { input }, ctx) => {
			const [found] = await ctx.db
				.select()
				.from(user)
				.where(eq(user.email, input.email))
				.limit(1);
			if (!found) {
				throw new GraphQLError("Invalid email or password");
			}

			const match = await verifyPassword(input.password, found.password);
			if (!match) {
				throw new GraphQLError("Invalid email or password");
			}

			ctx.issueSession({ id: found.id, email: found.email });
			return found;
		},
	}),
);
