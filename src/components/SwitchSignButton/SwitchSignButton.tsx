import React, { FC, useState } from 'react';
import { StyledSwitchSignButton } from './SwitchSignButton.styles';
import { useWindowSize } from '../../hooks/useWindowResize';

interface Props {
  hoverText?: string;
  onClick?: () => void;
}

const SwitchSignButton: FC<Props> = ({ children, hoverText, onClick }) => {
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
