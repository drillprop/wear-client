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
import { CreateItemWrapper } from './CreateItemForm.styles';
import UploadImage from './createItemForm/UploadImage';

interface Props {
  variables: ItemsQueryVariables;
}

const CreateItemForm: React.FC<Props> = ({ variables }) => {
  const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];

  const { values, handleInput, setForm, clearForm } = useForm({
    name: '',
    price: 0,
    category: '',
    gender: '',
    description: '',
    imageUrl: '',
    xs: 0,
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
    xxl: 0
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
        xs: parseInt(values.xs),
        s: parseInt(values.s),
        m: parseInt(values.m),
        l: parseInt(values.l),
        xl: parseInt(values.xl),
        xxl: parseInt(values.x)
      }
    });
  };
  return (
    <SiteForm onSubmit={handleSubmit}>
      <SiteSubtitle>Create an item</SiteSubtitle>
      <ErrorMessage error={error} />
      {data?.createItem.id && 'Succesfully create item'}
      <CreateItemWrapper>
        <UploadImage
          onChange={imageUrl => setForm({ ...values, imageUrl })}
          imageUrl={values.imageUrl}
        />
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
          {sizes.map(size => (
            <Input
              key={size}
              name={size}
              icon='/category-icon.svg'
              width='90px'
              type='number'
              placeholder='0'
              value={values[size]}
              label={size}
              onChange={handleInput}
            />
          ))}
          <Button width='350px' type='submit'>
            save
          </Button>
        </div>
      </CreateItemWrapper>
    </SiteForm>
  );
};

export default CreateItemForm;
