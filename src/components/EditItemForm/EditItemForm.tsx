import React, { useEffect } from 'react';
import {
  Category,
  Gender,
  SingleItemQuery,
  useUpdateItemMutation,
} from '../../generated/types';
import useForm from '../../hooks/useForm';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import convertSizesToArr from '../../utils/convertSizesToArr';
import convertSizesToObject from '../../utils/convertSizesToObject';
import getNewValFromSecObj from '../../utils/getNewValFromSecObj';
import uploadImageToCloudinary from '../../utils/uploadImageToCloudinary';
import AdminSideNav from '../AdminSideNav/AdminSideNav';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Input from '../Input/Input';
import LinkAnchor from '../LinkAnchor/LinkAnchor';
import RadioGroup from '../RadioGroup/RadioGroup';
import Select from '../Select/Select';
import TextArea from '../TextArea/TextArea';
import UploadImage from '../UploadImage/UploadImage';
import {
  EditFormLinks,
  EditItemWrapper,
  StyledEditForm,
} from './EditItemForm.styles';
import EditSizes from './editItemForm/EditSizes';

interface Props {
  item: SingleItemQuery['item'];
}

const EditItemForm: React.FC<Props> = ({ item }) => {
  const [updateItem, { data, error }] = useUpdateItemMutation();

  const { values, handleInput, setForm } = useForm({
    name: '',
    price: 0,
    category: '',
    gender: '',
    description: '',
    imageUrl: '',
    sizes: convertSizesToObject([]),
  });

  useEffect(() => {
    setForm({ ...item, sizes: convertSizesToObject(item?.sizes) });
  }, [item]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file =
      values.imageUrl !== item?.imageUrl &&
      (await uploadImageToCloudinary(values.imageUrl));

    updateItem({
      variables: {
        ...getNewValFromSecObj(item, values),
        id: item?.id,
        imageUrl: file.secure_url,
        price: parseFloat(values.price),
        sizes: convertSizesToArr(values.sizes),
      },
    });
  };

  const { name, price, category, gender, description, imageUrl } = values;
  return (
    <SiteWrapper>
      <AdminSideNav />
      {item && (
        <StyledEditForm onSubmit={handleSubmit}>
          <SiteSubtitle>EDIT ITEM</SiteSubtitle>
          <EditFormLinks>
            <LinkAnchor
              href={{
                pathname: `/shop/[gender]/[category]/[item]`,
                query: { item: item.id },
              }}
              as={`/shop/${item.gender.toLowerCase()}/${item.category.toLowerCase()}/${
                item.id
              }`}
            >
              Go to item
            </LinkAnchor>
          </EditFormLinks>
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
              />
              <Input
                type='number'
                placeholder='price'
                onChange={handleInput}
                value={price}
                label='price'
                name='price'
                icon='/wallet-icon.svg'
              />
              <UploadImage
                onChange={(imageUrl) => setForm({ ...values, imageUrl })}
                imageUrl={imageUrl}
                placeholder='change image'
              />
            </div>
            <div>
              <Select
                options={Object.values(Category)}
                label='category'
                placeHolder='select'
                onChange={(category) => setForm({ ...values, category })}
                value={category}
              />
              <RadioGroup
                legend='Gender'
                name='gender'
                buttons={Object.values(Gender)}
                onChange={handleInput}
                value={gender}
              />
              <TextArea
                label='description'
                placeholder='Lorem ipsum dolor sit amet.'
                value={description}
                onChange={handleInput}
              />
              <EditSizes setForm={setForm} sizes={values.sizes} />
              <Button type='submit'>save</Button>
            </div>
          </EditItemWrapper>
        </StyledEditForm>
      )}
    </SiteWrapper>
  );
};

export default EditItemForm;
