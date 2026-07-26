import { render } from "@testing-library/react";
import CartContextProvider from "../../contexts/CartContext";
import { cartContextRender } from "../../test-utils/cartContextRender";
import { MockRouterProvider } from "../../test-utils/mockRouter";
import Cart from "./Cart";

it("throw error if there is no CartProvider", () => {
	// dont log console.error for this particular test
	jest.spyOn(console, "error").mockImplementation(() => {});

	expect(() => render(<Cart />)).toThrowError(
		"useCart must be used within a CartProvider",
	);
});

it(`doesn't throw error if Cart is within CartContextProvider`, () => {
	const wrapper = (
		<MockRouterProvider>
			<CartContextProvider>
				<Cart />
			</CartContextProvider>
		</MockRouterProvider>
	);

	expect(() => render(wrapper)).not.toThrow();
});

it("renders info about empty cart if cartItems is empty", () => {
	const { getByText } = cartContextRender(<Cart />, {
		store: {
			cartItems: [],
			totals: {},
		},
	});
	expect(getByText("Your Cart is empty")).toBeInTheDocument();
});
