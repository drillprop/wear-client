import { FormEvent } from 'react';
import {
  Category,
  Gender,
  ItemsQueryVariables,
  useCreateItemMutation
} from '../../../generated/types';
import ITEMS from '../../../graphql/queries/ITEMS';
import useForm from '../../../hooks/useForm';
import { SiteForm, SiteSubtitle } from '../../../styles/site.styles';
import uploadImageToCloudinary from '../../../utils/uploadImageToCloudinary';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Input from '../../Input/Input';
import RadioGroup from '../../RadioGroup/RadioGroup';
import Select from '../../Select/Select';
import TextArea from '../../TextArea/TextArea';
import { CreateItemWrapper, SizesInputsWrapper } from './CreateItemForm.styles';
import UploadImage from './createItemForm/UploadImage';

interface Props {
  variables: ItemsQueryVariables;
}

const CreateItemForm: React.FC<Props> = ({ variables }) => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const { values, handleInput, setForm, clearForm } = useForm({
    name: '',
    price: 0,
    category: '',
    gender: '',
    description: '',
    imageUrl: '',
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0
  });

  const [createItem, { data, error }] = useCreateItemMutation({
    refetchQueries: [{ query: ITEMS, variables }],
    onCompleted: () => clearForm(values)
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = await uploadImageToCloudinary(values.imageUrl);
    const imageUrl = file.secure_url;

    createItem({
      variables: {
        ...values,
        imageUrl,
        price: parseFloat(values.price),
        XS: parseInt(values.XS),
        S: parseInt(values.S),
        M: parseInt(values.M),
        L: parseInt(values.L),
        XL: parseInt(values.XL),
        XXL: parseInt(values.XXL)
      }
    });
  };
  return (
    <SiteForm onSubmit={handleSubmit}>
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
            width='350px'
          />
          <Input
            type='number'
            placeholder='price'
            onChange={handleInput}
            value={values.price}
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
            value={values.category}
          />
          <RadioGroup
            legend='Gender'
            width='350px'
            name='gender'
            buttons={Object.values(Gender)}
            onChange={handleInput}
            value={values.gender}
          />
          <TextArea
            label='description'
            placeholder='Lorem ipsum dolor sit amet.'
            width='350px'
            value={values.description}
            onChange={handleInput}
          />
          <SizesInputsWrapper>
            {sizes.map(size => (
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
        </div>
        <UploadImage
          onChange={imageUrl => setForm({ ...values, imageUrl })}
          imageUrl={values.imageUrl}
        />
      </CreateItemWrapper>
      <Button width='350px' type='submit'>
        save
      </Button>
    </SiteForm>
  );
};

export default CreateItemForm;
