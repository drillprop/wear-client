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
}

const RadioButton: React.FC<Props> = ({ id, name, onChange }) => {
  return (
    <RadioButtonWrapper>
      <StyledRadioInput
        type='radio'
        name={name}
        id={id}
        onChange={onChange}
        value={id}
      />
      <CustomRadioButton />
      <RadioLabel htmlFor={id}>{id}</RadioLabel>
    </RadioButtonWrapper>
  );
};

export default RadioButton;
