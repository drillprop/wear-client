import React, { ChangeEvent } from 'react';
import { StyledInput, StyledLabel } from './Input.styles';

interface Props {
  label: string;
  placeholder: string;
  type: string;
  icon?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  name?: string;
  marginTop?: string;
  width?: string;
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
  width = '100%'
}) => {
  return (
    <div style={{ width }}>
      <StyledLabel htmlFor={label} icon={icon} marginTop={marginTop}>
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
      />
    </div>
  );
};

export default Input;
