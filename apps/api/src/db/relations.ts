import { defineRelations } from "drizzle-orm";
import * as schema from "./schema.js";

/**
 * RQBv2 relations for the Drizzle schema. The skeleton has a single table with
 * no relations, so this is the bare `defineRelations(schema)` form — later
 * slices extend it with `defineRelations(schema, (r) => ({ ... }))`.
 * `@pothos/plugin-drizzle` derives its object types from this config.
 */
export const relations = defineRelations(schema);
