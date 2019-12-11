import React, { FC, useState } from 'react';
import { StyledHeroButton } from './HeroButton.styles';
import { useWindowSize } from '../../hooks/useWindowResize';

interface Props {
  hoverText?: string;
  onClick?: () => void;
}

const HeroButton: FC<Props> = ({ children, hoverText, onClick }) => {
  const [isHovered, hover] = useState(false);
  const [width] = useWindowSize();
  const text = isHovered ? hoverText || children : children;
  return (
    <StyledHeroButton
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
      onClick={onClick}
    >
      {width > 900 ? text : children}
    </StyledHeroButton>
  );
};

export default HeroButton;
