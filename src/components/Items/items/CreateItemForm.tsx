import { Category, Gender } from '../../../generated/types';
import useForm from '../../../hooks/useForm';
import { SiteForm, SiteFormTitle } from '../../../styles/site.styles';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import RadioGroup from '../../RadioGroup/RadioGroup';
import Select from '../../Select/Select';
import TextArea from '../../TextArea/TextArea';
import { CreateItemWrapper } from './CreateItemForm.styles';
import UploadImage from './createItemForm/UploadImage';

const CreateItemForm = () => {
  const { values, handleInput, setForm } = useForm({
    name: '',
    price: 0,
    category: '',
    gender: '',
    description: '',
    imageUrl: ''
  });

  return (
    <SiteForm>
      <SiteFormTitle>Create an item</SiteFormTitle>
      <CreateItemWrapper>
        <UploadImage />
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
            options={Object.keys(Category)}
            width='350px'
            label='category'
            placeHolder='select'
            onChange={category => setForm({ ...values, category })}
          />
          <RadioGroup
            legend='Gender'
            width='350px'
            name='gender'
            buttons={Object.keys(Gender)}
            onChange={handleInput}
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
