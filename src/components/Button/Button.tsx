import React from 'react';
import { StyledButton } from './Button.styles';

interface Props {
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<Props> = ({ children, type }) => {
  return <StyledButton type={type}>{children}</StyledButton>;
};

export default Button;
