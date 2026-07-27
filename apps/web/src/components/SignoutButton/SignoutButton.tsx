"use client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { signout } from "../../graphql/mutations/SIGNOUT";

interface Props {
	className?: string;
	children?: React.ReactNode;
}

/**
 * Signs the user out via the `Signout` mutation (clearing the session cookie
 * through the proxy), then navigates home so the server re-evaluates auth. Used
 * from the account area; the frozen header keeps its own logout until cutover.
 */
const SignoutButton: React.FC<Props> = ({ className, children }) => {
	const router = useRouter();
	const [signoutMutation] = useMutation(signout);

	const handleSignout = async () => {
		await signoutMutation();
		router.push("/");
	};

	return (
		<button type="button" className={className} onClick={handleSignout}>
			{children ?? "sign out"}
		</button>
	);
};

export default SignoutButton;
