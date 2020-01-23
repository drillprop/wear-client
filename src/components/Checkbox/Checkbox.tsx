import React from 'react';
import {
  StyledCheckbox,
  CheckboxWrapper,
  CheckboxLabel,
  CustomCheckboxWrapper,
  CustomCheckbox
} from './Checkbox.styles';

interface Props {
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  checked?: boolean;
  text?: string;
  id?: string;
  marginTop?: string;
}

const Checkbox: React.FC<Props> = ({
  onChange,
  checked = false,
  text,
  id,
  marginTop
}) => {
  return (
    <CheckboxWrapper marginTop={marginTop}>
      <CheckboxLabel htmlFor={id}>{text}</CheckboxLabel>
      <CustomCheckboxWrapper>
        <StyledCheckbox
          id={id}
          checked={checked}
          onChange={onChange}
          type='checkbox'
        />
        <CustomCheckbox />
      </CustomCheckboxWrapper>
    </CheckboxWrapper>
  );
};

export default Checkbox;
