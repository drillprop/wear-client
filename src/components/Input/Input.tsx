import React, { ChangeEvent } from 'react';
import { StyledInput, StyledLabel, InputWrapper } from './Input.styles';

interface Props {
  label: string;
  placeholder: string;
  type: string;
  icon?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  required?: boolean;
  name?: string;
  marginTop?: string;
  small?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  placeholder,
  icon,
  type,
  value = '',
  onChange = () => null,
  name,
  required,
  marginTop = '25px',
  small,
}) => {
  return (
    <InputWrapper marginTop={marginTop}>
      <StyledLabel htmlFor={label} icon={icon} small={small}>
        {label}
      </StyledLabel>
      <StyledInput
        value={value}
        onChange={onChange}
        name={name ? name : label}
        id={label}
        type={type}
        placeholder={placeholder}
        required={required}
        small={small}
      />
    </InputWrapper>
  );
};

export default Input;
