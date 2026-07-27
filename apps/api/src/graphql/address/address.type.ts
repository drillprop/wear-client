import { builder } from "../builder.js";

/**
 * The `Address` GraphQL type, derived from the `address` Drizzle table (#48).
 * Every field but `id` is nullable, mirroring the legacy contract where a
 * customer may save a partially-filled address. Exposed as a relation off
 * `User.address`; it has no root query of its own (ownership flows through the
 * user).
 */
export const AddressRef = builder.drizzleObject("address", {
	name: "Address",
	fields: (t) => ({
		id: t.exposeID("id", { nullable: false }),
		addressLine1: t.exposeString("addressLine1", { nullable: true }),
		addressLine2: t.exposeString("addressLine2", { nullable: true }),
		zipCode: t.exposeString("zipCode", { nullable: true }),
		city: t.exposeString("city", { nullable: true }),
		country: t.exposeString("country", { nullable: true }),
	}),
});
