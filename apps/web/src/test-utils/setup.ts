import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./msw/server";

/**
 * Global test setup (#68). Registers the jest-dom matchers on Vitest's `expect`
 * (the `/vitest` entry, replacing Jest's `setupFilesAfterEach`) and runs the MSW
 * request-mocking server for the whole suite: any unhandled GraphQL request fails
 * loudly so a drifted or missing handler surfaces as a test error, and per-test
 * `server.use(...)` overrides are reset between tests.
 */
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
