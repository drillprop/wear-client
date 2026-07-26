import { builder } from "./builder.js";

/**
 * The empty root `Query` and `Mutation` types. Each resolver module attaches its
 * fields with `builder.queryField` / `builder.mutationField`, so these roots must
 * exist first — `schema.ts` imports this module before any field module.
 */
builder.queryType({});
builder.mutationType({});
