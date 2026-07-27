import type { Metadata } from "next";
import type { ReactNode } from "react";
import StyledComponentsRegistry from "./lib/styled-components-registry";
import { Providers } from "./providers";

/**
 * Root layout — merges the old `_app` (title, fonts, providers) and `_document`
 * (html/body shell). The App Router now owns the shell; the styled-components
 * registry is a temporary bridge (see StyledComponentsRegistry).
 */
export const metadata: Metadata = {
	title: "wear",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link
					href="https://fonts.googleapis.com/css?family=Montserrat:500,600,700|Roboto+Condensed:400,700,700i&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<StyledComponentsRegistry>
					<Providers>{children}</Providers>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
