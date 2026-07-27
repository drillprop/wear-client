import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { renderWithApollo } from "@/test-utils/apollo";
import { AppRouterProvider } from "@/test-utils/appRouter";
import { server } from "@/test-utils/msw/server";
import ItemRow from "./ItemRow";

/**
 * The admin item row runs the real `DeleteItem` document through Apollo v4 + MSW
 * (#72): clicking delete issues the staff catalogue-delete mutation.
 */
it("deletes an item via the DeleteItem mutation", async () => {
	const user = userEvent.setup();
	let deleted = false;
	server.use(
		graphql.mutation("DeleteItem", () => {
			deleted = true;
			return HttpResponse.json({ data: { deleteItem: { message: "gone" } } });
		}),
	);

	renderWithApollo(
		<AppRouterProvider>
			<table>
				<tbody>
					<ItemRow
						id="item-1"
						name="Linen shirt"
						price={120}
						imageUrl="/img.jpg"
						category="SHIRT"
						gender="MAN"
						variables={{ take: 5, skip: 0 }}
					/>
				</tbody>
			</table>
		</AppRouterProvider>,
	);

	await user.click(screen.getByText("delete item"));

	await waitFor(() => expect(deleted).toBe(true));
});
