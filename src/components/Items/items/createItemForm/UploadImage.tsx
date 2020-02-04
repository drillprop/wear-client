import React, { useState, useEffect } from 'react';
import uploadImageToCloudinary from '../../../../utils/uploadImageToCloudinary';
import {
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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileName = e.target.value.split('\\').pop();
    fileName && setFilename(fileName);

    const image = await uploadImageToCloudinary(e);
    onChange(image.secure_url);
  };

  useEffect(() => {
    if (!imageUrl) setFilename('');
  }, [imageUrl]);

  return (
    <UploadImageWrapper>
      <TopLabel>UPLOAD AN IMAGE</TopLabel>
      <ImageBox imageUrl={imageUrl}>
        <FileInputLabel htmlFor='file-input'>
          {filename ? filename : 'send a file'}
        </FileInputLabel>
        <StyledFileInput
          name='imageUrl'
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
