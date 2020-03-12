import React from 'react';
import {
  Category,
  Gender,
  SingleItemQuery,
  SizeSymbol,
  useMeQuery,
  UserRole
} from '../../generated/types';
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
  const meQuery = useMeQuery();
  const isAdmin =
    meQuery.data?.me && meQuery.data.me.role !== UserRole.Customer;
  return (
    <SiteWrapper>
      <AdminSideNav />
      <EditItemWrapper>
        <SiteSubtitle>{item?.category}</SiteSubtitle>
        <Input
          type='text'
          placeholder='name'
          onChange={() => {}}
          value={item?.name}
          label='name'
          name='name'
          icon='/info-icon.svg'
          width='350px'
        />
        <Input
          type='number'
          placeholder='price'
          onChange={() => {}}
          value={item?.price}
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
          onChange={() => {}}
          value={item?.category}
        />
        <RadioGroup
          legend='Gender'
          width='350px'
          name='gender'
          buttons={Object.values(Gender)}
          onChange={() => {}}
          value={item?.gender}
        />
        <TextArea
          label='description'
          placeholder='Lorem ipsum dolor sit amet.'
          width='350px'
          value={item?.description}
          onChange={() => {}}
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
              value={
                item?.sizes?.find(item => item.sizeSymbol === size)?.quantity ||
                0
              }
              label={size}
              onChange={() => {}}
            />
          ))}
        </SizesInputsWrapper>
      </EditItemWrapper>
    </SiteWrapper>
  );
};

export default EditItemForm;
