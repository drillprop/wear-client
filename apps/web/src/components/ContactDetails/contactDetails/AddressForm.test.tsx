import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { renderWithApollo } from "@/test-utils/apollo";
import { server } from "@/test-utils/msw/server";
import AddressForm from "./AddressForm";

/**
 * The address form runs the real `Me` + `UpdateAddress` documents through
 * Apollo v4 + MSW (#71): it prefills from the user's address and a save issues
 * the mutation.
 */
function meWithAddress() {
	return {
		id: "1",
		email: "a@b.co",
		firstName: null,
		lastName: null,
		phoneNumber: null,
		role: "CUSTOMER",
		createdAt: "2024-01-01T00:00:00.000Z",
		updatedAt: "2024-01-01T00:00:00.000Z",
		newsletter: false,
		address: {
			addressLine1: "Main St 1",
			addressLine2: null,
			zipCode: null,
			city: null,
			country: null,
		},
	};
}

it("prefills from Me and saves the address", async () => {
	const user = userEvent.setup();
	server.use(
		graphql.query("Me", () =>
			HttpResponse.json({ data: { me: meWithAddress() } }),
		),
		graphql.mutation("UpdateAddress", () =>
			HttpResponse.json({
				data: { updateAddress: { message: "Address saved" } },
			}),
		),
	);

	renderWithApollo(<AddressForm />);

	const line1 = await screen.findByDisplayValue("Main St 1");
	await user.clear(line1);
	await user.type(line1, "Second St 2");
	await user.click(screen.getByRole("button", { name: "save" }));

	expect(await screen.findByText("Address saved")).toBeInTheDocument();
});
