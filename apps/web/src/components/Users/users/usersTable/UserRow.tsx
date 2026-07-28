"use client";
import { TableCell, TableRow } from "@wear/ui/components/ui/table";
import { cn } from "@wear/ui/lib/utils";
import { useRouter } from "next/navigation";
import type React from "react";

interface Props {
	grey?: boolean;
	id: string;
	email: string;
	fullName?: string;
	role: string;
	orders?: string[];
}

/**
 * Admin user row (#89). `table.styles.ts` `TableBodyRow`/`TableData` become the
 * shadcn `TableRow`/`TableCell`; the alternating `grey` row maps onto
 * `bg-muted/50`. The old `<Link>`-wrapping-`<tr>` (invalid markup) becomes a
 * `router.push` on row click that navigates to the single-user page.
 */
const UserRow: React.FC<Props> = ({
	grey,
	id,
	email,
	fullName,
	role,
	orders,
}) => {
	const router = useRouter();
	return (
		<TableRow
			className={cn("cursor-pointer", grey && "bg-muted/50")}
			onClick={() => router.push(`/admin/user?id=${id}`)}
		>
			<TableCell>{email}</TableCell>
			<TableCell>{fullName} </TableCell>
			<TableCell>{role}</TableCell>
			<TableCell>{orders}</TableCell>
		</TableRow>
	);
};

export default UserRow;
