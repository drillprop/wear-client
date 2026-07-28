import type React from "react";

interface Props {
	image: string;
	title?: string;
	text?: string;
}

/**
 * Sign-surface hero image (#87). The old `HeroImage` styled div becomes a
 * Tailwind div: the `image` prop stays an inline `background-image` (a free-form
 * URL, not a bounded set), and the `::after` black darkening overlay ports to an
 * `after:` pseudo. Desktop-first `@media (max-width:900)` → mobile-first
 * `hidden lg:block`, so the hero shows only from `lg` up.
 */
const SignImage: React.FC<Props> = ({ image }) => {
	return (
		<div
			style={{ backgroundImage: `url(${image})` }}
			className="relative -z-[1] hidden h-full w-full bg-cover bg-center after:absolute after:inset-0 after:bg-foreground after:opacity-50 after:content-[''] lg:block"
		/>
	);
};

export default SignImage;
