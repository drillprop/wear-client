import { GraphQLError } from "graphql";
import { builder } from "./builder.js";

/**
 * `DateTime` scalar — serialized as an ISO-8601 string, parsed from an ISO
 * string or epoch millis. The `user` timestamps expose through this, and every
 * later timestamped entity (orders) reuses it, so it lives at the schema root.
 */
builder.scalarType("DateTime", {
	serialize: (value) => value.toISOString(),
	parseValue: (value) => {
		if (typeof value !== "string" && typeof value !== "number") {
			throw new GraphQLError("DateTime must be an ISO string or timestamp");
		}
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) {
			throw new GraphQLError(`Invalid DateTime: ${value}`);
		}
		return date;
	},
});
