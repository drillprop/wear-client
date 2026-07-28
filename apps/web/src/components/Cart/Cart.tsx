"use client";
import { useCart } from "../../contexts/CartContext";
import Button from "../Button/Button";
import CartItem from "./cart/CartItem";
import EmptyCart from "./cart/EmptyCart";

/**
 * Cart surface (#86). The `Cart.styles.ts` styled-components port to Tailwind:
 * the `auto-fit`/`minmax` summary grid becomes an arbitrary `grid-cols-[…]`,
 * and the shared `SiteSubtitle` (from `site.styles.ts`, kept for the surfaces
 * still on styled-components) is inlined here under the shadcn neutral tokens.
 * The `Totals` `:first-of-type` top margin is applied directly to the first row.
 */
const Cart = () => {
	const { cartItems, totals } = useCart();
	return totals.total ? (
		<>
			<h2 className="relative mt-[18px] mb-[30px] font-roboto text-5 font-medium uppercase text-muted-foreground after:absolute after:left-0 after:mt-10 after:h-px after:w-full after:bg-border after:content-['']">
				Your cart
			</h2>
			<div className="mx-auto grid grid-cols-[repeat(auto-fit,minmax(320px,auto))] gap-[50px]">
				<ul>
					{cartItems.map((item) => (
						<CartItem item={item} key={`${item.id}size:${item.size}`} />
					))}
				</ul>
				<section className="mx-auto w-full p-10">
					<h2 className="text-center font-roboto text-7 uppercase">
						Your order
					</h2>
					<h3 className="mt-[50px] flex justify-between text-2 text-muted-foreground">
						total products:{" "}
						<span className="block text-4 text-foreground">
							{totals.total}{" "}
						</span>
					</h3>
					<h3 className="flex justify-between text-2 text-muted-foreground">
						total price:{" "}
						<span className="block text-4 text-foreground">
							$ {totals.totalPrice}{" "}
						</span>
					</h3>
					<Button className="mt-5">go to checkout</Button>
				</section>
			</div>
		</>
	) : (
		<EmptyCart />
	);
};

export default Cart;
