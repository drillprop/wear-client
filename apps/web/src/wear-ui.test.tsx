import { render, screen } from "@testing-library/react";
import { Button } from "@wear/ui/components/ui/button";
import { cn } from "@wear/ui/lib/utils";
import { describe, expect, it } from "vitest";

/**
 * Boundary test for the #83 design-system wiring: a shadcn primitive imported
 * from the `@wear/ui` workspace package renders inside `apps/web` and is styled
 * by the #82 token utilities. Proves the exports map, `transpilePackages`, and
 * the hoisted `cn()` all resolve end-to-end.
 */
describe("@wear/ui", () => {
	it("renders a Button primitive styled by the #82 neutral tokens", () => {
		render(<Button>Add to cart</Button>);
		const btn = screen.getByRole("button", { name: "Add to cart" });
		expect(btn).toBeInTheDocument();
		// default cva variant → shadcn neutral semantic utilities from #82's @theme
		expect(btn).toHaveClass("bg-primary");
		expect(btn).toHaveClass("text-primary-foreground");
	});

	it("merges a caller className through cn() so the last utility wins", () => {
		render(<Button className="bg-destructive">Delete</Button>);
		const btn = screen.getByRole("button", { name: "Delete" });
		// tailwind-merge dedupes the conflicting background — caller's wins
		expect(btn).toHaveClass("bg-destructive");
		expect(btn).not.toHaveClass("bg-primary");
	});

	// Full coverage for the hoisted cn() (moved here from the old
	// apps/web/src/utils/cn.test.ts), exercised through the @wear/ui entry point.
	it("joins truthy class names", () => {
		expect(cn("a", "b")).toBe("a b");
	});

	it("drops falsy values from clsx-style conditionals", () => {
		expect(cn("a", false && "b", null, undefined, "c")).toBe("a c");
	});

	it("supports arrays and object maps", () => {
		expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c");
	});

	it("keeps non-conflicting utilities untouched", () => {
		expect(cn("px-2", "text-sm")).toBe("px-2 text-sm");
	});

	it("dedupes conflicting utilities so the last one wins", () => {
		expect(cn("p-2", "p-4")).toBe("p-4");
	});
});
