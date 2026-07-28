/** @type {import('next').NextConfig} */
module.exports = {
	// @wear/ui ships its shadcn primitives as source .tsx (no build step); Next
	// transpiles them as part of the app bundle (#83).
	transpilePackages: ["@wear/ui"],
	env: {
		// Inlined for the Cloudinary unsigned upload (staff item images). The App
		// Router stack reads INTERNAL_API_URL / API_SHARED_SECRET server-side only
		// (never inlined), so the API origin stays off the browser.
		CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET,
		CLOUDINARY_UPLOAD_URL: process.env.CLOUDINARY_UPLOAD_URL,
	},
	compiler: {
		// Replaces the dropped babel-plugin-styled-components (SWC SSR + displayName).
		// Kept for the temporary styled-components bridge; removed with the styling port.
		styledComponents: true,
		// Replaces babel-plugin-jsx-remove-data-test-id (strips data-testid in prod).
		reactRemoveProperties:
			process.env.NODE_ENV === "production"
				? { properties: ["^data-testid$"] }
				: false,
	},
};
