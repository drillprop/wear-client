import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { montserrat, robotoCondensed } from "./fonts";
import { Providers } from "./providers";

/**
 * Root layout — merges the old `_app` (title, fonts, providers) and `_document`
 * (html/body shell), and now renders the site chrome (#79): the fixed `Header`,
 * the centred page wrapper / `main` (the old `PageWrapper` + `Main`, mobile-first
 * gutters), and the `Footer` (which hides itself on `/sign`). Chrome sits inside
 * `Providers` so the header's cart + `me` data resolve. Styling is 100% Tailwind
 * now (#90): the temporary styled-components registry is gone.
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
				<Providers>
					<Header />
					<div className="mx-auto flex min-h-[50%] max-w-[1300px] flex-col">
						<main className="mt-[100px] mx-[25px] flex-1 sm:mx-[50px]">
							{children}
						</main>
					</div>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
