import React from 'react';
import { StyledButton } from './Button.styles';

interface Props {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  mainColor?: string;
  width?: string;
  marginTop?: string;
}

const Button: React.FC<Props> = ({
  children,
  type,
  onClick,
  mainColor,
  width,
  marginTop = '50px'
}) => {
  return (
    <StyledButton
      width={width}
      onClick={onClick}
      type={type}
      mainColor={mainColor}
      marginTop={marginTop}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
