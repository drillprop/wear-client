import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose Tailwind class names: `clsx` resolves conditionals/arrays/objects,
 * then `tailwind-merge` dedupes conflicting utilities so the last one wins
 * (e.g. `cn("p-2", "p-4")` → `"p-4"`). The standard shadcn/ui helper — every
 * primitive in this package and the feature components in `apps/web` build
 * their `className` props on top of it. Hoisted here from `apps/web` (#81 → #83)
 * as the design system's canonical home.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
