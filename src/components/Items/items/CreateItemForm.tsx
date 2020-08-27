import React, { FormEvent } from 'react';
import {
  ItemsQueryVariables,
  useCreateItemMutation,
} from '../../../generated/types';
import ITEMS from '../../../graphql/queries/ITEMS';
import useForm from '../../../hooks/useForm';
import { SiteSubtitle } from '../../../styles/site.styles';
import { CategoryArr, GenderArr, SizesArr } from '../../../utils/constants';
import uploadImageToCloudinary from '../../../utils/uploadImageToCloudinary';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Input from '../../Input/Input';
import RadioGroup from '../../RadioGroup/RadioGroup';
import Select from '../../Select/Select';
import TextArea from '../../TextArea/TextArea';
import UploadImage from '../../UploadImage/UploadImage';
import {
  CreateItemWrapper,
  SizesInputsWrapper,
  StyledCreateForm,
} from './CreateItemForm.styles';

interface Props {
  variables: ItemsQueryVariables;
}

const CreateItemForm: React.FC<Props> = ({ variables }) => {
  const { values, handleInput, setForm, clearForm } = useForm({
    name: '',
    price: 0,
    category: '',
    gender: '',
    description: '',
    imageUrl: '',
    ...SizesArr.reduce((acc: any, size) => {
      acc[size] = 0;
      return acc;
    }, {}),
  });

  const [createItem, { data, error }] = useCreateItemMutation({
    refetchQueries: [{ query: ITEMS, variables }],
    onCompleted: () => clearForm(values),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = await uploadImageToCloudinary(values.imageUrl);
    const imageUrl = file.secure_url;

    const sizes = SizesArr.map(
      (size) =>
        values[size] && {
          sizeSymbol: size,
          quantity: parseInt(values[size]),
        }
    ).filter((size) => size && size);

    createItem({
      variables: {
        ...values,
        imageUrl,
        price: parseFloat(values.price),
        sizes,
      },
    });
  };
  return (
    <StyledCreateForm onSubmit={handleSubmit}>
      <SiteSubtitle>Create an item</SiteSubtitle>
      <ErrorMessage error={error} />
      {data?.createItem.id && 'Succesfully create item'}
      <CreateItemWrapper>
        <div>
          <Input
            type='text'
            placeholder='name'
            onChange={handleInput}
            value={values.name}
            label='name'
            name='name'
            icon='/info-icon.svg'
          />
          <Input
            type='number'
            placeholder='price'
            onChange={handleInput}
            value={values.price}
            label='price'
            name='price'
            icon='/wallet-icon.svg'
          />
          <UploadImage
            onChange={(imageUrl) => setForm({ ...values, imageUrl })}
            imageUrl={values.imageUrl}
          />
        </div>
        <div>
          <Select
            options={CategoryArr}
            label='category'
            placeHolder='select'
            onChange={(category) => setForm({ ...values, category })}
            value={values.category}
          />
          <RadioGroup
            legend='Gender'
            name='gender'
            buttons={GenderArr}
            onChange={handleInput}
            value={values.gender}
          />
          <TextArea
            label='description'
            placeholder='Lorem ipsum dolor sit amet.'
            value={values.description}
            onChange={handleInput}
          />
          <SizesInputsWrapper>
            {SizesArr.map((size) => (
              <Input
                key={size}
                name={size}
                icon='/category-icon.svg'
                type='number'
                marginTop='0'
                placeholder='0'
                value={values[size]}
                label={size}
                onChange={handleInput}
              />
            ))}
          </SizesInputsWrapper>
          <Button width='100%' type='submit'>
            save
          </Button>
        </div>
      </CreateItemWrapper>
    </StyledCreateForm>
  );
};

export default CreateItemForm;
