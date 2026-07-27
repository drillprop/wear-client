import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose Tailwind class names: `clsx` resolves conditionals/arrays/objects,
 * then `tailwind-merge` dedupes conflicting utilities so the last one wins
 * (e.g. `cn("p-2", "p-4")` → `"p-4"`). The standard shadcn/ui helper; feature
 * components and the `packages/ui` primitives (#83) build their `className`
 * props on top of it. Lives here for now — hoists into `@wear/ui` when that
 * package becomes real (#83).
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
