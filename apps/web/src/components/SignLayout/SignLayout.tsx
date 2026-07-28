import type { FC, FormEventHandler, PropsWithChildren } from "react";

/**
 * Shared sign-surface layout (#87). Login and Register share the same outer
 * grid, centred form column and title; these were the `SignWrapper`/`SignForm`/
 * `SignTitle` styled-components in the deleted `sign.styles.ts`, restored here
 * as `cn()`-free presentational leaves (matching how #84 kept shared
 * presentation in one place rather than copied per call site). Desktop-first
 * `@media (max-width:900)` is inverted to mobile-first: 1-column / narrow form
 * base, `lg:` restores the two-column split and wider form.
 */
export const SignWrapper: FC<PropsWithChildren> = ({ children }) => (
	<div className="grid h-[calc(100vh-100px)] max-w-[1300px] grid-cols-1 lg:grid-cols-2">
		{children}
	</div>
);

export const SignForm: FC<
	PropsWithChildren<{ onSubmit: FormEventHandler<HTMLFormElement> }>
> = ({ onSubmit, children }) => (
	<form
		onSubmit={onSubmit}
		className="mx-auto flex w-[230px] flex-col items-center lg:w-[290px]"
	>
		{children}
	</form>
);

export const SignTitle: FC<PropsWithChildren> = ({ children }) => (
	<h1 className="mt-[60px] text-center font-roboto text-6 font-bold">
		{children}
	</h1>
);
