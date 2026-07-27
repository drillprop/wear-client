import { isValidElement } from "react";
import { vi } from "vitest";

/**
 * The `(admin)` staff gate (#72): anonymous → sign-in, signed-in non-staff → home,
 * staff → children. `rsc` is mocked (`server-only`); `redirect` is the real Next
 * helper and throws `NEXT_REDIRECT`.
 */
vi.mock("@/app/lib/apollo/rsc", () => ({ query: vi.fn() }));

import { query } from "@/app/lib/apollo/rsc";
import AdminLayout from "./layout";

const mockedQuery = vi.mocked(query);

it("redirects an anonymous visitor to sign-in", async () => {
	mockedQuery.mockResolvedValue({ data: { me: null } } as never);
	await expect(AdminLayout({ children: "admin" })).rejects.toThrow(
		/NEXT_REDIRECT/,
	);
});

it("redirects a signed-in non-staff customer away", async () => {
	mockedQuery.mockResolvedValue({
		data: { me: { id: "1", role: "CUSTOMER" } },
	} as never);
	await expect(AdminLayout({ children: "admin" })).rejects.toThrow(
		/NEXT_REDIRECT/,
	);
});

it("renders the admin children for staff", async () => {
	mockedQuery.mockResolvedValue({
		data: { me: { id: "1", role: "EMPLOYEE" } },
	} as never);
	const element = await AdminLayout({ children: "admin" });
	expect(isValidElement(element)).toBe(true);
});
