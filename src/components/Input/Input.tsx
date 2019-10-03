import React from 'react';
import { StyledInput, StyledLabel } from './Input.styles';

interface Props {
  label: string;
  placeholder: string;
  type: string;
  icon?: string;
}

const Input: React.FC<Props> = ({ label, placeholder, icon, type }) => {
  return (
    <>
      <StyledLabel htmlFor={label} icon={icon}>
        {label}
      </StyledLabel>
      <StyledInput
        id={label}
        type={type}
        placeholder={placeholder}
      ></StyledInput>
    </>
  );
};

export default Input;
