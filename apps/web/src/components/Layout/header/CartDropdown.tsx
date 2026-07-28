"use client";
import Link from "next/link";
import CartIcon from "@/components/CartIcon/CartIcon";
import LinkAnchor from "@/components/LinkAnchor/LinkAnchor";
import { useCart } from "@/contexts/CartContext";
import { navItem } from "./navItem";

/**
 * Header cart area (#79). Rebuilt on Tailwind: the cart glyph + product count
 * link into `/cart`, and hovering the item (driving `cartVisible` through
 * `useCart`) reveals a preview of the first two items, an "and N more" banner,
 * the running total and a "go to cart" action. The grays map onto the neutral
 * tokens; the old `::after` divider becomes an `after:` utility; the "go to cart"
 * `<button>`-inside-`<Link>` is flattened to a styled `Link`.
 */
const CartDropdown = () => {
	const { cartItems, cartVisible, toggleCartVisible, totals } = useCart();
	const cartItemsLength = cartItems.length;
	const products = totals.total
		? `${totals.total} product${totals.total > 1 ? "s" : ""} in `
		: "";
	return (
		<li
			className={navItem}
			onMouseEnter={() => toggleCartVisible(true)}
			onMouseLeave={() => toggleCartVisible(false)}
		>
			<LinkAnchor
				href="/cart"
				wordToHighlight="cart"
				className="flex items-center gap-[10px]"
			>
				<CartIcon size={14} fill={cartItemsLength ? "currentColor" : "none"} />
				{products}cart
			</LinkAnchor>
			{cartVisible && !!cartItemsLength && (
				<div className="absolute right-0 z-[2] border border-border bg-background">
					<ul className="p-0">
						{cartItems.slice(0, 2).map((item) => (
							<li
								key={`${item.id}size:${item.size}`}
								className="relative grid h-full grid-cols-[repeat(2,90px)] gap-5 px-[25px] py-5 first:pt-[40px] after:absolute after:bottom-0 after:h-px after:w-[calc(100%-50px)] after:justify-self-center after:bg-border after:content-['']"
							>
								<img
									src={item.imageUrl}
									alt="product"
									className="m-0 h-[120px] w-[90px] object-cover"
								/>
								<div className="font-montserrat text-0 tracking-normal text-muted-foreground normal-case">
									<div className="font-bold text-foreground uppercase">
										{item.name}
									</div>
									<div className="mt-[30px]">size: {item.size}</div>
									<div className="mt-5 font-bold">
										price: {item.quantity} x ${item.price}
									</div>
								</div>
							</li>
						))}
					</ul>
					{cartItemsLength > 2 && (
						<div className="relative mx-auto mt-5 w-[calc(100%-50px)] bg-muted-foreground py-[10px] text-center text-background">
							{`and ${cartItemsLength - 2} more`}
						</div>
					)}
					<div className="mt-5 grid grid-cols-[repeat(2,90px)] gap-5 px-[25px] font-bold">
						<div>total:</div>
						<div>${totals.totalPrice}</div>
					</div>
					<Link
						href="/cart"
						className="mx-auto my-5 block w-fit cursor-pointer border-none bg-primary px-[30px] py-[10px] font-montserrat text-1 text-primary-foreground"
					>
						go to cart
					</Link>
				</div>
			)}
		</li>
	);
};

export default CartDropdown;
