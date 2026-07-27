import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
	it("joins truthy class names", () => {
		expect(cn("a", "b")).toBe("a b");
	});

	it("drops falsy values from clsx-style conditionals", () => {
		expect(cn("a", false && "b", null, undefined, "c")).toBe("a c");
	});

	it("supports arrays and object maps", () => {
		expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c");
	});

	it("dedupes conflicting Tailwind utilities, last wins", () => {
		expect(cn("p-2", "p-4")).toBe("p-4");
		expect(cn("text-sm text-foreground", "text-lg")).toBe(
			"text-foreground text-lg",
		);
	});

	it("keeps non-conflicting Tailwind utilities", () => {
		expect(cn("px-2", "py-4")).toBe("px-2 py-4");
	});
});
