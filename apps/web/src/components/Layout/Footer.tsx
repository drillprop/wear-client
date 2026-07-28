"use client";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import LinkAnchor from "@/components/LinkAnchor/LinkAnchor";

/**
 * Site footer (#79). The deleted Pages-Router `Footer` (+ its `footer/*`
 * columns) rebuilt on Tailwind in one module: a light panel with the Help /
 * About / Contact / newsletter-signup regions and a copyright line. The grays
 * map onto the shadcn `secondary`/`border` tokens. Hidden on `/sign` — the old
 * `Layout` rendered no footer there — via `usePathname` (the App Router
 * replacement for the old `router.pathname` check).
 */
const heading = "m-0 font-roboto text-1 uppercase";
const list = "mx-auto mt-[25px] p-0 text-0";
const item = "mt-[10px] cursor-pointer hover:underline";
const text = "mt-[25px] text-0 leading-loose";

const Footer: FC = () => {
	const pathname = usePathname();
	if (pathname === "/sign") {
		return null;
	}
	return (
		<div className="mt-[90px] bg-secondary">
			<footer className="mx-auto grid max-w-[1200px] grid-rows-[1fr_auto] gap-[50px] py-[100px]">
				<div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center gap-[70px] px-[50px] text-center">
					<div>
						<h4 className={heading}>Help</h4>
						<ul className={list}>
							<li className={item}>Delivery</li>
							<li className={item}>Payments</li>
							<li className={item}>Returns &amp; Exchanges</li>
							<li className={item}>Gift Cards</li>
						</ul>
					</div>
					<div>
						<h4 className={heading}>About</h4>
						<ul className={list}>
							<li className={item}>About Wear</li>
							<li className={item}>Carriers</li>
							<li className={item}>Pressroom</li>
						</ul>
					</div>
					<div>
						<h4 className={heading}>Contact</h4>
						<p className={text}>
							(701) 255-9337 2208
							<br />
							River Dr NE Mandan,
							<br />
							North Dakota(ND), 58554
						</p>
					</div>
					<div>
						<h4 className={heading}>Stay connected</h4>
						<div className="mx-auto mt-[25px] grid max-w-[250px] grid-cols-3 justify-items-center gap-[10px]">
							<img
								src="/facebook-icon.svg"
								alt="facebook icon"
								className="w-10"
							/>
							<img
								src="/instagram-icon.svg"
								alt="instagram icon"
								className="w-10"
							/>
							<img
								src="/pinterest-icon.svg"
								alt="pinterest icon"
								className="w-10"
							/>
						</div>
						<p className={text}>
							Do you want to receive the special offers?{" "}
							<LinkAnchor href="/sign">Sign up</LinkAnchor> and get 15% off
						</p>
					</div>
				</div>
				<div className="mx-[50px] border-t border-border pt-[20px] text-center text-0">
					&copy; Copyright 2019
				</div>
			</footer>
		</div>
	);
};

export default Footer;
