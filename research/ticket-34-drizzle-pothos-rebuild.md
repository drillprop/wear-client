# Ticket #34 — Rebuilding `wear-server` on Drizzle + Pothos (retiring TypeORM + type-graphql)

**Status:** Research / recommendation
**Scope:** Full replacement of the server's data + GraphQL layer — TypeORM → **Drizzle**, type-graphql → **Pothos** (code-first) with `@pothos/plugin-drizzle`, on **Node 24 / NodeNext ESM, decorator-free**. GraphQL + Apollo Client stay on the web side.
**Branch:** `research/drizzle-pothos-rebuild`

All library claims are cited to primary sources (official Drizzle, Pothos, Apollo Server, GraphQL Yoga docs; npm registry for live versions). Codebase facts are cited to the actual `wear-server` files as they stand today. Versions were read from the npm registry on **2026-07-24**.

---

## 0. Baseline — what actually exists in `wear-server` today

Read from the repo (all under `/Users/bartoszdryl/Programming/wear-server/src`):

- **6 TypeORM entities**, all `extends BaseEntity` (Active Record), decorated with both TypeORM (`@Entity/@Column/...`) and type-graphql (`@ObjectType/@Field`) decorators in the same class:
  - `entity/User.ts` — uuid PK; `email`, `password` (`select: false`), `firstName`/`lastName`/`phoneNumber` (snake_case column names), `role` enum (`UserRole` ADMIN/EMPLOYEE/CUSTOMER, default CUSTOMER), `createdAt`/`updatedAt`, `resetToken`/`resetTokenExpiry`, `newsletter`. Relations: `@OneToMany` → `Item.createdBy` (lazy `Promise<Item[]>`), `@OneToMany` → `Order.orderedBy`, `@OneToOne` → `Address` (owning side, `@JoinColumn`). Static helpers `searchUsers`, `findAndSelectPassword` (needs `addSelect('user.password')`).
  - `entity/Item.ts` — uuid PK; `name`, `price` (number), `imageUrl`, `category` enum, `gender` enum, `description`. `@ManyToOne` → `User` (`createdBy`, **`@Authorized(['ADMIN','EMPLOYEE'])` on the field**), `@OneToMany` → `Ordered_Item`, `@OneToMany` → `Size` (`eager: true, cascade: true`). Static `searchItems`, `getMaxPrice` (raw `MAX(price)` query).
  - `entity/Order.ts` — uuid PK; `status` enum (default PENDING), `@ManyToOne` → `User` (`orderedBy`, lazy), `@OneToMany` → `Ordered_Item` (`eager, cascade`). Static `searchOrders`.
  - `entity/Ordered_Item.ts` — uuid PK; `@ManyToOne` → `Order` (`onDelete: CASCADE`), `@ManyToOne` → `Item` (`onDelete: CASCADE, eager`), `sizeSymbol` enum column.
  - `entity/Size.ts` — uuid PK; `sizeSymbol` enum, `quantity` int, `@ManyToOne` → `Item` (`onDelete: CASCADE`); **`@Unique(['sizeSymbol','item'])`**.
  - `entity/Address.ts` — uuid PK; `addressLine1/2`, `zipCode`, `city`, `country`; inverse `@OneToOne` → `User`.
