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
		// Each test builds a fresh in-process pglite and materializes the schema via
		// drizzle-kit `pushSchema` in a `beforeEach` (see test-support/pglite.ts).
		// That cold-start costs a few seconds and can spike past Vitest's default
		// 10s hook timeout under CI load (many test files in parallel alongside the
		// web build), so give the setup/teardown hooks headroom to keep CI green.
		hookTimeout: 30_000,
		testTimeout: 30_000,
		server: {
			deps: {
				inline: [
					"@pothos/core",
					"@pothos/plugin-drizzle",
					"@pothos/plugin-scope-auth",
					"@pothos/plugin-zod",
				],
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
