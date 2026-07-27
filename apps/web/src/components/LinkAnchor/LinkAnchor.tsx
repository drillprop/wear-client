"use client";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { FC, PropsWithChildren } from "react";
import { StyledAnchor } from "./LinkAnchor.styles";

interface Props {
	wordToHighlight?: string;
	highlight?: boolean;
}

const LinkAnchor: FC<PropsWithChildren<LinkProps & Props>> = ({
	wordToHighlight,
	highlight,
	children,
	...props
}) => {
	// `usePathname` reads the App Router pathname; under the unmigrated Pages
	// Router (frozen header/admin) the context is absent and it returns `null`
	// without throwing — the active-link highlight simply no-ops there.
	const pathname = usePathname();
	const path = pathname ? pathname.split(/\/|\?/gi) : [];

	const isPathIncludes = wordToHighlight
		? path.includes(wordToHighlight)
		: false;

	return (
		<Link {...props} passHref legacyBehavior>
			<StyledAnchor active={highlight || isPathIncludes}>
				{children}
			</StyledAnchor>
		</Link>
	);
};

export default LinkAnchor;
