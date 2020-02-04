import React from 'react';
import {
  CustomRadioButton,
  RadioButtonWrapper,
  RadioLabel,
  StyledRadioInput
} from './RadioButton.styles';

interface Props {
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const RadioButton: React.FC<Props> = ({ id, name, onChange, value }) => {
  return (
    <RadioButtonWrapper>
      <StyledRadioInput
        type='radio'
        name={name}
        id={id}
        onChange={onChange}
        checked={!!value}
        value={id}
      />
      <CustomRadioButton />
      <RadioLabel htmlFor={id}>{id}</RadioLabel>
    </RadioButtonWrapper>
  );
};

export default RadioButton;
