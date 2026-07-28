/** @type {import('next').NextConfig} */
module.exports = {
	// @wear/ui ships its shadcn primitives as source .tsx (no build step); Next
	// transpiles them as part of the app bundle (#83).
	transpilePackages: ["@wear/ui"],
	compiler: {
		// Replaces babel-plugin-jsx-remove-data-test-id (strips data-testid in prod).
		reactRemoveProperties:
			process.env.NODE_ENV === "production"
				? { properties: ["^data-testid$"] }
				: false,
	},
};
