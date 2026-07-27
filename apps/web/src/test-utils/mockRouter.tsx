import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import type { NextRouter } from "next/router";
import type { ReactNode } from "react";
import { vi } from "vitest";

// Minimal Pages-Router mock so components calling useRouter() (e.g. next/link,
// LinkAnchor) can render under test. Next 15's useRouter throws when no router
// is mounted, so tests must provide this context.
export const mockRouter = {
	basePath: "",
	pathname: "/",
	route: "/",
	asPath: "/",
	query: {},
	push: vi.fn(() => Promise.resolve(true)),
	replace: vi.fn(() => Promise.resolve(true)),
	reload: vi.fn(),
	back: vi.fn(),
	forward: vi.fn(),
	prefetch: vi.fn(() => Promise.resolve()),
	beforePopState: vi.fn(),
	events: { on: vi.fn(), off: vi.fn(), emit: vi.fn() },
	isFallback: false,
	isLocaleDomain: false,
	isReady: true,
	isPreview: false,
} as unknown as NextRouter;

export const MockRouterProvider = ({ children }: { children: ReactNode }) => (
	<RouterContext.Provider value={mockRouter}>{children}</RouterContext.Provider>
);
