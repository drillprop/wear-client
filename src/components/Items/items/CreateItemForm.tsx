import { SiteForm, SiteFormTitle } from '../../../styles/site.styles';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import useForm from '../../../hooks/useForm';
import Select from '../../Select/Select';
import { Category, Gender } from '../../../generated/types';
import RadioGroup from '../../RadioGroup/RadioGroup';
import TextArea from '../../TextArea/TextArea';

const CreateItemForm = () => {
  const { values, handleInput } = useForm({
    name: ''
  });
  return (
    <SiteForm>
      <SiteFormTitle>Create an item</SiteFormTitle>
      <Input
        type='text'
        placeholder='name'
        label='name'
        name='name'
        icon='/home-icon.svg'
        width='350px'
      />
      <Input
        type='number'
        placeholder='price'
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
      />
      <RadioGroup
        legend='Gender'
        width='350px'
        name='gender'
        buttons={Object.keys(Gender)}
      />
      <TextArea
        label='description'
        placeholder='Lorem ipsum dolor sit amet.'
        width='350px'
      />
      <Button width='350px' type='submit'>
        save
      </Button>
    </SiteForm>
  );
};

export default CreateItemForm;
