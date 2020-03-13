import React, { useEffect, useRef, useState } from 'react';
import {
  DiscardImageButton,
  FileInputLabel,
  ImageBox,
  StyledFileInput,
  TopLabel
} from './UploadImage.styles';

interface Props {
  onChange: (arg: any) => void;
  imageUrl?: string;
  required?: boolean;
  placeholder?: string;
}

const UploadImage: React.FC<Props> = ({
  onChange,
  imageUrl,
  required,
  placeholder = 'send a file'
}) => {
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
    <>
      <TopLabel>UPLOAD AN IMAGE</TopLabel>
      <ImageBox imageUrl={imageUrl}>
        {filename && <DiscardImageButton onClick={discardImage} />}
        <FileInputLabel
          htmlFor='file-input'
          highlight={!!filename}
          outline={outline}
        >
          {filename ? filename : placeholder}
        </FileInputLabel>
        <StyledFileInput
          ref={inputRef}
          name='imageUrl'
          accept='image/*'
          type='file'
          id='file-input'
          required={required}
          onChange={handleUpload}
          onFocus={() => setOutline(true)}
          onBlur={() => setOutline(false)}
        />
      </ImageBox>
    </>
  );
};

export default UploadImage;
