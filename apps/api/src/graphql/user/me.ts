import { builder } from "../builder.js";
import { UserRef } from "./user.type.js";

/**
 * `me` — the current user, or `null` when the request is anonymous. This is the
 * anonymous-vs-authenticated read the web app uses to know who's logged in; it
 * intentionally returns null rather than erroring for anonymous callers.
 */
builder.queryField("me", (t) =>
	t.drizzleField({
		type: UserRef,
		nullable: true,
		resolve: (query, _root, _args, ctx) => {
			if (!ctx.userId) {
				return null;
			}
			return ctx.db.query.user.findFirst(query({ where: { id: ctx.userId } }));
		},
	}),
);
