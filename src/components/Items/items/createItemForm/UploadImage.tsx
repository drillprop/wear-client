import React, { useEffect, useState } from 'react';
import {
  DiscardImageButton,
  FileInputLabel,
  ImageBox,
  StyledFileInput,
  TopLabel,
  UploadImageWrapper
} from './UploadImage.styles';

interface Props {
  onChange: (arg: any) => void;
  imageUrl?: string;
}

const UploadImage: React.FC<Props> = ({ onChange, imageUrl }) => {
  const [filename, setFilename] = useState('');

  useEffect(() => {
    if (!imageUrl) setFilename('');
  }, [imageUrl]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileName = e.target.value.split('\\').pop();
    fileName && setFilename(fileName);
    const reader = new FileReader();

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      reader.onload = e => {
        onChange(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <UploadImageWrapper>
      <TopLabel>UPLOAD AN IMAGE</TopLabel>
      <ImageBox imageUrl={imageUrl}>
        {filename && <DiscardImageButton />}
        <FileInputLabel htmlFor='file-input' highlight={!!filename}>
          {filename ? filename : 'send a file'}
        </FileInputLabel>
        <StyledFileInput
          name='imageUrl'
          accept='image/*'
          type='file'
          id='file-input'
          required
          onChange={handleUpload}
        />
      </ImageBox>
    </UploadImageWrapper>
  );
};

export default UploadImage;
