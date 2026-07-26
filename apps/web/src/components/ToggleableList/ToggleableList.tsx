import type React from "react";
import { useState } from "react";

interface Props {
	title: string;
}

const ToggleableList: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	title,
}) => {
	const [visibleList, toggleList] = useState(false);
	const toggle = () => toggleList(!visibleList);
	return (
		<li>
			<button
				type="button"
				onClick={toggle}
				style={{
					display: "flex",
					alignItems: "center",
					background: "none",
					border: "none",
					padding: 0,
					cursor: "pointer",
					color: "inherit",
					font: "inherit",
				}}
			>
				<svg
					width="20px"
					height="20px"
					viewBox="0 -15 30 30"
					style={{ marginRight: "15px" }}
				>
					<title>{title}</title>
					<path
						d={visibleList ? `M0,10 20,10 10,0` : `M0,0 20,0 10,10`}
						fill="white"
					/>
				</svg>
				{title}
			</button>
			{visibleList && <ul>{children}</ul>}
		</li>
	);
};

export default ToggleableList;
