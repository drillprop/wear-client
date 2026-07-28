import type React from "react";
import { type ICartItem, useCart } from "../../../contexts/CartContext";

interface Props {
	item: ICartItem;
}

/**
 * Cart line item (#86). `CartItem.styles.ts` ports to Tailwind: the two-column
 * image/info grid, the `:last-of-type` border reset (`last-of-type:border-b-0`),
 * and the quantity `Arrow`/delete buttons that were free-form styled buttons.
 * The grays map onto the shadcn `border`/`muted-foreground` tokens. The
 * `data-testid` hooks the tests assert on are preserved.
 */
const CartItem: React.FC<Props> = ({ item }) => {
	const { incItemInCart, decrItemInCart, removeItemFromCart } = useCart();
	return (
		<li className="relative grid grid-cols-[110px_1fr] gap-5 border-b border-border py-5 last-of-type:border-b-0">
			<img
				src={item.imageUrl}
				alt={item.name}
				className="m-0 h-[140px] w-[110px] border border-border object-cover"
			/>
			<section className="flex flex-col justify-between">
				<div className="flex justify-between">
					<div>
						<h4 className="pr-[10px] text-2 uppercase">{item.name}</h4>
						<div className="mt-[10px] text-1 text-muted-foreground">
							size: {item.size}
						</div>
					</div>
					<button
						type="button"
						data-testid="remove"
						onClick={() => removeItemFromCart(item)}
						className="flex h-0 cursor-pointer border-none bg-transparent p-0 font-montserrat text-3 text-muted-foreground"
					>
						&#10005;
					</button>
				</div>
				<div className="flex justify-between">
					<div className="mt-5 text-1">
						amount:{" "}
						<button
							type="button"
							data-testid="decrease"
							onClick={() => decrItemInCart(item)}
							className="cursor-pointer border-none bg-transparent px-[10px] font-[inherit]"
						>
							&#10094;
						</button>{" "}
						{item.quantity}{" "}
						<button
							type="button"
							data-testid="increase"
							onClick={() => incItemInCart(item)}
							className="cursor-pointer border-none bg-transparent px-[10px] font-[inherit]"
						>
							&#10095;
						</button>
					</div>
					<div data-testid="item-price" className="self-end text-3">
						{" "}
						$ {item.price * item.quantity}
					</div>
				</div>
			</section>
		</li>
	);
};

export default CartItem;
