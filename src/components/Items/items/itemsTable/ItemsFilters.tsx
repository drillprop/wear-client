import React from 'react';
import { Category, Gender, useItemsQuery } from '../../../../generated/types';
import useForm from '../../../../hooks/useForm';
import Input from '../../../Input/Input';
import Select from '../../../Select/Select';
import { ItemsFiltersWrapper } from './ItemsFilters.styles';

const ItemsFilters = () => {
  const { values, handleInput, setForm } = useForm({
    whereName: '',
    gender: '',
    whereCategory: '',
    take: 5
  });
  const { whereName, whereGender, whereCategory, take } = values;
  const { data } = useItemsQuery({
    variables: {
      whereName: whereName || null,
      whereGender: whereGender || null,
      whereCategory: whereCategory || null,
      take: take || null
    }
  });

  return (
    <ItemsFiltersWrapper>
      <Input
        label='search item by name'
        name='whereName'
        placeholder='search'
        type='search'
        icon='/search-icon.svg'
        small
        value={whereName}
        onChange={handleInput}
      />
      <Select
        label='gender'
        onChange={whereGender => setForm({ ...values, whereGender })}
        placeHolder='gender'
        options={Object.values(Gender)}
        value={whereGender}
        small
      />
      <Select
        label='category'
        onChange={whereCategory => setForm({ ...values, whereCategory })}
        value={whereCategory}
        placeHolder='category'
        options={Object.values(Category)}
        small
      />
      <Select
        label='items per page'
        onChange={take => setForm({ ...values, take: take && parseInt(take) })}
        placeHolder='5'
        value={take}
        options={['5', '10', '15', '20', '25']}
        small
      />
    </ItemsFiltersWrapper>
  );
};

export default ItemsFilters;
