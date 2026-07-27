# Wear e-commerce shop

_**This project is still work in progress!**_

Full-stack e-commerce application based on React, Typescript and Node.js. The application has every feature which modern e-commerce websites offer - authentication system, products list with filters, search bar, cart and others.

Besides regular clothing shop, the website has also admin panel, where permitted users can manage products, users and orders.

You can find backend code [here](https://github.com/drillprop/wear-server)

## Screenshots

![screenshop](https://user-images.githubusercontent.com/51168865/82324039-40a92000-99d9-11ea-824c-90a870a407e9.png)

![screenshop2](https://user-images.githubusercontent.com/51168865/82324035-3edf5c80-99d9-11ea-9786-5abdcc158617.png)

## Development

This is a pnpm + Turborepo monorepo (`apps/web` — Next.js App Router client;
`apps/api` — GraphQL Yoga server). From the repo root:

```bash
pnpm install
pnpm dev
```

`pnpm dev` runs the full watch loop in parallel: the API server, the
`schema.graphql` emitter (watch), the web codegen (watch), and `next dev`.
Editing an API resolver re-emits the schema, which regenerates the web GraphQL
types, which Next picks up. Copy [`apps/web/.env.example`](apps/web/.env.example)
to `apps/web/.env` first.

## Deployment

`apps/web` deploys to Vercel; the API is hosted separately behind a same-origin
proxy. See [docs/deployment.md](docs/deployment.md) for the Vercel
Root-Directory, build, env-var, and preview wiring.

## Technologies

I structured my files with [the fractal pattern](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af)

#### Frontend

- [react](https://reactjs.org/)
- [nextjs](https://nextjs.org/)
- [graphql-code-generator](https://graphql-code-generator.com/)
- [apollo](https://www.apollographql.com/)
- [styled-components](https://www.styled-components.com/)

#### Backend

- [apollo-server](https://www.apollographql.com/)
- [type-graphql](https://typegraphql.com/)
- [nodemailer](https://nodemailer.com/)
- [typeorm](https://typeorm.io/)
- [postgresql](https://www.postgresql.org/)

## Demo

[Wear](http://wear.drillprops.usermd.net/)

If you want to play around, you can sign in with this email and password:

#### as admin:

    email: testadmin@example.com
    password: testadmin

#### as employee:

    email: testemployee@example.com
    password: testemployee

#### as regular customer:

    email: testuser@example.com
    password: testuser
