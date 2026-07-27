import { render } from "@testing-library/react";
import { CartContext } from "../contexts/CartContext";
import { AppRouterProvider } from "./appRouter";

export const cartContextRender = (ui: any, { store, ...options }: any) => {
	const Wrapper = (props: any) => (
		<AppRouterProvider>
			<CartContext.Provider value={store} {...props} />
		</AppRouterProvider>
	);
	return render(ui, { wrapper: Wrapper, ...options });
};
