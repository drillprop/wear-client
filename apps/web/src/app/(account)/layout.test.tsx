import { isValidElement } from "react";
import { vi } from "vitest";

/**
 * The `(account)` server-layout gate (#71): `me` runs server-side and a
 * signed-out visitor is redirected to sign-in before children render. `rsc` is
 * mocked (`server-only`, un-importable under test); `redirect` is the real Next
 * helper and throws `NEXT_REDIRECT`.
 */
vi.mock("@/app/lib/apollo/rsc", () => ({
	query: vi.fn(),
	PreloadQuery: ({ children }: { children: unknown }) => children,
}));

import { query } from "@/app/lib/apollo/rsc";
import AccountLayout from "./layout";

const mockedQuery = vi.mocked(query);

it("redirects a signed-out visitor to sign-in before rendering children", async () => {
	mockedQuery.mockResolvedValue({ data: { me: null } } as never);

	await expect(AccountLayout({ children: "protected" })).rejects.toThrow(
		/NEXT_REDIRECT/,
	);
});

it("renders the account children for a signed-in customer", async () => {
	mockedQuery.mockResolvedValue({
		data: { me: { id: "1", role: "CUSTOMER" } },
	} as never);

	const element = await AccountLayout({ children: "protected" });

	expect(isValidElement(element)).toBe(true);
});
