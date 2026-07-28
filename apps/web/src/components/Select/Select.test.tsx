import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import Select from "./Select";

afterEach(cleanup);

// radix keeps `pointer-events: none` on the body while the listbox is open;
// userEvent would otherwise refuse to click the portalled options.
const user = userEvent.setup({ pointerEventsCheck: 0 });

test("opens the listbox and lists the options", async () => {
	render(
		<Select
			label="label name"
			onChange={() => {}}
			options={["test option a", "test option b"]}
		/>,
	);

	await user.click(screen.getByRole("combobox"));

	expect(
		await screen.findByRole("option", { name: "test option a" }),
	).toBeInTheDocument();
	expect(
		screen.getByRole("option", { name: "test option b" }),
	).toBeInTheDocument();
});

test("selects an option and reflects it on the trigger", async () => {
	const onChange = vi.fn();
	const props = {
		label: "label name",
		onChange,
		options: ["test option a", "test option b"],
	};

	const { rerender } = render(<Select {...props} />);

	await user.click(screen.getByRole("combobox"));
	await user.click(
		await screen.findByRole("option", { name: "test option a" }),
	);

	expect(onChange).toHaveBeenCalledWith("test option a");

	rerender(<Select {...props} value="test option a" />);
	expect(screen.getByRole("combobox")).toHaveTextContent("test option a");
});

test("shows the placeholder until a value is picked", () => {
	render(
		<Select
			label="label name"
			placeHolder="pick one"
			onChange={() => {}}
			options={["test option a"]}
		/>,
	);

	expect(screen.getByRole("combobox")).toHaveTextContent("pick one");
});
