import HomeContent from "./home-content";

/**
 * Home `/` — a static server component (no dynamic APIs). It renders the
 * client `HomeContent` island, which carries the styled markup for the two
 * category tiles.
 */
export default function HomePage() {
	return <HomeContent />;
}
