import {
	type buttonVariants,
	Button as UiButton,
} from "@wear/ui/components/ui/button";
import { cn } from "@wear/ui/lib/utils";
import type { VariantProps } from "class-variance-authority";
import type React from "react";

/**
 * App-level Button: the shadcn `@wear/ui` primitive (a `cva` variant set —
 * `variant` × `size`) with the old form-button layout defaults baked in
 * (full width, top margin), so existing `<Button type="submit">…` call sites
 * keep rendering full-width submit buttons under the shadcn look (#84).
 *
 * The former free-form `mainColor` / `width` / `marginTop` string props are
 * gone: `mainColor` had no call sites, and the two width/margin overrides
 * translate to arbitrary Tailwind values via `className` (e.g. `w-[200px]`,
 * `mt-5`), which `cn()`/tailwind-merge lets win over the defaults here.
 */
type Props = React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	};

const Button: React.FC<Props> = ({ className, ...props }) => {
	return <UiButton className={cn("mt-12 w-full", className)} {...props} />;
};

export default Button;
