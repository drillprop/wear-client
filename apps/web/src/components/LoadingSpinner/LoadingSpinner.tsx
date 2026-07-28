/**
 * Three staggered rotating arcs (#84). Ported off styled-components to Tailwind:
 * the `animate-spinner` keyframes live in `globals.css` (kept from #30), and the
 * per-ring `animation-delay` stagger uses inline styles. The `loading-spinner`
 * class is retained — `Shop` positions the spinner through a `.loading-spinner`
 * rule in its own stylesheet.
 */
const RING_DELAYS = ["-0.45s", "-0.3s", "-0.15s"];

const LoadingSpinner = () => {
	return (
		<div className="loading-spinner relative grid size-20 place-self-center">
			{RING_DELAYS.map((delay) => (
				<span
					key={delay}
					className="absolute m-2 block size-16 animate-spinner rounded-full border-8 border-transparent border-t-muted-foreground"
					style={{ animationDelay: delay }}
				/>
			))}
		</div>
	);
};

export default LoadingSpinner;
