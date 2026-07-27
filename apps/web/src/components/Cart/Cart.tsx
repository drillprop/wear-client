"use client";
import { useCart } from "../../contexts/CartContext";
import { SiteSubtitle } from "../../styles/site.styles";
import Button from "../Button/Button";
import {
	CartList,
	CartWrapper,
	OrderSummary,
	OrderTitle,
	Totals,
} from "./Cart.styles";
import CartItem from "./cart/CartItem";
import EmptyCart from "./cart/EmptyCart";

const Cart = () => {
	const { cartItems, totals } = useCart();
	return totals.total ? (
		<>
			<SiteSubtitle>Your cart</SiteSubtitle>
			<CartWrapper>
				<CartList>
					{cartItems.map((item) => (
						<CartItem item={item} key={`${item.id}size:${item.size}`} />
					))}
				</CartList>
				<OrderSummary>
					<OrderTitle>Your order</OrderTitle>
					<Totals>
						total products: <span>{totals.total} </span>
					</Totals>
					<Totals>
						total price: <span>$ {totals.totalPrice} </span>
					</Totals>
					<Button marginTop="20px">go to checkout</Button>
				</OrderSummary>
			</CartWrapper>
		</>
	) : (
		<EmptyCart />
	);
};

export default Cart;
