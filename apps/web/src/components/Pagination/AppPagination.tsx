"use client";
import { buttonVariants } from "@wear/ui/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@wear/ui/components/ui/pagination";
import { cn } from "@wear/ui/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type React from "react";

interface Props {
	page: number;
	total?: number;
	take: number;
}

/**
 * App Router pagination (#85). Rebuilt on the shadcn `Pagination` primitive
 * (the nav / content / item wrappers): prev/next are Next `<Link>`s styled with
 * `buttonVariants`, dropping the Next 16-deprecated `legacyBehavior`/`passHref`
 * child-anchor pattern the old `Pagination.styles.ts` version used. Each link
 * rewrites the `page` search param (preserving the others), so navigating drives
 * the data page's `useSearchParams`-derived refetch; `scroll={false}` keeps the
 * viewport put across pages.
 */
const AppPagination: React.FC<Props> = ({ page, total = 0, take }) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const totalPages = Math.ceil(total / take);

	const hrefForPage = (target: number) => {
		const params = new URLSearchParams(searchParams?.toString());
		params.set("page", String(target));
		return `${pathname ?? ""}?${params.toString()}`;
	};

	if (totalPages < 1) {
		return null;
	}

	const prevPage = page - 1 || 1;
	const nextPage = totalPages > page ? page + 1 : totalPages;
	const arrow = cn(buttonVariants({ variant: "ghost", size: "icon" }));

	return (
		<Pagination className="mt-[50px]">
			<PaginationContent>
				<PaginationItem>
					<Link
						aria-label="Go to previous page"
						scroll={false}
						href={hrefForPage(prevPage)}
						className={arrow}
					>
						&lt;
					</Link>
				</PaginationItem>
				<PaginationItem>
					<span className="px-4 font-roboto text-1 text-foreground">
						{page} of {totalPages}
					</span>
				</PaginationItem>
				<PaginationItem>
					<Link
						aria-label="Go to next page"
						scroll={false}
						href={hrefForPage(nextPage)}
						className={arrow}
					>
						&gt;
					</Link>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default AppPagination;
