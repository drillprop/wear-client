import React, { ChangeEvent } from 'react';
import {
  RangeInputLabel,
  RangeInputWrapper,
  RangeValue,
  StyledRangeInput,
  RangeValueAndInput
} from './RangeInput.styles';

interface Props {
  label?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: number;
  name?: string;
  marginTop?: string;
  width?: string;
}

const RangeInput: React.FC<Props> = ({
  label,
  marginTop = '25px',
  width = '100%',
  value,
  onChange,
  name
}) => {
  return (
    <RangeInputWrapper marginTop={marginTop} width={width}>
      <RangeInputLabel htmlFor={label}>{label}</RangeInputLabel>
      <RangeValueAndInput>
        <RangeValue>{value}</RangeValue>
        <StyledRangeInput
          name={name}
          id={label}
          value={value}
          onChange={onChange}
          type='range'
        />
      </RangeValueAndInput>
    </RangeInputWrapper>
  );
};

export default RangeInput;
