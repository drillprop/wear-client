import React, { useEffect } from 'react';
import {
  Category,
  Gender,
  SingleItemQuery,
  SizeSymbol
} from '../../generated/types';
import useForm from '../../hooks/useForm';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Input from '../Input/Input';
import RadioGroup from '../RadioGroup/RadioGroup';
import Select from '../Select/Select';
import TextArea from '../TextArea/TextArea';
import { EditItemWrapper, SizesInputsWrapper } from './EditItemForm.styles';

interface Props {
  item?: SingleItemQuery['item'];
}

const EditItemForm: React.FC<Props> = ({ item }) => {
  const availableSizes = Object.values(SizeSymbol);
  const { values, handleInput, setForm } = useForm({
    name: '',
    price: 0,
    category: '',
    gender: '',
    description: '',
    imageUrl: '',
    ...availableSizes.reduce((acc: any, size) => {
      acc[size] = 0;
      return acc;
    }, {})
  });

  const sizes = item?.sizes?.reduce((acc: any, size) => {
    if (size.sizeSymbol) {
      acc[size.sizeSymbol] = size.quantity;
      return acc;
    }
  }, {});
  useEffect(() => {
    setForm({
      name: item?.name,
      price: item?.price,
      category: item?.category,
      gender: item?.gender,
      description: item?.description,
      imageUrl: item?.imageUrl,
      ...sizes
    });
  }, [item]);

  const { name, price, category, gender, description } = values;
  return (
    <SiteWrapper>
      <AdminSideNav />
      <EditItemWrapper>
        <SiteSubtitle>EDIT ITEM</SiteSubtitle>
        <Input
          type='text'
          placeholder='name'
          onChange={handleInput}
          value={name}
          label='name'
          name='name'
          icon='/info-icon.svg'
          width='350px'
        />
        <Input
          type='number'
          placeholder='price'
          onChange={handleInput}
          value={price}
          label='price'
          name='price'
          icon='/wallet-icon.svg'
          width='350px'
        />
        <Select
          options={Object.values(Category)}
          width='350px'
          label='category'
          placeHolder='select'
          onChange={category => setForm({ ...values, category })}
          value={category}
        />
        <RadioGroup
          legend='Gender'
          width='350px'
          name='gender'
          buttons={Object.values(Gender)}
          onChange={handleInput}
          value={gender}
        />
        <TextArea
          label='description'
          placeholder='Lorem ipsum dolor sit amet.'
          width='350px'
          value={description}
          onChange={handleInput}
        />
        <SizesInputsWrapper>
          {Object.values(SizeSymbol).map(size => (
            <Input
              key={size}
              name={size}
              icon='/category-icon.svg'
              width='90px'
              type='number'
              marginTop='0'
              placeholder='0'
              value={values[size]}
              label={size}
              onChange={handleInput}
            />
          ))}
        </SizesInputsWrapper>
      </EditItemWrapper>
    </SiteWrapper>
  );
};

export default EditItemForm;
