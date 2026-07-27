/** @type {import('next').NextConfig} */
module.exports = {
	env: {
		// Inlined for the frozen Pages Router client (legacy `withApollo`, Cloudinary
		// upload). The App Router stack reads INTERNAL_API_URL / API_SHARED_SECRET
		// server-side only (never inlined), so the API stays off the browser.
		BACKEND_URL: process.env.BACKEND_URL,
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
