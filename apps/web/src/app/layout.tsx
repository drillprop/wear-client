import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { montserrat, robotoCondensed } from "./fonts";
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
		<html
			lang="en"
			className={`${montserrat.variable} ${robotoCondensed.variable}`}
		>
			<body className="antialiased">
				<StyledComponentsRegistry>
					<Providers>{children}</Providers>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
