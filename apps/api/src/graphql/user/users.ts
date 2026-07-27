import { and, asc, eq, ilike, type SQL } from "drizzle-orm";
import { user } from "../../db/schema.js";
import { builder } from "../builder.js";
import { SearchUserInput } from "./inputs.js";
import { UserRef } from "./user.type.js";

/** Page size cap so an admin search can never ask for an unbounded result set. */
const DEFAULT_TAKE = 20;
const MAX_TAKE = 100;

interface UsersAndCount {
	select: (typeof user.$inferSelect)[];
	count: number;
}

const UsersAndCountRef = builder
	.objectRef<UsersAndCount>("UsersAndCount")
	.implement({
		fields: (t) => ({
			select: t.field({
				type: [UserRef],
				nullable: false,
				resolve: (parent) => parent.select,
			}),
			count: t.int({ nullable: false, resolve: (parent) => parent.count }),
		}),
	});

/** Clamp a client-supplied page size into `[1, MAX_TAKE]`, defaulting when unset. */
function pageSize(take: number | null | undefined): number {
	if (take == null) return DEFAULT_TAKE;
	return Math.min(Math.max(take, 1), MAX_TAKE);
}

/**
 * `users` — admin user administration search. Returns the matching page in
 * `select` and the full match total in `count` (so a paginated UI can show "n of
 * total"). Gated to `admin`.
 */
builder.queryField("users", (t) =>
	t.field({
		type: UsersAndCountRef,
		nullable: false,
		authScopes: { admin: true },
		args: {
			where: t.arg({ type: SearchUserInput, required: false }),
		},
		resolve: async (_root, { where }, ctx): Promise<UsersAndCount> => {
			const filters: SQL[] = [];
			if (where?.role) filters.push(eq(user.role, where.role));
			if (where?.email) filters.push(ilike(user.email, `%${where.email}%`));
			if (where?.firstName)
				filters.push(ilike(user.firstName, `%${where.firstName}%`));
			if (where?.lastName)
				filters.push(ilike(user.lastName, `%${where.lastName}%`));
			const predicate = filters.length > 0 ? and(...filters) : undefined;

			const take = pageSize(where?.take);
			const skip = Math.max(where?.skip ?? 0, 0);

			const [select, count] = await Promise.all([
				ctx.db
					.select()
					.from(user)
					.where(predicate)
					.orderBy(asc(user.email))
					.limit(take)
					.offset(skip),
				ctx.db.$count(user, predicate),
			]);

			return { select, count };
		},
	}),
);
