import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
	PathnameContext,
	PathParamsContext,
	SearchParamsContext,
} from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import type { ReactNode } from "react";
import { vi } from "vitest";

// Minimal App Router mock so client components that call useRouter()/next/link
// can render under test. App Router's hooks throw when no router is mounted, so
// tests rendering the App Router tree must provide this context — the App Router
// counterpart to the Pages-Router `mockRouter`.
export const mockAppRouter: AppRouterInstance = {
	push: vi.fn(),
	replace: vi.fn(),
	refresh: vi.fn(),
	back: vi.fn(),
	forward: vi.fn(),
	prefetch: vi.fn(),
};

export const AppRouterProvider = ({ children }: { children: ReactNode }) => (
	<AppRouterContext.Provider value={mockAppRouter}>
		<PathnameContext.Provider value="/">
			<SearchParamsContext.Provider value={new URLSearchParams()}>
				<PathParamsContext.Provider value={{}}>
					{children}
				</PathParamsContext.Provider>
			</SearchParamsContext.Provider>
		</PathnameContext.Provider>
	</AppRouterContext.Provider>
);
