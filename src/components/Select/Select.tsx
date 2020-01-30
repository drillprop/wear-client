import React, { useState } from 'react';
import {
  PlaceHolder,
  SelectedOption,
  SelectLabel,
  SelectWrapper,
  StyledOption,
  StyledOptions,
  StyledSelect
} from './Select.styles';

interface Props {
  options?: string[];
}

const Select: React.FC<Props> = ({ options }) => {
  const [selectedOption, setOption] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { textContent } = e.currentTarget;
    setOption(textContent || '');
  };
  return (
    <SelectWrapper>
      <SelectLabel role='label' id='select-label'>
        Label
      </SelectLabel>
      <StyledSelect
        tabIndex={0}
        onClick={() => setVisible(visible => !visible)}
        onBlur={() => setVisible(false)}
      >
        <SelectedOption role='option' aria-selected>
          {selectedOption || <PlaceHolder>Select</PlaceHolder>}
        </SelectedOption>
        {visible && (
          <StyledOptions>
            {options?.map(option => (
              <StyledOption
                key={option}
                id='list-2'
                role='option'
                onClick={handleSelect}
              >
                {option}
              </StyledOption>
            ))}
          </StyledOptions>
        )}
      </StyledSelect>
    </SelectWrapper>
  );
};

export default Select;
