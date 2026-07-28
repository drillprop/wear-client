"use client";
import type { ReactNode } from "react";
import CartContextProvider from "@/contexts/CartContext";
import { ApolloWrapper } from "./lib/apollo/client";

/**
 * Client providers mounted by the root layout. Mirrors the old `_app`: the
 * browser Apollo provider wraps everything, with the (client-only, unchanged)
 * cart context inside it. Global styles now live in `globals.css`'s
 * `@layer base` (#82), so the old `createGlobalStyle` component is gone.
 */
export function Providers({ children }: { children: ReactNode }) {
	return (
		<ApolloWrapper>
			<CartContextProvider>{children}</CartContextProvider>
		</ApolloWrapper>
	);
}
