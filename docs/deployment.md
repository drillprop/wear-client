# Deployment (Vercel)

`apps/web` deploys to Vercel from this pnpm + Turborepo monorepo. `apps/api`
(the Yoga GraphQL server) is hosted separately — the web app never exposes the
API origin to the browser (see [Same-origin proxy](#same-origin-proxy)).

## Vercel project settings

| Setting | Value | Why |
| --- | --- | --- |
| **Root Directory** | `apps/web` | Vercel detects the enclosing Turborepo and runs the build with `turbo`, so the `build → codegen → @wear/api#schema` task edge fires. `Include files outside the root directory` must stay **on** (default) so `codegen.ts` can read `../api/schema.graphql`. |
| **Install Command** | _default_ (`pnpm install` at the workspace root) | Installs the whole workspace so `@wear/api`'s committed `schema.graphql` is present. |
| **Build Command** | _default_ (Turborepo-aware) | Resolves to `turbo run build --filter=@wear/web`. `@wear/web#build` `dependsOn` `codegen`, which `dependsOn` `@wear/api#schema`. |
| **Output Directory** | _default_ (`.next`) | Standard Next.js output. |

The web build **does not need a running API or database**: codegen reads the
committed, lexicographically-sorted `apps/api/schema.graphql` by relative path,
never a live endpoint. A fresh clone (and a cold Vercel build) typechecks and
builds offline.

## Environment variables

Set these in Vercel → Project → Settings → Environment Variables. See
[`apps/web/.env.example`](../apps/web/.env.example) for the annotated list.

| Var | Scope | Notes |
| --- | --- | --- |
| `INTERNAL_API_URL` | Server-only | The deployed `apps/api` GraphQL endpoint. Read only on the server (proxy route handler + RSC Apollo client); **never inlined** into the browser bundle. |
| `API_SHARED_SECRET` | Server-only | Injected on the server→API hop (#32). |
| `CLOUDINARY_PRESET`, `CLOUDINARY_UPLOAD_URL` | Public | Mapped in `next.config.js`, so they reach the browser for the unsigned staff image upload. |

Point `INTERNAL_API_URL` at whichever API deployment matches the environment —
the production API for Production, a staging/preview API for Preview. Because
it is a plain server-side env var, Preview and Production can target different
backends without any code change.

## Same-origin proxy

The browser only ever talks to the relative `/api/graphql` on the web origin.
The App Router route handler (`src/app/api/graphql/route.ts`) and the RSC Apollo
client forward operations server-to-server to `INTERNAL_API_URL`, so the API
origin and the shared secret never reach the client. This is why the API host
can stay private and CORS-free.

## Preview deployments

Every push/PR gets a Vercel Preview URL. Previews build from the committed
schema exactly like Production; the only per-environment difference is the
`INTERNAL_API_URL` (and secret) you scope to Preview vs Production above.
