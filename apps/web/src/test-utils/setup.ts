import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "./msw/server";

/**
 * jsdom lacks the pointer-capture / scroll / resize APIs the radix overlay
 * primitives (Select, Dialog, …) probe on open (#84). Stub them so those
 * primitives can be driven with `userEvent` in tests.
 */
if (typeof window !== "undefined") {
	Element.prototype.scrollIntoView = vi.fn();
	Element.prototype.hasPointerCapture = vi.fn(() => false);
	Element.prototype.setPointerCapture = vi.fn();
	Element.prototype.releasePointerCapture = vi.fn();
	if (!("ResizeObserver" in window)) {
		window.ResizeObserver = class {
			observe() {}
			unobserve() {}
			disconnect() {}
		};
	}
}

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
