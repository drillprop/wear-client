import type { Metadata } from "next";
import { Suspense } from "react";
import Reset from "@/components/Reset/Reset";

export const metadata: Metadata = { title: "wear | reset password" };

/**
 * Password reset (`/reset`). The `Reset` client leaf reads the `?token=` search
 * param to switch between requesting an email and setting a new password, so it
 * renders inside a Suspense boundary (App Router requirement for
 * `useSearchParams`).
 */
export default function ResetPage() {
	return (
		<Suspense>
			<Reset />
		</Suspense>
	);
}
