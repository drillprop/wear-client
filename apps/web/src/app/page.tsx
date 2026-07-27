import HomeContent from "./home-content";

/**
 * Home `/` — a static server component (no dynamic APIs). It renders the
 * client `HomeContent` island, which carries the styled markup and the real
 * GraphQL round-trip probe.
 */
export default function HomePage() {
	return <HomeContent />;
}
