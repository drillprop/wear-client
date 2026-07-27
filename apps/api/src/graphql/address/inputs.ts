import { builder } from "../builder.js";

/**
 * `updateAddress` input — every field optional, matching the legacy contract and
 * the `address` table's all-nullable columns. An omitted field is left untouched
 * on update; a present field (including an explicit empty string) is written.
 */
export const UpdateAddressInput = builder.inputType("UpdateAddressInput", {
	fields: (t) => ({
		addressLine1: t.string({ required: false }),
		addressLine2: t.string({ required: false }),
		zipCode: t.string({ required: false }),
		city: t.string({ required: false }),
		country: t.string({ required: false }),
	}),
});
