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
  marginTop?: string;
  width?: string;
  label: string;
  icon?: string;
  placeHolder?: string;
}

const Select: React.FC<Props> = ({
  options,
  marginTop = '25px',
  width = '100%',
  label,
  placeHolder,
  icon
}) => {
  const [selectedOption, setOption] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { textContent } = e.currentTarget;
    setOption(textContent || '');
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    setVisible(false);
    visible && setOption('');
  };

  return (
    <SelectWrapper marginTop={marginTop} width={width}>
      <SelectLabel
        role='label'
        id='select-label'
        icon={icon || '/category-icon.svg'}
        onClick={() => setVisible(visible => !visible)}
      >
        {label}
      </SelectLabel>
      <StyledSelect
        tabIndex={0}
        onClick={() => setVisible(visible => !visible)}
        onBlur={handleOnBlur}
      >
        <SelectedOption role='option' aria-selected active={visible}>
          {selectedOption || <PlaceHolder>{placeHolder}</PlaceHolder>}
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
