import React from 'react';
import { StyledButton } from './Button.styles';

interface Props {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  mainColor?: string;
  width?: string;
  marginTop?: string;
}

const Button: React.FC<Props> = ({
  children,
  type,
  onClick,
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
