import React from 'react';
import { StyledArrow } from './ArrowButton.styles';

interface Props {
  direction?: 'up' | 'down';
  color?: string;
  size: number;
}

const ArrowButton: React.FC<Props> = ({
  direction = 'up',
  color = 'black',
  size = 5
}) => {
  return (
    <StyledArrow
      role='button'
      direction={direction}
      color={color}
      size={size}
    />
  );
};

export default ArrowButton;
