import type { FC, PropsWithChildren } from "react";

interface Props {
	title: string;
	subtitle: string;
}

/**
 * Centred full-page message block (#86/#87). The old `site.styles.ts`
 * `FullPageWrapper`/`FullPageTitle`/`FullPageSubTitle` (and the identical
 * `EmptyCart` block) collapse into one leaf: a title, a muted subtitle, and
 * `children` for the form or CTA below. `site.styles.ts` itself stays until its
 * remaining styled-components consumers are ported; this is its Tailwind
 * successor for the surfaces rebuilt here.
 */
const FullPageMessage: FC<PropsWithChildren<Props>> = ({
	title,
	subtitle,
	children,
}) => (
	<div className="flex h-[400px] flex-col items-center justify-center">
		<h1 className="text-center font-roboto text-7 uppercase">{title}</h1>
		<h3 className="mt-[30px] max-w-[400px] text-center text-3 leading-[2] text-muted-foreground">
			{subtitle}
		</h3>
		{children}
	</div>
);

export default FullPageMessage;
