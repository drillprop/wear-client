import React from 'react';
import {
  CustomRadioButton,
  RadioButtonWrapper,
  RadioLabel,
  StyledRadioInput
} from './RadioButton.styles';

interface Props {
  button: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const RadioButton: React.FC<Props> = ({ button, name, onChange, value }) => {
  return (
    <RadioButtonWrapper>
      <StyledRadioInput
        type='radio'
        name={name}
        id={button}
        checked={value === button}
        onChange={onChange}
        value={button}
      />
      <CustomRadioButton />
      <RadioLabel htmlFor={button}>{button}</RadioLabel>
    </RadioButtonWrapper>
  );
};

export default RadioButton;
