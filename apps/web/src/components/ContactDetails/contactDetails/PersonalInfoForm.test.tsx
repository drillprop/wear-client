import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { graphql, HttpResponse } from "msw";
import { renderWithApollo } from "@/test-utils/apollo";
import { server } from "@/test-utils/msw/server";
import PersonalInfoForm from "./PersonalInfoForm";

/**
 * The account personal-info form runs the real `Me` + `UpdatePersonalInfo`
 * documents through Apollo v4 + MSW (#71): it prefills from the signed-in user,
 * and a save issues the mutation, surfacing the success message.
 */
function meWith(overrides: Record<string, unknown>) {
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
		address: null,
		...overrides,
	};
}

it("prefills from Me and saves updated personal info", async () => {
	const user = userEvent.setup();
	server.use(
		graphql.query("Me", () =>
			HttpResponse.json({ data: { me: meWith({ firstName: "John" }) } }),
		),
		graphql.mutation("UpdatePersonalInfo", () =>
			HttpResponse.json({
				data: { updatePersonalInfo: { message: "Saved" } },
			}),
		),
	);

	renderWithApollo(<PersonalInfoForm />);

	const firstName = await screen.findByDisplayValue("John");
	await user.clear(firstName);
	await user.type(firstName, "Jane");
	await user.click(screen.getByRole("button", { name: "save" }));

	expect(await screen.findByText("Saved")).toBeInTheDocument();
});
