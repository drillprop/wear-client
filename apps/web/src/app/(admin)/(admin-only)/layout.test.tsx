import { isValidElement } from "react";
import { vi } from "vitest";

/**
 * The nested ADMIN-only gate (#72): user-administration routes admit ADMIN only,
 * so an EMPLOYEE (staff, but not ADMIN) is redirected away — restoring the old
 * per-page `withPrivateRoute(..., "ADMIN")`.
 */
vi.mock("@/app/lib/apollo/rsc", () => ({ query: vi.fn() }));

import { query } from "@/app/lib/apollo/rsc";
import AdminOnlyLayout from "./layout";

const mockedQuery = vi.mocked(query);

it("redirects a non-ADMIN staff member (EMPLOYEE) away", async () => {
	mockedQuery.mockResolvedValue({
		data: { me: { id: "1", role: "EMPLOYEE" } },
	} as never);
	await expect(AdminOnlyLayout({ children: "users" })).rejects.toThrow(
		/NEXT_REDIRECT/,
	);
});

it("renders for an ADMIN", async () => {
	mockedQuery.mockResolvedValue({
		data: { me: { id: "1", role: "ADMIN" } },
	} as never);
	const element = await AdminOnlyLayout({ children: "users" });
	expect(isValidElement(element)).toBe(true);
});
