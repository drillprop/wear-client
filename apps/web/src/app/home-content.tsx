"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { HomePageWrapper } from "@/components/Home/Home.styles";
import {
	Image,
	ImageTitle,
	ImageWrapper,
} from "@/components/HomePageImage/HomepageImage.styles";

function Tile({
	href,
	imageUrl,
	children,
}: {
	href: string;
	imageUrl: string;
	children: ReactNode;
}) {
	return (
		<Link href={href} style={{ textDecoration: "none" }}>
			<ImageWrapper>
				<ImageTitle>{children}</ImageTitle>
				<Image imageUrl={imageUrl} />
			</ImageWrapper>
		</Link>
	);
}

export default function HomeContent() {
	return (
		<HomePageWrapper>
			<Tile href="/shop/woman" imageUrl="/woman-in-summer-fashion.jpg">
				for her
			</Tile>
			<Tile href="/shop/man" imageUrl="/man-looks-out-window.jpg">
				for him
			</Tile>
		</HomePageWrapper>
	);
}
