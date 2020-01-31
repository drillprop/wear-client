import React from 'react';
import { RadioGroupFieldSet, RadioGroupLegend } from './RadioGroup.styles';

interface Props {
  buttons?: string[];
  marginTop?: string;
  width?: string;
  legend: string;
  placeHolder?: string;
}

const RadioGroup: React.FC<Props> = ({
  buttons,
  marginTop = '25px',
  width = '100%',
  legend
}) => {
  return (
    <RadioGroupFieldSet marginTop={marginTop} width={width}>
      <RadioGroupLegend>{legend}</RadioGroupLegend>
    </RadioGroupFieldSet>
  );
};

export default RadioGroup;
