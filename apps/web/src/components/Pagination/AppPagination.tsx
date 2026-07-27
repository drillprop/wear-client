"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type React from "react";
import {
	NextPrevPage,
	PageNumber,
	PageNumbersWrapper,
} from "./Pagination.styles";

interface Props {
	page: number;
	total?: number;
	take: number;
}

/**
 * App Router pagination. Prev/next are plain `next/link`s that rewrite the `page`
 * search param (preserving any others) — the data page derives its query
 * variables from `useSearchParams`, so navigating is what drives the client-side
 * refetch.
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

	return (
		<PageNumbersWrapper>
			<Link passHref legacyBehavior scroll={false} href={hrefForPage(prevPage)}>
				<NextPrevPage>&lt;</NextPrevPage>
			</Link>
			<PageNumber>
				{page} of {totalPages}
			</PageNumber>
			<Link passHref legacyBehavior scroll={false} href={hrefForPage(nextPage)}>
				<NextPrevPage>&gt;</NextPrevPage>
			</Link>
		</PageNumbersWrapper>
	);
};

export default AppPagination;
