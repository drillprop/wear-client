import React from 'react';
import { StyledInput, StyledLabel } from './Input.styles';

interface Props {
  label: string;
  placeholder: string;
  type: string;
  icon?: string;
  onChange?: () => void;
  value?: string;
  required?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  placeholder,
  icon,
  type,
  value = '',
  onChange = () => null,
  required
}) => {
  return (
    <div>
      <StyledLabel htmlFor={label} icon={icon}>
        {label}
      </StyledLabel>
      <StyledInput
        value={value}
        onChange={onChange}
        name={label}
        id={label}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
