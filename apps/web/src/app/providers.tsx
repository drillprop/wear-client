"use client";
import type { ReactNode } from "react";
import CartContextProvider from "@/contexts/CartContext";
import Globalstyle from "@/styles/globalstyle";
import { ApolloWrapper } from "./lib/apollo/client";

/**
 * Client providers mounted by the root layout. Mirrors the old `_app`: the
 * browser Apollo provider wraps everything, with the (client-only, unchanged)
 * cart context inside it, and the styled-components global styles applied.
 */
export function Providers({ children }: { children: ReactNode }) {
	return (
		<ApolloWrapper>
			<Globalstyle />
			<CartContextProvider>{children}</CartContextProvider>
		</ApolloWrapper>
	);
}