- **Enums** live inside entity files and are registered with type-graphql `registerEnumType`: `UserRole`, `Gender`, `Category`, `OrderStatus`, `SizeSymbol`.
- **`createSchema.ts`** — `buildSchema({ resolvers: [glob of graphql/**/*.{ts,js}], authChecker: customAuthChecker })`. Resolvers are auto-discovered by file glob.
- **`utils/customAuthChecker.ts`** — type-graphql `AuthChecker<Context, UserRole>`; loads `User.findOne({ id: userId })` from `context.userId` and checks `roles.includes(user.role)`. Drives every `@Authorized([...])`.
- **`utils/customSearchBuilder.ts`** — takes a TypeORM entity class + `SearchInput` (`id`, `skip`, `take`, `sortBy`, `sortOrder`) and returns a `SelectQueryBuilder` with `andWhere('id = :id')`, `.skip/.take`, `.orderBy(sortBy, sortOrder)`. Callers then chain `.andWhere(...)` with **string-interpolated values** (e.g. `` `email ilike '%' || '${email}' || '%'` ``) and finish with `.getManyAndCount()`. **This is a SQL-injection hazard today** — the Drizzle rewrite fixes it for free (parameterised operators).
- **`ormconfig.ts`** — `type: 'postgres'`, dev uses `synchronize: true` (no migrations), prod uses `synchronize: false` + `url`. Entities loaded by glob.
- **`index.ts`** — `createConnection(ormConfig)` → `runMigrations()` → `createSchema()` → `new ApolloServer` (**apollo-server-express v2**) with `context: ({req,res}) => ({ req, res, userId: getIdFromToken(req) })`, then `server.applyMiddleware({ app })`.
- **`app.ts`** — Express + `cors({ credentials, origin: FRONTEND_URL })` + `cookieParser()` on `/graphql`.
- **Auth wiring** — `utils/getAndCreatetoken.ts`: `getIdFromToken` reads the `token` cookie and `jwt.verify(..., JWT_SECRET)` → `id`; `createUserToken` signs `{ id, email }` for `7d`. `Login.ts` sets an httpOnly cookie (`sameSite` none/lax by env, `secure` in prod). `checkPassword.ts` uses `bcrypt.compare`.
- **Inputs + validation** — `@InputType()` classes (e.g. `graphql/shared/SearchInput.ts`, `.../RegisterInput.ts`) use `class-validator` decorators (`@IsEmail`, `@Length`, `@IsEnum`) plus custom async validators (`IsEmailNotTaken`, `IsNameNotTaken`).
- **Pagination shape** — `graphql/shared/SelectAndCount.ts` is a type-graphql mixin producing `{ select: [T], count: Int }`; `Items.ts` extends it with `maxPrice`/`minPrice`.
- **Client contract** — `wear-client/codegen.yml` points `schema: ${BACKEND_URL}` (introspection over HTTP) and generates `src/generated/types.ts`. The rebuild should instead **emit `schema.graphql` to disk** so codegen reads a file (the Turborepo task edge from #25).

The current `package.json` is genuinely ancient (Node 12 engine, `apollo-server-express@2`, `type-graphql@0.17`, `typeorm@0.2.21`, `graphql@14`, `tsconfig` with `experimentalDecorators` + `emitDecoratorMetadata` + `import 'reflect-metadata'`). This is a rebuild, not an upgrade.

---

## 1. Live version landscape (npm registry, 2026-07-24)

| Package | `latest` | Notes |
|---|---|---|
| `drizzle-orm` | `0.45.2` (`latest`) — **but** `beta` = `1.0.0-beta.22`, `rc` = **`1.0.0-rc.4`** | The v1 line (RQBv2 / `defineRelations`) is on `beta`/`rc`, **not** `latest`. See §2. |
| `drizzle-kit` | `0.31.10` (`latest`), `rc` = **`1.0.0-rc.4`** | Must match the `drizzle-orm` line you pick. |
| `@pothos/core` | `4.13.1` | peer `graphql: ^16.10.0 \|\| ^17.0.0` |
| `@pothos/plugin-drizzle` | `0.17.5` | peers: `drizzle-orm: >=1.0.0-beta.2`, `graphql: ^16.10 \|\| ^17` — **forces drizzle v1** |
| `@pothos/plugin-scope-auth` | `4.1.7` | replaces `@Authorized` |
| `@apollo/server` | **`5.5.1`** | current major is **5**, not 4 (see §3) |
| `graphql-yoga` | `5.21.2` | |
| `graphql` | **`17.0.2`** | Pothos + Apollo 5 + Yoga all accept 17 |
| `pg` | `8.22.0` | |
| `postgres` (postgres.js) | `3.4.9` | |
| `bcrypt` | `6.0.0` | |
| `jsonwebtoken` | `9.0.3` | |
| `nodemailer` | `9.0.3` | |
| `zod` | `4.4.3` | for the Pothos validation plugin |

**Critical gotcha:** `@pothos/plugin-drizzle@0.17.5` declares `drizzle-orm: >=1.0.0-beta.2` as a peer, and the plugin is built on Drizzle's **Relational Query Builder v2 (RQBv2)** with the new **`defineRelations()`** API. RQBv1 has been removed from the plugin. The `latest` drizzle tag (`0.45.2`) is the **old** RQBv1 line and will **not** satisfy the plugin. You must pin `drizzle-orm@rc` (`1.0.0-rc.4`) — or `@beta` — and the matching `drizzle-kit@rc`. Sources: [npm @pothos/plugin-drizzle](https://www.npmjs.com/package/@pothos/plugin-drizzle), [Pothos Drizzle plugin docs](https://pothos-graphql.dev/docs/plugins/drizzle), [Drizzle Relations v2 / RQBv2](https://orm.drizzle.team/docs/rqb), [Drizzle v0→v1 changes](https://orm.drizzle.team/docs/v0-v1-changes).

> Accepting a pre-1.0 (rc) core dependency is the one real risk in this plan. It is unavoidable if we want `@pothos/plugin-drizzle`, because the plugin only speaks RQBv2. Mitigation: pin exact versions, keep the schema in `defineRelations()` form (the v1 GA shape), and budget one bump when Drizzle v1 GA lands.

---

## 2. Drizzle — modelling the 6 entities

### 2.1 Driver choice — **`node-postgres` (`pg`)**

Drizzle natively supports two pg drivers: **node-postgres** (`drizzle-orm/node-postgres`) and **postgres.js** (`drizzle-orm/postgres-js`). ([Drizzle PostgreSQL connection docs](https://orm.drizzle.team/docs/get-started-postgresql))

**Recommendation: `node-postgres` (`pg`).** Rationale grounded in the docs and the existing app:
- The app already runs `pg` (v7 → bump to 8.22) against a plain managed Postgres — no serverless/edge constraint that would favour postgres.js.
- The Drizzle docs note node-postgres allows **per-query type parsers without global patching**, and that postgres.js uses prepared statements by default which **must be disabled in some environments** (e.g. AWS/PgBouncer transaction pooling) — one less footgun for a conventional Node deployment. ([Drizzle PostgreSQL docs](https://orm.drizzle.team/docs/get-started-postgresql))
- `#22`'s "pg 8, watch the SSL `rejectUnauthorized` default" finding still applies and maps cleanly to node-postgres' `Pool` config.

Setup (pooled):
```ts
// db/client.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { relations } from './relations';

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});
export const db = drizzle(pool, { schema, relations });
```
`drizzle(...)` accepts either a connection string or an existing `Pool`; passing a `Pool` is the pooling story (there is no separate ORM-level pool). ([Drizzle PostgreSQL docs](https://orm.drizzle.team/docs/get-started-postgresql))

### 2.2 Schema — tables + enums

Each TypeORM entity becomes a `pgTable`, each `registerEnumType` becomes a `pgEnum`. Column-name mappings (`first_name`, `created_at`, `size_symbol`, …) are preserved via the column-name argument. Sketch:

```ts
// db/schema.ts
import { pgTable, pgEnum, uuid, varchar, integer, boolean, timestamp, unique } from 'drizzle-orm/pg-core';

export const userRole   = pgEnum('UserRole',   ['ADMIN','EMPLOYEE','CUSTOMER']);
export const gender     = pgEnum('Gender',     ['MAN','WOMAN']);
export const category   = pgEnum('Category',   ['TROUSERS','DRESS','BLOUSE','TSHIRT','SHIRT','JACKET','BLAZER','SWEATSHIRT']);
export const orderStatus= pgEnum('OrderStatus',['PENDING','PAID','SENT','COMPLETED']);
export const sizeSymbol = pgEnum('SizeSymbol', ['XS','S','M','L','XL','XXL']);

export const addresses = pgTable('address', {
  id: uuid('id').primaryKey().defaultRandom(),
  addressLine1: varchar('address_line1'), addressLine2: varchar('address_line2'),
  zipCode: varchar('zip_code'), city: varchar('city'), country: varchar('country'),
});

export const users = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email').notNull(),
  password: varchar('password').notNull(),          // no more `select:false`; withhold in Pothos (§4)
  firstName: varchar('first_name'), lastName: varchar('last_name'), phoneNumber: varchar('phone_number'),
  role: userRole('role').notNull().default('CUSTOMER'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
  resetToken: varchar('reset_token'), resetTokenExpiry: timestamp('reset_token_expiry'),
  newsletter: boolean('newsletter').default(false),
  addressId: uuid('address_id').references(() => addresses.id),   // owning side of the 1:1
});

export const items = pgTable('item', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name').notNull(),
  price: integer('price').notNull(),                 // confirm numeric type vs. current `number`
  imageUrl: varchar('image_url').notNull(),
  category: category('category').notNull(),
  gender: gender('gender').notNull(),
  description: varchar('description'),
  createdById: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
});

export const sizes = pgTable('size', {
  id: uuid('id').primaryKey().defaultRandom(),
  sizeSymbol: sizeSymbol('size_symbol'),
  quantity: integer('quantity'),
  itemId: uuid('item_id').references(() => items.id, { onDelete: 'cascade' }),
}, (t) => [unique().on(t.sizeSymbol, t.itemId)]);     // was @Unique(['sizeSymbol','item'])

export const orders = pgTable('order', {
  id: uuid('id').primaryKey().defaultRandom(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()),
  status: orderStatus('status').notNull().default('PENDING'),
  orderedById: uuid('ordered_by').references(() => users.id),
});

export const orderedItems = pgTable('ordered_item', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }),
  itemId: uuid('item_id').references(() => items.id, { onDelete: 'cascade' }),
  sizeSymbol: sizeSymbol('size_symbol').notNull(),
});
```
Notes:
- TypeORM's `@CreateDateColumn/@UpdateDateColumn` map to `defaultNow()` + `$onUpdate()`.
- `select: false` on `password` has no Drizzle equivalent — it is enforced at the **Pothos** layer by simply not exposing the column (§4). `findAndSelectPassword` becomes an ordinary `db.query.users.findFirst({ columns: { password: true, ... } })`.
- `price` is `number` today with no explicit column type; decide `integer` (cents) vs `numeric` during modelling. Flagged, not assumed.

### 2.3 Relations — RQBv2 `defineRelations()`

`@pothos/plugin-drizzle` requires relations declared via **RQBv2 `defineRelations()`** (a separate object, foreign keys already on the tables). ([Drizzle relations](https://orm.drizzle.team/docs/rqb), [Pothos Drizzle plugin](https://pothos-graphql.dev/docs/plugins/drizzle))

```ts
// db/relations.ts
import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
  users: {
    address:      r.one.addresses({ from: r.users.addressId,  to: r.addresses.id }),
    createdItems: r.many.items(),
    orders:       r.many.orders(),
  },
  items: {
    createdBy:    r.one.users({ from: r.items.createdById, to: r.users.id }),
    sizes:        r.many.sizes(),
    orderedItems: r.many.orderedItems(),
  },
  sizes:  { item:  r.one.items({ from: r.sizes.itemId,  to: r.items.id }) },
  orders: {
    orderedBy:    r.one.users({ from: r.orders.orderedById, to: r.users.id }),
    orderedItems: r.many.orderedItems(),
  },
  orderedItems: {
    order: r.one.orders({ from: r.orderedItems.orderId, to: r.orders.id }),
    item:  r.one.items({ from: r.orderedItems.itemId,  to: r.items.id }),
  },
  addresses: { user: r.one.users({ from: r.addresses.id, to: r.users.addressId }) },
}));
```
- One-to-many → `r.many.x()`; many-to-one / one-to-one → `r.one.x({ from, to })`. ([Drizzle relations](https://orm.drizzle.team/docs/rqb))
- TypeORM `eager: true` (Item→sizes, Order→orderedItems, Ordered_Item→item) has **no schema equivalent** in Drizzle — eager loading is expressed per-query with `with:` (RQBv2) or by `t.relation()` in Pothos, which fetches on demand. This is a behavioural improvement (no accidental over-fetch).
- TypeORM `cascade: true` on insert (Item→sizes, Order→orderedItems) becomes **explicit multi-insert inside a `db.transaction()`** in the resolver. DB-level `onDelete: 'CASCADE'` is preserved via `references(..., { onDelete: 'cascade' })`.

### 2.4 Migrations — `drizzle-kit` replaces `ormconfig` + `synchronize`

`drizzle.config.ts` declares dialect + schema path + migrations output; the workflow is `drizzle-kit generate` (diff schema → SQL file) then `drizzle-kit migrate` (apply). `drizzle-kit push` exists for dev-only direct sync, and `drizzle-kit pull` can introspect the **existing** DB to bootstrap the schema. ([Drizzle Kit overview](https://orm.drizzle.team/docs/kit-overview))

```ts
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: { url: process.env.DB_URL! },
});
```
Mapping from today:
- `ormconfig.ts` dev `synchronize: true` → `drizzle-kit push` locally **only**; never in prod.
- `ormconfig.ts` prod `synchronize: false` + `index.ts` `runMigrations()` → run `drizzle-kit migrate` (or the programmatic `migrate()` from `drizzle-orm/node-postgres/migrator`) as a **deploy step**, replacing the in-process `connection.runMigrations()`.
- Because a live schema already exists, **`drizzle-kit pull` to generate the initial schema/migration is the safe bootstrap** — it guarantees the Drizzle schema matches the current DB before any diff-based migration is generated.

### 2.5 `customSearchBuilder.ts` in Drizzle

The generic builder (id filter + skip/take + orderBy) plus the per-entity `.andWhere(...ilike...)` chains re-express as a composed array of Drizzle operators fed to `db.query.<table>.findMany`, or a core `db.select()` chain. RQBv2 query API supports `where`, `columns`, `with`, `orderBy`, `limit`, `offset`, `extras`. ([Drizzle relations/query](https://orm.drizzle.team/docs/rqb))

```ts
import { and, eq, gte, lte, ilike, asc, desc, sql } from 'drizzle-orm';

async function searchItems(input: SearchItemInput) {
  const where = and(
    input.id       ? eq(items.id, input.id)                       : undefined,
    input.name     ? ilike(items.name, `%${input.name}%`)         : undefined,   // parameterised — no injection
    input.category ? eq(items.category, input.category)           : undefined,
    input.gender   ? eq(items.gender, input.gender)               : undefined,
    input.priceFrom? gte(items.price, input.priceFrom)            : undefined,
    input.priceTo  ? lte(items.price, input.priceTo)              : undefined,
  );
  const [rows, [{ count }]] = await Promise.all([
    db.query.items.findMany({
      where, with: { sizes: true },
      orderBy: input.sortBy
        ? [(input.sortOrder === 'ASC' ? asc : desc)(items[input.sortBy])]
        : undefined,
      limit: input.take ?? 5, offset: input.skip ?? 0,
    }),
    db.select({ count: sql<number>`count(*)` }).from(items).where(where),
  ]);
  return { select: rows, count };
}
```
- `getManyAndCount()` → run the rows query and a `count(*)` query with the **same `where`** (or Drizzle's `db.$count(table, where)` helper).
- `available` (`size.quantity > 0`) → either a `having`/join filter or filter loaded `sizes`. The `MAX(price)` in `getMaxPrice` → `db.select({ maxPrice: sql<number>`max(${items.price})` })`.
- Passing `items[input.sortBy]` requires validating `sortBy` against a column allowlist (it is a free-form string today) — do this in the input/validation layer.

---

## 3. GraphQL host — **recommend GraphQL Yoga** (Apollo Server 5 as the conservative alternative)

The ticket asked to weigh `@apollo/server` **4** vs Yoga. Reality check: **Apollo Server's current major is 5** (`@apollo/server@5.5.1`), not 4 — so "Apollo 4" from the ticket text is already superseded (this matches `#22`'s "Apollo Server 5 GA" note). Apollo 5 requires **Node ≥ 20** and **graphql-js ≥ 16.11** as a peer, and its Express integration is now a **separate package** (`@as-integrations/express4` or `@as-integrations/express5`), imported as `@as-integrations/express4` rather than the old `@apollo/server/express4`. ([Apollo Server migration docs](https://www.apollographql.com/docs/apollo-server/migration))

Both hosts accept any `GraphQLSchema`, so both work with a Pothos-built schema. ([GraphQL Yoga schema docs](https://the-guild.dev/graphql/yoga-server/docs/features/schema))

**Recommendation: GraphQL Yoga (`graphql-yoga@5`).** Rationale grounded in this codebase:
- The app's Express usage is minimal — `cors` + `cookie-parser` on `/graphql` only. There is no deep Express-middleware investment to preserve, so Apollo's Express-integration advantage is nearly moot here.
- Yoga runs natively on Node with a Fetch-API `request` in context and **also exposes Node `req`/`res`** for cookie handling — a clean fit for the existing httpOnly-JWT-cookie flow. Custom context is a single `context: async ({ request, req, res }) => ({...})` factory. ([Yoga context docs](https://the-guild.dev/graphql/yoga-server/docs/features/context))
- Yoga is first-class ESM and pairs naturally with a code-first Pothos schema; it can run standalone (`createYoga` + `node:http`) or as Express middleware, so we can drop Express entirely later without a rewrite.
- Client-side Apollo Client is **unaffected** — host choice is a server concern; the wire protocol is identical.

Cookie/JWT wiring under Yoga (replacing `getIdFromToken` + `res.cookie`):
```ts
import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';

const yoga = createYoga({
  schema,   // Pothos-built (§4)
  context: async ({ request, req, res }) => {
    const token = parseCookie(request.headers.get('cookie'))?.token;
    const userId = token ? (jwt.verify(token, process.env.JWT_SECRET!) as any).id : null;
    return { request, req, res, userId };   // Login mutation sets the cookie via res
  },
  cors: { credentials: true, origin: process.env.FRONTEND_URL },
});
createServer(yoga).listen(process.env.PORT ?? 4000);
```
Yoga has built-in CORS, so the standalone server drops `express`, `cors`, `cookie-parser`, `body-parser` outright.

**If the team prefers to keep Express + Apollo tooling:** use `@apollo/server@5` + `@as-integrations/express4` (or migrate Express to 5 + `express5`). Same Pothos schema, same context shape; you keep `express`/`cookie-parser`. This is the lower-novelty path but carries more dependencies. Either satisfies the decorator-free / Node 24 goal.

---

## 4. Pothos — replacing type-graphql

### 4.1 Builder + plugins

`createSchema.ts`'s `buildSchema({ resolvers: glob })` becomes an explicit `SchemaBuilder` wired with the Drizzle, scope-auth, and validation plugins. ([Pothos Drizzle plugin](https://pothos-graphql.dev/docs/plugins/drizzle), [scope-auth](https://pothos-graphql.dev/docs/plugins/scope-auth), [validation](https://pothos-graphql.dev/docs/plugins/validation))

```ts
// builder.ts
import SchemaBuilder from '@pothos/core';
import DrizzlePlugin from '@pothos/plugin-drizzle';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import ValidationPlugin from '@pothos/plugin-validation';
import { db } from './db/client';
import { relations } from './db/relations';

export interface Context { userId: string | null; req: any; res: any; request: Request; }

export const builder = new SchemaBuilder<{
  Context: Context;
  DrizzleRelations: typeof relations;
  AuthScopes: { public: boolean; loggedIn: boolean; staff: boolean; admin: boolean };
}>({
  plugins: [ScopeAuthPlugin, DrizzlePlugin, ValidationPlugin],
  drizzle: { client: db, relations },
  scopeAuth: {
    authScopes: async (ctx) => {
      const user = ctx.userId ? await db.query.users.findFirst({ where: { id: ctx.userId } }) : null;
      return {
        public:   true,
        loggedIn: !!user,
        staff:    user?.role === 'ADMIN' || user?.role === 'EMPLOYEE',
        admin:    user?.role === 'ADMIN',
      };
    },
  },
});
```

### 4.2 Object types from Drizzle tables

`@ObjectType()` classes + `@Field()` become `builder.drizzleObject()` with `t.expose*` for columns and `t.relation()` for relations (the plugin infers the related type and batches the load). `password` is simply **never exposed** — replacing `select: false`. The `@Authorized(['ADMIN','EMPLOYEE'])` on `Item.createdBy` becomes a field-level `authScopes: { staff: true }`.

```ts
export const UserType = builder.drizzleObject('users', {
  name: 'User',
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    firstName: t.exposeString('firstName', { nullable: true }),
    role: t.expose('role', { type: UserRoleEnum }),
    address: t.relation('address', { nullable: true }),
    createdItems: t.relation('createdItems'),
    // no `password` field → withheld
  }),
});

export const ItemType = builder.drizzleObject('items', {
  name: 'Item',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    price: t.exposeInt('price'),
    sizes: t.relation('sizes'),
    createdBy: t.relation('createdBy', { authScopes: { staff: true } }), // was @Authorized
  }),
});
```
Enums: `builder.enumType(UserRole, { name: 'UserRole' })` (from the string-union / native enum) replaces `registerEnumType`.

The `SelectAndCount` mixin → a plain `builder.objectRef<{ select: Item[]; count: number }>('ItemsAndCount')` (or `builder.simpleObject`) with `select`/`count`/`maxPrice`/`minPrice` fields.

### 4.3 Queries / mutations

`@Query`/`@Mutation`/`@Resolver` classes discovered by glob become `builder.queryFields`/`mutationFields`, or `t.drizzleField()` when the resolver returns a Drizzle-backed type (it threads GraphQL field selection into the DB query). ([Pothos Drizzle plugin](https://pothos-graphql.dev/docs/plugins/drizzle))

```ts
builder.mutationFields((t) => ({
  createItem: t.drizzleField({
    type: 'items',
    args: { input: t.arg({ type: CreateItemInput }) },
    authScopes: { staff: true },             // replaces @Authorized(['ADMIN','EMPLOYEE'])
    resolve: async (query, _root, { input }, ctx) => {
      const [item] = await db.insert(items).values({ ...input, createdById: ctx.userId! }).returning();
      return db.query.items.findFirst({ ...query, where: { id: item.id } });
    },
  }),
}));
```
`CreateOrder`'s cascade (decrement `size.quantity`, insert `ordered_item`s, insert `order`) becomes an explicit `db.transaction(async (tx) => { ... })` — replacing TypeORM `cascade` + `.save()`.

### 4.4 Auth — scope-auth replaces `customAuthChecker`

The scope-auth plugin runs a **per-request scope initializer** and enforces `authScopes` on fields/types before resolution; scopes compose with `$all`/`$any`. This replaces `AuthChecker` + `@Authorized([...])` one-for-one: `@Authorized(['ADMIN','EMPLOYEE'])` → `authScopes: { staff: true }`; a logged-in-only field → `authScopes: { loggedIn: true }`. ([scope-auth docs](https://pothos-graphql.dev/docs/plugins/scope-auth)) The `context.userId` derivation stays exactly as today (JWT cookie → id), just moved into the host's `context` factory (§3).

### 4.5 Inputs + validation — Pothos validation plugin + Zod, replacing class-validator

`@InputType()` classes → `builder.inputType('CreateItemInput', { fields: (t) => ({ ... }) })`. The `class-validator` decorators (`@IsEmail`, `@Length`, `@IsEnum`) move to the **Pothos validation plugin**, which is library-agnostic via the **standard-schema** interface (Zod 4 / Valibot / ArkType) and is the currently-recommended validation approach; a dedicated Zod plugin also exists but standard-schema is the future-proof one. ([Pothos validation docs](https://pothos-graphql.dev/docs/plugins/validation)) Custom async validators (`IsEmailNotTaken`, `IsNameNotTaken`) become either a refinement in the schema or an explicit uniqueness check in the resolver (a `db.query...findFirst` before insert).

```ts
import { z } from 'zod';
const RegisterInput = builder.inputType('RegisterInput', {
  fields: (t) => ({
    email:    t.string({ validate: { schema: z.string().email().max(255) } }),
    password: t.string({ validate: { schema: z.string().min(6).max(255) } }),
  }),
});
```

### 4.6 Emitting `schema.graphql` to disk (for the web app's codegen)

Pothos builds a standard `GraphQLSchema`, so the SDL is written with graphql-js `printSchema` (+ `lexicographicSortSchema` for stable diffs) in a small build script — the Turborepo task edge from #25, replacing `wear-client/codegen.yml`'s `schema: ${BACKEND_URL}` (live introspection) with a committed `schema.graphql` file.

```ts
// scripts/print-schema.ts
import { writeFileSync } from 'node:fs';
import { printSchema, lexicographicSortSchema } from 'graphql';
import { schema } from '../src/schema';
writeFileSync('schema.graphql', printSchema(lexicographicSortSchema(schema)));
```
Then `wear-client/codegen.yml` → `schema: ../wear-server/schema.graphql` (or the monorepo path per #28), and the Turborepo pipeline makes client codegen depend on the server's `print-schema` output.

---

## 5. Decorator-free / Node 24 / NodeNext ESM — confirmed

The entire target stack is plain-function / plain-object and needs **no decorators and no `reflect-metadata`**:
- **Drizzle** — schema is `pgTable(...)` calls and `defineRelations(...)`; no decorators, no metadata reflection. ([Drizzle docs](https://orm.drizzle.team/docs/rqb))
- **Pothos** — a code-first `SchemaBuilder` using functions/methods; explicitly not a decorator system (unlike type-graphql/TypeGraphQL). ([Pothos docs](https://pothos-graphql.dev/docs/plugins/drizzle))
- **Validation** — Zod/standard-schema, plain values; no `class-validator` decorators.
- **Host** — Apollo Server 5 (Node ≥ 20, [Apollo migration](https://www.apollographql.com/docs/apollo-server/migration)) or Yoga 5, both plain ESM.

Consequences for `tsconfig`:
- **Delete** `experimentalDecorators`, `emitDecoratorMetadata`, and the `import 'reflect-metadata'` in `index.ts`.
- Move to `"module": "NodeNext"`, `"moduleResolution": "NodeNext"`, `"target": "ES2023"` (Node 24), `"type": "module"` in `package.json`.
- **This unblocks `#26`** — with decorators gone, `verbatimModuleSyntax` can stay on everywhere (decorator metadata emission was the thing that fought `verbatimModuleSyntax`/`isolatedModules`).

---

## 6. What survives from `#22` vs. what is superseded

**Still holds (informs #31):**
- **Node 24 LTS** target — unchanged.
- **`bcrypt` 6** (native rebuild for the new Node), **`jsonwebtoken` 9** (rejects unsigned tokens by default) — both still current; keep the JWT-cookie auth flow verbatim. *(Note: `nodemailer` is now **9.0.3**, a further bump beyond #22's "nodemailer 7".)*
- **`pg` 8** with the SSL `rejectUnauthorized` caveat — carries directly into the Drizzle node-postgres `Pool`.
- **Apollo Server 5 is GA / current** — #22 was right; the ticket's "Apollo 4" is the stale bit.

**Superseded by this re-scope:**
- ❌ **graphql pinned to 16.** #22 held graphql at 16 *because type-graphql 2 required it*. With type-graphql gone, **graphql 17 is unblocked** — Pothos (`^16.10 || ^17`), Apollo 5 (`≥16.11`) and Yoga all accept 17. Adopt **graphql 17**.
- ❌ **TypeORM 0.3 → 1.0 migration, `findOne`→`findOneBy` rewrites, DataSource migration.** Entire ORM replaced by Drizzle; no TypeORM upgrade path is walked.
- ❌ **type-graphql 2.x + `class-validator`.** Replaced by Pothos + Pothos validation plugin (Zod).
- ❌ **Apollo `applyMiddleware`/`playground` removal notes** — relevant only if staying on Apollo; the Yoga recommendation sidesteps them.

---

## 7. Recommended package set

**Runtime**
```
drizzle-orm@1.0.0-rc.4         # RQBv2 / defineRelations — REQUIRED by @pothos/plugin-drizzle (pin exact)
pg@^8.22
@pothos/core@^4.13
@pothos/plugin-drizzle@^0.17.5
@pothos/plugin-scope-auth@^4.1
@pothos/plugin-validation@^4    # standard-schema
zod@^4.4
graphql@^17.0
graphql-yoga@^5.21             # host (primary recommendation)
jsonwebtoken@^9.0
bcrypt@^6.0
nodemailer@^9.0
dotenv@^17 (or Node 24 --env-file)
```
**Dev**
```
drizzle-kit@1.0.0-rc.4         # match drizzle-orm line (pin exact)
typescript@^5.9  (or TS 7 native per #22, holding graphql at 17)
@types/pg  @types/jsonwebtoken  @types/bcrypt  @types/nodemailer  @types/node@24
tsx (or ts-node ESM) for dev
```
**Alternative host (keep Express):** `@apollo/server@^5` + `@as-integrations/express4` + `express@^4` (+ `cors`, `cookie-parser`) instead of `graphql-yoga`.

**Dropped:** `typeorm`, `type-graphql`, `reflect-metadata`, `class-validator`, `apollo-server-express`, `body-parser`, `lodash.merge`, `@types/graphql` — and, on the Yoga path, `express`/`cors`/`cookie-parser` too.

---

## 8. Sequenced rebuild plan (feeds #31)

1. **Toolchain / ESM base.** New `package.json` (`"type":"module"`, Node 24 engine), `tsconfig` → NodeNext ESM, `target: ES2023`, **remove** `experimentalDecorators`/`emitDecoratorMetadata`, keep `verbatimModuleSyntax` on. Delete `reflect-metadata`. Unblocks **#26**.
2. **Drizzle schema + relations.** Write `db/schema.ts` (6 tables + 5 enums, snake_case columns preserved) and `db/relations.ts` (`defineRelations`). Bootstrap by `drizzle-kit pull` against the existing DB, then reconcile.
3. **DB client + migrations.** `db/client.ts` (node-postgres `Pool` + `drizzle`), `drizzle.config.ts`. Replace `ormconfig.ts`; replace in-process `runMigrations()` with a `drizzle-kit migrate` deploy step. Delete `synchronize`.
4. **Pothos builder + object types.** `builder.ts` (Drizzle + scope-auth + validation plugins), `drizzleObject` for all 6 types + enums, `t.relation()` for edges, withhold `password`. Emits the type layer.
5. **Auth + context.** Port `userId`-from-JWT-cookie into the host context factory; define `authScopes` (public/loggedIn/staff/admin); map every `@Authorized([...])` → `authScopes`.
6. **Inputs + validation.** Port `@InputType` classes → `builder.inputType`; move class-validator rules → Zod via the validation plugin; re-implement `IsEmailNotTaken`/`IsNameNotTaken` as resolver-side uniqueness checks.
7. **Queries/mutations + search builder.** Port each resolver to `builder.queryFields`/`mutationFields`/`drizzleField`; re-express `customSearchBuilder` as composed Drizzle operators (§2.5); `CreateOrder` cascade → `db.transaction`. Parameterised operators close the current SQL-injection hole.
8. **Host.** Stand up `graphql-yoga` (`createYoga` + `node:http`), built-in CORS, cookie/JWT context. (Or Apollo 5 + `@as-integrations/express4` if keeping Express.)
9. **Schema emission + codegen edge.** `scripts/print-schema.ts` → `schema.graphql`; point `wear-client/codegen.yml` at the file; wire the Turborepo task dependency (**#25/#28**).
10. **Verify & cut over.** Boot against a copy of prod data; parity-check queries/mutations/auth; run client codegen off the emitted SDL; then retire the TypeORM/type-graphql tree.

Steps 1–3 (data layer) and 4–9 (GraphQL layer) are the two natural PR clusters; step 2's `drizzle-kit pull` de-risks schema drift before anything is generated.
