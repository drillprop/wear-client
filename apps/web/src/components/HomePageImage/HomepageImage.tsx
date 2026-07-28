import type React from "react";
import LinkAnchor from "../LinkAnchor/LinkAnchor";

interface Props {
	link: string;
	imageUrl: string;
}

/**
 * Home category tile (#85). `HomepageImage.styles.ts` ports to Tailwind: the
 * absolute near-white title band over a black image panel whose faded
 * background image zooms on hover. Two implementation shifts:
 *   - the old `::after` pseudo-element carried the (dynamic) background image;
 *     it becomes a real inner layer so `imageUrl` can drive it via inline style;
 *   - the two separate `:hover` rules (title-hover and panel-hover both zoomed
 *     the image) collapse onto a single `group` on the wrapper.
 * The off-white/black grays map onto the shadcn `background`/`primary` tokens.
 * The Pages-Router `href="/shop/[...params]" as={link}` is modernised to a
 * direct App-Router `href={link}`.
 */
const HomepageImage: React.FC<React.PropsWithChildren<Props>> = ({
	imageUrl,
	link,
	children,
}) => {
	return (
		<LinkAnchor href={link} className="group relative block overflow-hidden">
			<h1 className="absolute top-[70%] left-1/2 z-[1] w-full -translate-x-1/2 cursor-pointer bg-background p-3 text-center font-roboto text-5 tracking-[4px] text-foreground uppercase">
				{children}
			</h1>
			<div className="relative h-[600px] overflow-hidden bg-primary">
				<div
					style={{ backgroundImage: `url(${imageUrl})` }}
					className="absolute inset-0 h-[600px] w-full bg-cover bg-center opacity-70 transition-[transform,opacity] duration-1000 group-hover:scale-110 group-hover:opacity-60 group-hover:duration-[4000ms]"
				/>
			</div>
		</LinkAnchor>
	);
};

export default HomepageImage;
