"use client";
import { useMutation } from "@apollo/client/react";
import { cn } from "@wear/ui/lib/utils";
import { useRouter } from "next/navigation";
import type React from "react";
import { signout } from "../../graphql/mutations/SIGNOUT";

interface Props {
	className?: string;
	children?: React.ReactNode;
}

/**
 * Signs the user out via the `Signout` mutation (clearing the session cookie
 * through the proxy), then navigates home so the server re-evaluates auth. Every
 * call site (account side-nav, header dropdowns, mobile menu) renders it as a
 * nav link, so the "reset the `<button>` to inherit the surrounding text" style
 * is the default here; `className` still layers on top via `cn()`.
 */
const RESET =
	"cursor-pointer border-none bg-transparent p-0 font-[inherit] text-inherit uppercase";

const SignoutButton: React.FC<Props> = ({ className, children }) => {
	const router = useRouter();
	const [signoutMutation] = useMutation(signout);

	const handleSignout = async () => {
		await signoutMutation();
		router.push("/");
	};

	return (
		<button
			type="button"
			className={cn(RESET, className)}
			onClick={handleSignout}
		>
			{children ?? "sign out"}
		</button>
	);
};

export default SignoutButton;
