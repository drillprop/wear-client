import React, { ChangeEvent } from 'react';
import {
  TextAreaWrapper,
  TextAreaLabel,
  StyledTextArea
} from './TextArea.styles';

interface Props {
  label: string;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  required?: boolean;
  name?: string;
  marginTop?: string;
  width?: string;
}

const TextArea: React.FC<Props> = ({
  value,
  onChange,
  name,
  label,
  placeholder,
  required,
  marginTop = '25px',
  width = '100%'
}) => {
  return (
    <TextAreaWrapper marginTop={marginTop} width={width}>
      <TextAreaLabel htmlFor={label}>{label}</TextAreaLabel>
      <StyledTextArea
        value={value}
        onChange={onChange}
        name={name ? name : label}
        id={label}
        placeholder={placeholder}
        required={required}
      ></StyledTextArea>
    </TextAreaWrapper>
  );
};

export default TextArea;
