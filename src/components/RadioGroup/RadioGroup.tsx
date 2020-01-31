import React from 'react';
import { RadioGroupFieldSet, RadioGroupLegend } from './RadioGroup.styles';
import RadioButton from './radioGroup/RadioButton';

interface Props {
  buttons: string[];
  name: string;
  marginTop?: string;
  width?: string;
  legend: string;
  placeHolder?: string;
}

const RadioGroup: React.FC<Props> = ({
  buttons,
  marginTop = '25px',
  width = '100%',
  legend,
  name
}) => {
  return (
    <RadioGroupFieldSet marginTop={marginTop} width={width}>
      <RadioGroupLegend>{legend}</RadioGroupLegend>
      {buttons.map(button => (
        <RadioButton id={button} name={name}></RadioButton>
      ))}
    </RadioGroupFieldSet>
  );
};

export default RadioGroup;
