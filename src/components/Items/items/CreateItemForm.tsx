import { FormEvent } from 'react';
import {
  Category,
  Gender,
  useCreateItemMutation
} from '../../../generated/types';
import { ITEMS, ITEMS_COUNT } from '../../../graphql/queries';
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

const CreateItemForm: React.FC = () => {
  const { values, handleInput, setForm, clearForm } = useForm({
    name: '',
    price: 0,
    category: '',
    gender: '',
    description: '',
    imageUrl: ''
  });

  const [createItem, { data, error }] = useCreateItemMutation({
    refetchQueries: [
      {
        query: ITEMS,
        variables: {
          take: 5,
          desc: true,
          skip: 0,
          orderBy: 'Item.createdAt'
        }
      },
      {
        query: ITEMS_COUNT
      }
    ]
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = await uploadImageToCloudinary(values.imageUrl);
    const imageUrl = file.secure_url;
    const largeImageUrl = file.eager[0].secure_url;

    createItem({
      variables: {
        ...values,
        price: parseFloat(values.price),
        imageUrl,
        largeImageUrl
      }
    }).then(() => clearForm(values));
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
            icon='/home-icon.svg'
            width='350px'
          />
          <Input
            type='number'
            placeholder='price'
            onChange={handleInput}
            value={values.price}
            label='price'
            name='price'
            icon='/home-icon.svg'
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
          <Button width='350px' type='submit'>
            save
          </Button>
        </div>
      </CreateItemWrapper>
    </SiteForm>
  );
};

export default CreateItemForm;
