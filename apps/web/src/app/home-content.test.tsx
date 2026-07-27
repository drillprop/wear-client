import { render, screen } from "@testing-library/react";
import { AppRouterProvider } from "@/test-utils/appRouter";
import HomeContent from "./home-content";

/**
 * The home page is static after the App Router cutover (#73): two category
 * tiles linking into the shop. No data fetching — the MSW+Apollo data path is
 * covered by the real data-page tests (shop, account, admin).
 */
it("renders the two category tiles linking into the shop", () => {
	render(
		<AppRouterProvider>
			<HomeContent />
		</AppRouterProvider>,
	);

	expect(screen.getByRole("link", { name: /for her/i })).toHaveAttribute(
		"href",
		"/shop/woman",
	);
	expect(screen.getByRole("link", { name: /for him/i })).toHaveAttribute(
		"href",
		"/shop/man",
	);
});
