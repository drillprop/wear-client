import React, { useEffect, useRef, useState } from 'react';
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
  const [outline, setOutline] = useState(false);
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!imageUrl) {
      setFilename('');
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [imageUrl]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const discardImage = () => {
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <UploadImageWrapper>
      <TopLabel>UPLOAD AN IMAGE</TopLabel>
      <ImageBox imageUrl={imageUrl}>
        {filename && <DiscardImageButton onClick={discardImage} />}
        <FileInputLabel
          htmlFor='file-input'
          highlight={!!filename}
          outline={outline}
        >
          {filename ? filename : 'send a file'}
        </FileInputLabel>
        <StyledFileInput
          ref={inputRef}
          name='imageUrl'
          accept='image/*'
          type='file'
          id='file-input'
          required
          onChange={handleUpload}
          onFocus={() => setOutline(true)}
          onBlur={() => setOutline(false)}
        />
      </ImageBox>
    </UploadImageWrapper>
  );
};

export default UploadImage;
