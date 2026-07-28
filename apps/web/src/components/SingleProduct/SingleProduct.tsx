"use client";
import type React from "react";
import { useEffect, useState } from "react";
import type { SingleItemQuery, SizeSymbol } from "@/gql/graphql";
import { useCart } from "../../contexts/CartContext";
import Button from "../Button/Button";
import CartIcon from "../CartIcon/CartIcon";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Select from "../Select/Select";
import ShopSideNav from "../ShopSideNav/ShopSideNav";
import { SiteWrapper } from "../SiteLayout/SiteLayout";

interface Props {
	item?: SingleItemQuery["item"];
	loading?: boolean;
}

/**
 * Single product detail (#85). `SingleProduct.styles.ts` ports to Tailwind: the
 * two-column image/detail grid, the mobile-first image height (`max-width:400`
 * → base `h-[350px]`, `sm:h-[500px]`), and the grays onto the neutral tokens.
 * The bespoke "add to cart" button — full-width, black, hover-inverting — is
 * replaced by the shadcn `Button` primitive (full-width by default; `CartIcon`
 * inherits `currentColor`), per the #66 default-look restyle. `SiteWrapper` now
 * comes from the shared Tailwind `SiteLayout` module.
 */
const SingleProduct: React.FC<Props> = ({ item, loading }) => {
	const [size, setSize] = useState<SizeSymbol | "">("");
	const [alert, setAlert] = useState("");

	const sizes = item?.sizes
		?.filter((size) => size.quantity && size)
		.map((size) => size.sizeSymbol);

	const { addItemToCart, toggleCartVisible } = useCart();

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;
		if (alert) {
			timeout = setTimeout(() => {
				setAlert("");
				toggleCartVisible(false);
			}, 1000);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [alert]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (item) {
			const { id, name, price, imageUrl } = item;
			const newItem = { id, size, name, price, imageUrl, quantity: 1 };
			setAlert("product added to your cart");
			toggleCartVisible(true);
			addItemToCart(newItem);
			setSize("");
		}
	};
	return (
		<SiteWrapper>
			{item ? <ShopSideNav gender={item.gender.toUpperCase()} /> : <div />}
			<div className="mt-[50px] grid grid-cols-[repeat(auto-fit,minmax(200px,350px))] gap-[40px]">
				{item && !loading ? (
					<>
						<img
							src={item?.imageUrl}
							alt={item?.name}
							className="h-[350px] w-full border border-border object-cover sm:h-[500px]"
						/>
						<section>
							<h1 className="m-0 text-5 uppercase">{item?.name}</h1>
							<p className="m-0 mt-[40px] text-2 leading-[1.8] text-muted-foreground">
								{item?.description}
							</p>
							<div className="mt-[50px] text-6">$ {item?.price}</div>
							{sizes?.length ? (
								<form onSubmit={handleSubmit}>
									<Select
										className="mt-[100px]"
										label="Pick size"
										placeHolder="SIZE"
										onChange={(size) => setSize(size)}
										value={size}
										options={sizes}
									/>
									<Button type="submit" disabled={!size} className="mt-[40px]">
										<CartIcon size="1em" />
										{alert ? alert : "add to cart"}
									</Button>
								</form>
							) : (
								<span className="text-2 text-muted-foreground">
									product is not available at the moment
								</span>
							)}
						</section>
					</>
				) : (
					<div className="grid [grid-column:1/3]">
						<LoadingSpinner />
					</div>
				)}
				{!item && !loading && <div>No such item</div>}
			</div>
		</SiteWrapper>
	);
};

export default SingleProduct;
