import { defineConfig } from "vitest/config";

export default defineConfig({
	// graphql@17 ships a `development` export condition that Vite resolves to a
	// separate build. Dedupe + inlining the Pothos packages that construct the
	// schema keeps every graphql reference on a single instance, so graphql's
	// duplicate-module guard (`devInstanceOf`) doesn't trip during execute().
	resolve: {
		dedupe: ["graphql"],
	},
	test: {
		environment: "node",
		include: ["src/**/*.test.ts"],
		server: {
			deps: {
				inline: ["@pothos/core", "@pothos/plugin-drizzle"],
			},
		},
		coverage: {
			provider: "v8",
			reporter: ["text", "html"],
			reportsDirectory: "coverage",
			include: ["src/**/*.ts"],
			exclude: ["src/**/*.test.ts", "src/test-support/**"],
		},
	},
});
