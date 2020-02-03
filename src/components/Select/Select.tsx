import React, { useState } from 'react';
import {
  CustomOption,
  CustomOptionsWrapper,
  CustomSelect,
  CustomSelectedOption,
  PlaceHolder,
  SelectLabel,
  SelectWrapper
} from './Select.styles';

interface Props {
  options?: string[];
  marginTop?: string;
  width?: string;
  label: string;
  icon?: string;
  placeHolder?: string;
  onChange: (val?: string) => void;
}

const Select: React.FC<Props> = ({
  options,
  marginTop = '25px',
  width = '100%',
  label,
  placeHolder,
  icon,
  onChange
}) => {
  const [selectedOption, setOption] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { textContent } = e.currentTarget;
    setOption(textContent || '');
    onChange(textContent || '');
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    setVisible(false);
    visible && setOption('');
    visible && onChange('');
  };

  return (
    <SelectWrapper marginTop={marginTop} width={width}>
      <SelectLabel
        role='label'
        icon={icon || '/category-icon.svg'}
        onClick={() => setVisible(visible => !visible)}
      >
        {label}
      </SelectLabel>
      <CustomSelect
        tabIndex={0}
        onClick={() => setVisible(visible => !visible)}
        onBlur={handleOnBlur}
      >
        <CustomSelectedOption role='option' aria-selected active={visible}>
          {selectedOption || <PlaceHolder>{placeHolder}</PlaceHolder>}
        </CustomSelectedOption>
        {visible && (
          <CustomOptionsWrapper>
            {options?.map(option => (
              <CustomOption key={option} role='option' onClick={handleSelect}>
                {option}
              </CustomOption>
            ))}
          </CustomOptionsWrapper>
        )}
      </CustomSelect>
    </SelectWrapper>
  );
};

export default Select;
