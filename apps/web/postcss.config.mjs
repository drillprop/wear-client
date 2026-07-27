/**
 * Tailwind v4 is CSS-first: its PostCSS plugin compiles `@import "tailwindcss"`
 * (see src/app/globals.css) — there is no `tailwind.config.js`. Next reads this
 * config for both the Turbopack dev server and the production build.
 */
const config = {
	plugins: {
		"@tailwindcss/postcss": {},
	},
};

export default config;
