import { builder } from "./builder.js";

/**
 * `Greeting` GraphQL type, derived from the `greeting` Drizzle table by
 * `@pothos/plugin-drizzle`. Exposing columns here proves the plugin resolves
 * object fields from real table data.
 */
builder.drizzleObject("greeting", {
	name: "Greeting",
	fields: (t) => ({
		id: t.exposeID("id", { nullable: false }),
		message: t.exposeString("message", { nullable: false }),
	}),
});

builder.queryType({
	fields: (t) => ({
		greetings: t.drizzleField({
			type: ["greeting"],
			nullable: false,
			resolve: (query, _root, _args, ctx) =>
				ctx.db.query.greeting.findMany(query()),
		}),
	}),
});

/** The assembled, executable GraphQL schema — the test seam and Yoga host. */
export const schema = builder.toSchema();
