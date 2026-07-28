import Button from "../../Button/Button";
import FullPageMessage from "../../FullPageMessage/FullPageMessage";
import LinkAnchor from "../../LinkAnchor/LinkAnchor";

/**
 * Empty-cart state (#86). `EmptyCart.styles.ts` was the same centred full-page
 * block as `site.styles`' `FullPageWrapper`, so it reuses the shared
 * `FullPageMessage` leaf (also used by the reset surface) with a homepage CTA.
 */
const EmptyCart = () => {
	return (
		<FullPageMessage
			title="Your Cart is empty"
			subtitle="Go back to homepage and pick something for yourself"
		>
			<LinkAnchor href="/">
				<Button className="w-[250px]">go to homepage</Button>
			</LinkAnchor>
		</FullPageMessage>
	);
};

export default EmptyCart;
