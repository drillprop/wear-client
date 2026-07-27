import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { vi } from "vitest";
import { renderWithApollo } from "@/test-utils/apollo";
import { server } from "@/test-utils/msw/server";
import CreateItemForm from "./CreateItemForm";

// The image upload hits Cloudinary over the network; stub it so the test stays on
// the GraphQL seam (the real `CreateItem` document through Apollo v4 + MSW).
vi.mock("../../../utils/uploadImageToCloudinary", () => ({
	default: vi.fn(() => Promise.resolve({ secure_url: "http://img/x.jpg" })),
}));

it("creates an item via the CreateItem mutation", async () => {
	const user = userEvent.setup();
	server.use(
		graphql.mutation("CreateItem", () =>
			HttpResponse.json({
				data: {
					createItem: {
						id: "new-1",
						name: "Linen shirt",
						price: 120,
						imageUrl: "http://img/x.jpg",
						category: "SHIRT",
						gender: "MAN",
						createdAt: "2024-01-01T00:00:00.000Z",
						sizes: [],
					},
				},
			}),
		),
	);

	renderWithApollo(<CreateItemForm variables={{ take: 5, skip: 0 }} />);

	await user.type(screen.getByLabelText("name"), "Linen shirt");
	await user.click(screen.getByRole("button", { name: "save" }));

	expect(
		await screen.findByText("Succesfully create item"),
	).toBeInTheDocument();
});
