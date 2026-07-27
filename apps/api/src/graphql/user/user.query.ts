import { builder } from "../builder.js";
import { UserRef } from "./user.type.js";

/**
 * `user` — a single user by id for the admin console, or `null` when none
 * matches. Mirrors the `item`/`order` singular-by-id pattern: the plugin's
 * `query` folds the nested selection (e.g. `address`) into one Drizzle query.
 * Gated to `staff` (EMPLOYEE or ADMIN) per #74 — a wider gate than the
 * `admin`-only `users` list; non-staff and anonymous callers are rejected.
 */
builder.queryField("user", (t) =>
	t.drizzleField({
		type: UserRef,
		nullable: true,
		authScopes: { staff: true },
		args: {
			id: t.arg.id({ required: true }),
		},
		resolve: (query, _root, { id }, ctx) =>
			ctx.db.query.user.findFirst(query({ where: { id } })),
	}),
);
