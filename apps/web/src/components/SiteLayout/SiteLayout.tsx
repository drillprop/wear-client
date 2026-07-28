import { cn } from "@wear/ui/lib/utils";
import type { FC, FormEventHandler, PropsWithChildren } from "react";

/**
 * Shared site-layout presentational leaves (#85/#88) — the Tailwind port of the
 * cross-surface `site.styles.ts` primitives (`SiteWrapper` / `SiteForm` /
 * `SiteSubtitle` / `SiteParagraph`) that the shop and account surfaces compose.
 * Kept in one module (the `SignLayout` precedent) rather than inlined per call
 * site, since these wrappers repeat across ~8 forms.
 *
 * Translation notes: the grays map onto the shadcn neutral tokens; the
 * `SiteSubtitle` underline is the old `::after` rule; desktop-first media
 * queries invert to mobile-first — the `SiteWrapper` side-nav column appears
 * from `lg` up (the old `max-width:900` single-column mobile is the base) and
 * the narrow `SiteForm` width is the mobile base that widens from `sm` up.
 *
 * The still-styled-components admin surface keeps importing the originals from
 * `styles/site.styles.ts` until #89; both live side by side through that
 * coexistence window and `styles/site.styles.ts` is removed at the #90 teardown.
 */
export const SiteWrapper: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className,
}) => (
	<div
		className={cn(
			"grid min-h-[700px] gap-[50px] lg:grid-cols-[150px_1fr]",
			className,
		)}
	>
		{children}
	</div>
);

export const SiteForm: FC<
	PropsWithChildren<{
		onSubmit?: FormEventHandler<HTMLFormElement>;
		className?: string;
	}>
> = ({ onSubmit, className, children }) => (
	<form
		onSubmit={onSubmit}
		className={cn(
			"mt-[75px] w-[260px] first-of-type:mt-0 sm:w-auto",
			className,
		)}
	>
		{children}
	</form>
);

export const SiteSubtitle: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className,
}) => (
	<h2
		className={cn(
			"relative mt-[18px] mb-[30px] font-roboto text-5 font-medium uppercase text-muted-foreground after:absolute after:left-0 after:mt-10 after:h-px after:w-full after:bg-border after:content-['']",
			className,
		)}
	>
		{children}
	</h2>
);

export const SiteParagraph: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className,
}) => (
	<p className={cn("text-0 text-muted-foreground", className)}>{children}</p>
);
