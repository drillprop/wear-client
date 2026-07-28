"use client";
import { cn } from "@wear/ui/lib/utils";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { FC, PropsWithChildren } from "react";

interface Props {
	wordToHighlight?: string;
	highlight?: boolean;
	className?: string;
}

/**
 * Active-aware navigation link (#84). Styles `next/link` directly with `cn()`,
 * dropping the Next 16-deprecated `legacyBehavior`/`passHref` child-anchor
 * pattern (coordinated with #79). The active-link highlight (bolder weight +
 * foreground colour) is a boolean, so it's a `clsx`-style conditional class.
 */
const LinkAnchor: FC<PropsWithChildren<LinkProps & Props>> = ({
	wordToHighlight,
	highlight,
	children,
	className,
	...props
}) => {
	// `usePathname` returns the App Router pathname, or `null` when no router
	// context is mounted (e.g. rendered in isolation under test) — the guard
	// keeps the active-link highlight a no-op rather than throwing.
	const pathname = usePathname();
	const path = pathname ? pathname.split(/\/|\?/gi) : [];

	const isActive =
		highlight || (wordToHighlight ? path.includes(wordToHighlight) : false);

	return (
		<Link
			{...props}
			className={cn(
				"cursor-pointer",
				isActive ? "font-bold text-foreground" : "font-normal",
				className,
			)}
		>
			{children}
		</Link>
	);
};

export default LinkAnchor;
