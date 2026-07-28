import type React from "react";
import { useState } from "react";

interface Props {
	title: string;
	className?: string;
}

/**
 * Collapsible nav group (#89). The old inline reset styles become Tailwind
 * utilities; the caret `fill` is `currentColor` so it follows the surrounding
 * text colour (the mobile menu renders it on `bg-primary` in
 * `primary-foreground`), keeping it token-aware instead of hard-coded white.
 */
const ToggleableList: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	title,
	className,
}) => {
	const [visibleList, toggleList] = useState(false);
	const toggle = () => toggleList(!visibleList);
	return (
		<li className={className}>
			<button
				type="button"
				onClick={toggle}
				className="flex cursor-pointer items-center border-none bg-transparent p-0 font-[inherit] text-inherit"
			>
				<svg
					width="20px"
					height="20px"
					viewBox="0 -15 30 30"
					className="mr-[15px]"
				>
					<title>{title}</title>
					<path
						d={visibleList ? `M0,10 20,10 10,0` : `M0,0 20,0 10,10`}
						fill="currentColor"
					/>
				</svg>
				{title}
			</button>
			{visibleList && <ul>{children}</ul>}
		</li>
	);
};

export default ToggleableList;
