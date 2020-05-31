import React, { useState } from 'react';
import {
  CustomOption,
  CustomSelect,
  CustomSelectedOption,
  PlaceHolder,
  SelectLabel,
  SelectWrapper,
} from './Select.styles';

interface Props {
  options?: any[];
  marginTop?: string;
  width?: string;
  label: string;
  icon?: string;
  placeHolder?: string;
  onChange: (val: any) => void;
  value?: string | number | null;
  small?: boolean;
}

const Select: React.FC<Props> = ({
  options,
  marginTop = '25px',
  width = '100%',
  label,
  placeHolder,
  value = '',
  icon,
  onChange,
  small,
}) => {
  const [visible, setVisible] = useState(false);
  const [optIndex, setOptIndex] = useState(-1);

  const handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { textContent } = e.currentTarget;
    onChange(textContent || '');
  };

  const handleOnBlur = () => {
    setVisible(false);
    visible && onChange(null);
    setOptIndex(-1);
  };

  const handleKeyEvents = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setVisible((visible) => !visible);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (options?.length && optIndex < options.length - 1) {
        onChange(options[optIndex + 1]);
        setOptIndex((index) => index + 1);
      }
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (options?.length && optIndex > 0) {
        onChange(options[optIndex - 1]);
        setOptIndex((index) => index - 1);
      }
    }
  };

  return (
    <SelectWrapper marginTop={marginTop} width={width}>
      <SelectLabel
        icon={icon || '/category-icon.svg'}
        onClick={() => setVisible((visible) => !visible)}
        small={small}
      >
        {label}
      </SelectLabel>
      <CustomSelect
        role='listbox'
        tabIndex={0}
        onClick={() => setVisible((visible) => !visible)}
        onKeyDown={handleKeyEvents}
        onBlur={handleOnBlur}
        small={small}
      >
        <CustomSelectedOption
          role='option'
          aria-selected
          active={visible}
          small={small}
        >
          {value || <PlaceHolder>{placeHolder}</PlaceHolder>}
        </CustomSelectedOption>
        {visible && (
          <>
            {options?.map((option) => (
              <CustomOption
                small={small}
                key={option}
                role='option'
                onClick={handleSelect}
                highlight={option === value}
              >
                {option}
              </CustomOption>
            ))}
          </>
        )}
      </CustomSelect>
    </SelectWrapper>
  );
};

export default Select;
