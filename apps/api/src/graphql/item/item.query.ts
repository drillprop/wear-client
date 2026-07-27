import { builder } from "../builder.js";
import { ItemRef } from "./item.type.js";

/**
 * `item` — a single item by id, with its sizes, or `null` when none matches.
 * The plugin's `query` collects the nested selection (sizes, and `createdBy`
 * when a staff caller asks for it) into one Drizzle query.
 */
builder.queryField("item", (t) =>
	t.drizzleField({
		type: ItemRef,
		nullable: true,
		args: {
			id: t.arg.id({ required: true }),
		},
		resolve: (query, _root, { id }, ctx) =>
			ctx.db.query.item.findFirst(query({ where: { id } })),
	}),
);
