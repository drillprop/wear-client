import React, { ChangeEvent } from 'react';
import {
  FileInputWrapper,
  FileInputLabel,
  StyledFileInput,
  CustomFileInput
} from './FileInput.styles';
import Button from '../Button/Button';
import { black } from '../../styles/colors';

interface Props {
  label: string;
  icon?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  name?: string;
  marginTop?: string;
  width?: string;
}

const FileInput: React.FC<Props> = ({
  label,
  name,
  required,
  marginTop = '25px',
  width = '100%'
}) => {
  return (
    <FileInputWrapper marginTop={marginTop} width={width}>
      <FileInputLabel htmlFor={label}>{label}</FileInputLabel>
      <StyledFileInput
        type='file'
        name={name ? name : label}
        id={label}
        required={required}
      />
      <CustomFileInput>upload a file</CustomFileInput>
    </FileInputWrapper>
  );
};

export default FileInput;
