import { Montserrat, Roboto_Condensed } from "next/font/google";

/**
 * App fonts loaded through `next/font` (self-hosted, no layout shift, no
 * render-blocking Google `<link>`). Each exposes a CSS variable that the
 * `@theme inline` layer in `globals.css` bridges to the `font-montserrat` /
 * `font-roboto` utilities.
 *
 * The loader variables are named `*-src` so the bridge (`--font-montserrat:
 * var(--font-montserrat-src)`) never self-references — otherwise the theme
 * layer would emit `:root { --font-montserrat: var(--font-montserrat) }` and
 * correctness would hinge on stylesheet source order.
 *
 * Weights mirror the previous Google Fonts request (`Montserrat:500,600,700`
 * and `Roboto Condensed:400,700`). The old request also pulled `700i`, but no
 * surface renders italic today — re-add `style: ["normal", "italic"]` to the
 * Roboto loader when a component actually needs it.
 */
export const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["500", "600", "700"],
	variable: "--font-montserrat-src",
	display: "swap",
});

export const robotoCondensed = Roboto_Condensed({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-roboto-src",
	display: "swap",
});
