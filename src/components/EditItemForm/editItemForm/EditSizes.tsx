import React from 'react';
import { SizeSymbol } from '../../../generated/types';
import Input from '../../Input/Input';
import { SizesInputsWrapper } from './EditSizes.styles';

interface Props {
  setForm: React.Dispatch<any>;
  sizes: any;
}

const EditSizes: React.FC<Props> = ({ sizes, setForm }) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSizes = {
      ...sizes,
      [e.target.name]: parseInt(e.target.value),
    };
    setForm((values: any) => ({
      ...values,
      sizes: newSizes,
    }));
  };
  return (
    <SizesInputsWrapper>
      {Object.values(SizeSymbol).map((size) => (
        <Input
          key={size}
          name={size}
          icon='/category-icon.svg'
          type='number'
          marginTop='0'
          placeholder='0'
          value={sizes[size]}
          label={size}
          onChange={handleOnChange}
        />
      ))}
    </SizesInputsWrapper>
  );
};

export default EditSizes;
