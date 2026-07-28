import { cn } from "@wear/ui/lib/utils";
import { type FC, type PropsWithChildren, useState } from "react";

interface Props {
	hoverText?: string;
	onClick?: () => void;
}

/**
 * Sign/register toggle (#87). The styled-components circular button ports to
 * Tailwind and its desktop-first `@media (max-width:900)` block inverts to
 * mobile-first: the base classes are the old mobile styles (static, full-width,
 * square) and `lg:` restores the desktop fixed-centre circle with the hover
 * grow. The off-white/black hover swap maps onto the shadcn neutral tokens
 * (`bg-secondary` → hover `bg-primary`/`text-primary-foreground`).
 *
 * The old `useWindowSize` / `width > 900` JS check drove *content* (show the
 * hover label only on desktop); it's retired for a CSS `lg:` toggle — two spans,
 * `lg:hidden` shows the plain label on mobile, `hidden lg:inline` shows the
 * hover-swapped label from `lg` up. The hook is no longer imported here.
 */
const SwitchSignButton: FC<PropsWithChildren<Props>> = ({
	children,
	hoverText,
	onClick,
}) => {
	const [isHovered, hover] = useState(false);
	const text = isHovered ? hoverText || children : children;
	return (
		<button
			type="button"
			onMouseEnter={() => hover(true)}
			onMouseLeave={() => hover(false)}
			onClick={onClick}
			className={cn(
				// mobile-first base (the old `max-width:900` block)
				"static mx-auto mt-[10px] h-auto w-full cursor-pointer rounded-none border-none bg-secondary p-[10px] font-roboto text-3 outline-none",
				// lg: restores the desktop fixed circle + hover grow
				"lg:fixed lg:top-[calc(50%+45px)] lg:left-1/2 lg:mx-0 lg:mt-0 lg:h-[130px] lg:w-[130px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-full lg:p-0 lg:transition-transform lg:duration-200",
				"lg:hover:scale-110 lg:hover:bg-primary lg:hover:text-primary-foreground",
			)}
		>
			<span className="lg:hidden">{children}</span>
			<span className="hidden lg:inline">{text}</span>
		</button>
	);
};

export default SwitchSignButton;
