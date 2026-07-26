import { render } from "@testing-library/react";
import { CartContext } from "../contexts/CartContext";
import { MockRouterProvider } from "./mockRouter";

export const cartContextRender = (ui: any, { store, ...options }: any) => {
	const Wrapper = (props: any) => (
		<MockRouterProvider>
			<CartContext.Provider value={store} {...props} />
		</MockRouterProvider>
	);
	return render(ui, { wrapper: Wrapper, ...options });
};
