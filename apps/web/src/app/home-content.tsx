"use client";
import HomepageImage from "@/components/HomePageImage/HomepageImage";

/**
 * Home landing (#85). `Home.styles.ts` `HomePageWrapper` becomes the responsive
 * auto-fit tile grid inline, and the two category tiles now compose the ported
 * `HomepageImage` — the old inline `Tile` duplicate (which reached into
 * `HomepageImage.styles`) is dropped, so both style modules are deleted.
 */
export default function HomeContent() {
	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[60px]">
			<HomepageImage link="/shop/woman" imageUrl="/woman-in-summer-fashion.jpg">
				for her
			</HomepageImage>
			<HomepageImage link="/shop/man" imageUrl="/man-looks-out-window.jpg">
				for him
			</HomepageImage>
		</div>
	);
}
