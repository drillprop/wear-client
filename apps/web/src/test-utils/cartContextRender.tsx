import { render } from "@testing-library/react";
import { CartContext } from "../contexts/CartContext";

export const cartContextRender = (ui: any, { store, ...options }: any) => {
	const Wrapper = (props: any) => (
		<CartContext.Provider value={store} {...props} />
	);
	return render(ui, { wrapper: Wrapper, ...options });
};
