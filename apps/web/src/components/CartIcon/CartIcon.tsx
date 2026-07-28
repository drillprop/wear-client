import type React from "react";

interface Props {
	color?: string;
	size?: number | string;
	fill?: string;
}

/**
 * Cart glyph (#86). `CartIcon.styles.ts` only piped the `color` prop onto the
 * `stroke` of every shape; that ports to a plain SVG whose shapes stroke
 * `currentColor`, with `color` set on the element (defaulting to `currentColor`
 * so the icon inherits the surrounding text colour under the shadcn tokens).
 * Call sites passing an explicit `color` keep working.
 */
const CartIcon: React.FC<Props> = ({
	color = "currentColor",
	size = 24,
	fill,
}) => {
	return (
		<svg
			height={size}
			width={size}
			viewBox="0 0 24 24"
			style={{ color }}
			aria-hidden="true"
		>
			<circle
				cx="8"
				cy="21"
				fill="none"
				r="2.5"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
			<circle
				cx="20"
				cy="21"
				fill="none"
				r="2.5"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
			<path
				d="M5.67,6H23l-1.68,8.39a2,2,0,0,1-2,1.61H8.75a2,2,0,0,1-2-1.74L5.23,2.74A2,2,0,0,0,3.25,1H1"
				fill={fill ? fill : "none"}
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2.5"
			/>
		</svg>
	);
};

export default CartIcon;
