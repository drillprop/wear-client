import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import type { NextRouter } from "next/router";
import type { ReactNode } from "react";

// Minimal Pages-Router mock so components calling useRouter() (e.g. next/link,
// LinkAnchor) can render under test. Next 15's useRouter throws when no router
// is mounted, so tests must provide this context.
export const mockRouter = {
	basePath: "",
	pathname: "/",
	route: "/",
	asPath: "/",
	query: {},
	push: jest.fn(() => Promise.resolve(true)),
	replace: jest.fn(() => Promise.resolve(true)),
	reload: jest.fn(),
	back: jest.fn(),
	forward: jest.fn(),
	prefetch: jest.fn(() => Promise.resolve()),
	beforePopState: jest.fn(),
	events: { on: jest.fn(), off: jest.fn(), emit: jest.fn() },
	isFallback: false,
	isLocaleDomain: false,
	isReady: true,
	isPreview: false,
} as unknown as NextRouter;

export const MockRouterProvider = ({ children }: { children: ReactNode }) => (
	<RouterContext.Provider value={mockRouter}>{children}</RouterContext.Provider>
);
