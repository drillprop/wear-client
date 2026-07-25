import type React from "react";
import LinkAnchor from "../LinkAnchor/LinkAnchor";
import { Image, ImageTitle, ImageWrapper } from "./HomepageImage.styles";

interface Props {
	link: string;
	imageUrl: string;
}

const HomepageImage: React.FC<Props> = ({ imageUrl, link, children }) => {
	return (
		<LinkAnchor href="/shop/[...params]" as={link}>
			<ImageWrapper>
				<ImageTitle>{children}</ImageTitle>
				<Image imageUrl={imageUrl}></Image>
			</ImageWrapper>
		</LinkAnchor>
	);
};

export default HomepageImage;
