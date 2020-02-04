import React, { ChangeEvent } from 'react';
import {
  FileInputLabel,
  ImageBox,
  StyledFileInput,
  TopLabel,
  UploadImageWrapper
} from './UploadImage.styles';

interface Props {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UploadImage: React.FC<Props> = ({ onChange }) => {
  return (
    <UploadImageWrapper>
      <TopLabel>UPLOAD AN IMAGE</TopLabel>
      <ImageBox>
        <FileInputLabel htmlFor='file-input'>send a file</FileInputLabel>
        <StyledFileInput
          type='file'
          id='file-input'
          required
          onChange={onChange}
        />
      </ImageBox>
    </UploadImageWrapper>
  );
};

export default UploadImage;
