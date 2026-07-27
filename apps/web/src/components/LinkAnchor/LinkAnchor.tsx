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
	// `usePathname` returns the App Router pathname, or `null` when no router
	// context is mounted (e.g. rendered in isolation under test) — the guard
	// keeps the active-link highlight a no-op rather than throwing.
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
