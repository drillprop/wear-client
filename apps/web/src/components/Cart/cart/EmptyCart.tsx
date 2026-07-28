import Button from "../../Button/Button";
import LinkAnchor from "../../LinkAnchor/LinkAnchor";

/**
 * Empty-cart state (#86). `EmptyCart.styles.ts` was the same centred full-page
 * block as `site.styles`' `FullPageWrapper`; it ports inline to Tailwind with
 * the subtitle on the shadcn `muted-foreground` token.
 */
const EmptyCart = () => {
	return (
		<div className="flex h-[400px] flex-col items-center justify-center">
			<h1 className="text-center font-roboto text-7 uppercase">
				Your Cart is empty
			</h1>
			<h3 className="mt-[30px] max-w-[400px] text-center text-3 leading-[2] text-muted-foreground">
				Go back to homepage and pick something for yourself
			</h3>
			<LinkAnchor href="/">
				<Button className="w-[250px]">go to homepage</Button>
			</LinkAnchor>
		</div>
	);
};

export default EmptyCart;
