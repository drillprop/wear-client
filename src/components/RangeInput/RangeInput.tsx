import React, { ChangeEvent, useState } from 'react';
import {
  RangeInputLabel,
  RangeInputWrapper,
  RangeValue,
  StyledRangeInput,
  RangeValueAndInput
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
  max = 100,
  placeholder
}) => {
  return (
    <RangeInputWrapper marginTop={marginTop} width={width}>
      <RangeInputLabel htmlFor={label}>{label}</RangeInputLabel>
      <RangeValueAndInput>
        <StyledRangeInput
          name={name}
          min={0}
          max={max}
          id={label}
          value={value}
          onChange={onChange}
          type='range'
        />
        <RangeValue
          type='number'
          min={0}
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
