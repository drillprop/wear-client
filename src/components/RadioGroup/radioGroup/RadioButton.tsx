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
}

const RadioButton: React.FC<Props> = ({ id, name }) => {
  return (
    <RadioButtonWrapper>
      <StyledRadioInput type='radio' name={name} id={id} />
      <CustomRadioButton />
      <RadioLabel htmlFor={id}>{id}</RadioLabel>
    </RadioButtonWrapper>
  );
};

export default RadioButton;
