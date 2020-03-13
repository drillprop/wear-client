import React, { useEffect } from 'react';
import {
  Category,
  Gender,
  SingleItemQuery,
  SizeSymbol,
  useUpdateItemMutation
} from '../../generated/types';
import SINGLE_ITEM from '../../graphql/queries/SINGLE_ITEM';
import useForm from '../../hooks/useForm';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Input from '../Input/Input';
import RadioGroup from '../RadioGroup/RadioGroup';
import Select from '../Select/Select';
import TextArea from '../TextArea/TextArea';
import {
  EditItemWrapper,
  SizesInputsWrapper,
  StyledEditForm
} from './EditItemForm.styles';
import UploadImage from '../UploadImage/UploadImage';
import uploadImageToCloudinary from '../../utils/uploadImageToCloudinary';

interface Props {
  item?: SingleItemQuery['item'];
}

const EditItemForm: React.FC<Props> = ({ item }) => {
  const [updateItem, { data, error }] = useUpdateItemMutation({
    refetchQueries: [{ query: SINGLE_ITEM, variables: { id: item?.id } }]
  });

  const { values, handleInput, setForm } = useForm({
    name: '',
    price: 0,
    category: '',
    gender: '',
    description: '',
    imageUrl: '',
    sizes: Object.values(SizeSymbol).map(sizeSymbol => ({
      sizeSymbol,
      quantity: 0
    }))
  });

  const sizes = item?.sizes?.reduce((acc: any, size) => {
    if (size.sizeSymbol) {
      acc[size.sizeSymbol] = size.quantity;
      return acc;
    }
  }, {});

  useEffect(() => {
    setForm({
      ...item,
      ...sizes
    });
  }, [item]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isNameChanged = () => {
      if (item?.name !== values.name && values.name) return values.name;
    };

    const file = await uploadImageToCloudinary(values.imageUrl);
    const imageUrl = file.secure_url;

    const sizes = Object.values(SizeSymbol)
      .map(
        sizeSymbol =>
          values[sizeSymbol] && {
            sizeSymbol,
            quantity: parseInt(values[sizeSymbol])
          }
      )
      .filter(Boolean);

    updateItem({
      variables: {
        id: item?.id,
        ...values,
        imageUrl,
        name: isNameChanged(),
        price: parseFloat(values.price),
        sizes
      }
    });
  };

  const { name, price, category, gender, description, imageUrl } = values;
  return (
    <SiteWrapper>
      <AdminSideNav />
      <StyledEditForm onSubmit={handleSubmit}>
        <SiteSubtitle>EDIT ITEM</SiteSubtitle>
        <ErrorMessage error={error} />
        {data?.updateItem.id && 'Succesfully updated item'}
        <EditItemWrapper>
          <div>
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
            <UploadImage
              onChange={imageUrl => setForm({ ...values, imageUrl })}
              imageUrl={imageUrl}
              placeholder='change image'
            />
          </div>
          <div>
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
            <Button type='submit'>Save</Button>
          </div>
        </EditItemWrapper>
      </StyledEditForm>
    </SiteWrapper>
  );
};

export default EditItemForm;
