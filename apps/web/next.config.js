require("dotenv").config();

/** @type {import('next').NextConfig} */
module.exports = {
	env: {
		BACKEND_URL: process.env.BACKEND_URL,
		CLOUDINARY_PRESET: process.env.CLOUDINARY_PRESET,
		CLOUDINARY_UPLOAD_URL: process.env.CLOUDINARY_UPLOAD_URL,
	},
	compiler: {
		// Replaces the dropped babel-plugin-styled-components (SWC SSR + displayName).
		styledComponents: true,
		// Replaces babel-plugin-jsx-remove-data-test-id (strips data-testid in prod).
		reactRemoveProperties:
			process.env.NODE_ENV === "production"
				? { properties: ["^data-testid$"] }
				: false,
	},
};
