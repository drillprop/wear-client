import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * Web test project (#68). Vitest replaces Jest + ts-jest: a jsdom project running
 * the ported client tests plus new tests that drive the real Apollo v4 client and
 * the client-preset `graphql()` documents through the MSW harness (see
 * `src/test-utils/msw`). `@vitejs/plugin-react` supplies the automatic-JSX-runtime
 * transform Jest got from ts-jest; `@` mirrors the tsconfig path alias.
 */
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
		// Apollo v4 + graphql are peer-linked; a single instance avoids the
		// duplicate-module hazards that bite when Vite resolves separate copies.
		dedupe: ["react", "react-dom", "graphql", "@apollo/client"],
	},
	test: {
		environment: "jsdom",
		// Bare `it`/`expect`/`describe` (as the Jest suites were written) plus the
		// jest-dom matchers registered in the setup file.
		globals: true,
		setupFiles: ["./src/test-utils/setup.ts"],
		include: ["src/**/*.test.{ts,tsx}"],
		coverage: {
			// Measure-only: report the number, gate nothing (#68).
			provider: "v8",
			reporter: ["text", "html"],
			reportsDirectory: "coverage",
			include: ["src/**/*.{ts,tsx}"],
			exclude: [
				"src/**/*.test.{ts,tsx}",
				"src/test-utils/**",
				"src/gql/**",
				"src/generated/**",
				"src/**/*.d.ts",
			],
		},
	},
});
