import type { Metadata } from "next";
import Cart from "@/components/Cart/Cart";

export const metadata: Metadata = { title: "wear | cart" };

/**
 * Cart (`/cart`) — pure client, unchanged (#70). `Cart` reads `CartContext`
 * (mounted by the root providers) + the cart cookie; no GraphQL, no auth gate.
 */
export default function CartPage() {
	return <Cart />;
}
