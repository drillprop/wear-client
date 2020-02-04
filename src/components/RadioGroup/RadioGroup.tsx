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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const RadioGroup: React.FC<Props> = ({
  buttons,
  marginTop = '25px',
  width = '100%',
  legend,
  name,
  onChange,
  value = ''
}) => {
  return (
    <RadioGroupFieldSet marginTop={marginTop} width={width}>
      <RadioGroupLegend>{legend}</RadioGroupLegend>
      {buttons.map(button => (
        <RadioButton
          key={button}
          id={button}
          name={name}
          onChange={onChange}
          value={value}
        />
      ))}
    </RadioGroupFieldSet>
  );
};

export default RadioGroup;
