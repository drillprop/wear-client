import { isValidElement } from "react";
import { vi } from "vitest";

/**
 * The reverse gate (#70) is server logic: `me` runs server-side and an
 * authenticated visitor is redirected before the forms render. `rsc` is mocked
 * (it is `server-only`, so it cannot be imported under test) and `redirect` is
 * the real Next helper, which throws `NEXT_REDIRECT` — so we assert the page
 * throws when signed in and returns an element when signed out.
 */
vi.mock("@/app/lib/apollo/rsc", () => ({
	query: vi.fn(),
	PreloadQuery: () => null,
}));

import { query } from "@/app/lib/apollo/rsc";
import SignPage from "./page";

const mockedQuery = vi.mocked(query);

it("reverse-gates an authenticated visitor away from /sign", async () => {
	mockedQuery.mockResolvedValue({ data: { me: { id: "1" } } } as never);

	await expect(SignPage()).rejects.toThrow(/NEXT_REDIRECT/);
});

it("renders the sign forms for a signed-out visitor", async () => {
	mockedQuery.mockResolvedValue({ data: { me: null } } as never);

	const element = await SignPage();

	expect(isValidElement(element)).toBe(true);
});
