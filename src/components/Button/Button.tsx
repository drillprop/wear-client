import React from 'react';
import { StyledButton } from './Button.styles';

interface Props {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  mainColor?: string;
  width?: string;
}

const Button: React.FC<Props> = ({
  children,
  type,
  onClick,
  mainColor,
  width
}) => {
  return (
    <StyledButton
      width={width}
      onClick={onClick}
      type={type}
      mainColor={mainColor}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
