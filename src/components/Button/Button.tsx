import React from 'react';
import { StyledButton } from './Button.styles';

interface Props {
  mainColor?: string;
  width?: string;
  marginTop?: string;
}

const Button: React.FC<Props &
  React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  type,
  onClick,
  children,
  mainColor,
  marginTop = '50px',
  width = '100%'
}) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      mainColor={mainColor}
      marginTop={marginTop}
      width={width}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
