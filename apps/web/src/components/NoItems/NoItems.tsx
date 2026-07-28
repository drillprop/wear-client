import type React from "react";

interface Props {
	text: string;
}

/**
 * Empty-state block (#85). `NoItems.styles.ts` ports to Tailwind: a centred
 * heading well down the page, in roboto/uppercase under the muted token;
 * optional children (e.g. a "back to shop" button) sit below.
 */
const NoItems: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	text,
}) => {
	return (
		<div className="mt-[200px] text-center">
			<h3 className="font-roboto text-5 font-normal text-muted-foreground uppercase">
				{text}
			</h3>
			{children}
		</div>
	);
};

export default NoItems;
