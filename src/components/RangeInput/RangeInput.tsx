import React from 'react';
import {
  RangeInputLabel,
  RangeInputWrapper,
  RangeValue,
  RangeValueAndInput,
  StyledRangeInput
} from './RangeInput.styles';

interface Props {
  label?: string;
  onChange?: (e: any) => void;
  value?: number;
  name?: string;
  marginTop?: string;
  width?: string;
  max?: number;
  placeholder?: string;
}

const RangeInput: React.FC<Props> = ({
  label,
  marginTop = '25px',
  width = '100%',
  value = 0,
  onChange,
  name,
  max,
  placeholder
}) => {
  return (
    <RangeInputWrapper marginTop={marginTop} width={width}>
      <RangeInputLabel htmlFor={label}>{label}</RangeInputLabel>
      <RangeValueAndInput>
        <StyledRangeInput
          name={name}
          max={max}
          id={label}
          value={value}
          onChange={onChange}
          type='range'
        />
        <RangeValue
          type='number'
          max={max}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
      </RangeValueAndInput>
    </RangeInputWrapper>
  );
};

export default RangeInput;
