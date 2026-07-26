import { type FC, type PropsWithChildren, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowResize";
import { StyledSwitchSignButton } from "./SwitchSignButton.styles";

interface Props {
	hoverText?: string;
	onClick?: () => void;
}

const SwitchSignButton: FC<PropsWithChildren<Props>> = ({
	children,
	hoverText,
	onClick,
}) => {
	const [isHovered, hover] = useState(false);
	const [width] = useWindowSize();
	const text = isHovered ? hoverText || children : children;
	return (
		<StyledSwitchSignButton
			onMouseEnter={() => hover(true)}
			onMouseLeave={() => hover(false)}
			onClick={onClick}
		>
			{width > 900 ? text : children}
		</StyledSwitchSignButton>
	);
};

export default SwitchSignButton;
