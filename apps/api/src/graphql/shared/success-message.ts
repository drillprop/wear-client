import { builder } from "../builder.js";

/**
 * A plain `{ message }` payload for mutations that have nothing else to return
 * (e.g. `signout`). Mirrors the legacy `SuccessMessage` object type.
 */
export interface SuccessMessage {
	message: string;
}

export const SuccessMessageRef = builder
	.objectRef<SuccessMessage>("SuccessMessage")
	.implement({
		fields: (t) => ({
			message: t.exposeString("message", { nullable: false }),
		}),
	});
