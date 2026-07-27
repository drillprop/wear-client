import { setupServer } from "msw/node";

/**
 * The MSW request-mocking server shared by every test, started/stopped in
 * `src/test-utils/setup.ts`. Declared with no default handlers: each test
 * installs the GraphQL responses it needs via `server.use(...)`, so an
 * unmocked operation fails rather than silently hitting the network.
 */
export const server = setupServer();
