import type { FC } from "react";
import {
	FooterBackground,
	FooterBottom,
	FooterTop,
	FooterWrapper,
} from "./Footer.styles";
import About from "./footer/About";
import Contact from "./footer/Contact";
import Help from "./footer/Help";
import NewsLetter from "./footer/NewsLetter";

const Footer: FC = () => {
	return (
		<FooterBackground>
			<FooterWrapper>
				<FooterTop>
					<Help />
					<About />
					<Contact />
					<NewsLetter />
				</FooterTop>
				<FooterBottom>&copy; Copyright 2019 </FooterBottom>
			</FooterWrapper>
		</FooterBackground>
	);
};

export default Footer;
