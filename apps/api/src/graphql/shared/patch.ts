/**
 * Build a partial "patch" from a GraphQL input, keeping only the fields the
 * caller actually supplied (`value !== undefined`). An omitted optional field is
 * left out entirely so a partial form updates just what it sent instead of
 * clobbering the rest — an explicit `null` still comes through, clearing the
 * column. Shared by `updatePersonalInfo` and `updateAddress`, which both persist
 * a subset of optional columns.
 */
export function definedFields<T extends object, K extends keyof T>(
	input: T,
	keys: readonly K[],
): Partial<Pick<T, K>> {
	const patch: Partial<Pick<T, K>> = {};
	for (const key of keys) {
		if (input[key] !== undefined) {
			patch[key] = input[key];
		}
	}
	return patch;
}
