import React from 'react';
import Input from '../../Input/Input';
import { SizesInputsWrapper } from './EditSizes.styles';
import { SizesArr } from '../../../utils/constants';

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
      {SizesArr.map((size) => (
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
