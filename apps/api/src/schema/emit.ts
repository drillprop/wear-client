import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { lexicographicSortSchema, printSchema } from "graphql";
import { schema } from "../graphql/schema.js";

/**
 * Emits the deterministic SDL contract consumed by the web codegen (#36).
 * Sorting lexicographically makes the output stable across builds, so
 * `turbo schema && git diff --exit-code` stays clean in CI.
 */
const sdl = `${printSchema(lexicographicSortSchema(schema))}\n`;
const outPath = fileURLToPath(new URL("../../schema.graphql", import.meta.url));

writeFileSync(outPath, sdl);
console.log(`Wrote ${outPath}`);
