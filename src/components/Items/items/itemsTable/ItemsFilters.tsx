import React, { useContext } from 'react';
import { ItemsContext } from '../../../../contexts/Items.context';
import { Category, Gender } from '../../../../generated/types';
import Input from '../../../Input/Input';
import Select from '../../../Select/Select';
import { ItemsFiltersWrapper } from './ItemsFilters.styles';

const ItemsFilters = () => {
  const { variables, setVariables } = useContext(ItemsContext);
  return (
    <ItemsFiltersWrapper>
      <Input
        label='search item by name'
        name='name'
        placeholder='search'
        type='search'
        icon='/search-icon.svg'
        small
        value={variables.name as string}
        onChange={e =>
          setVariables({
            ...variables,
            name: e.target.value
          })
        }
      />
      <Select
        label='gender'
        value={variables.gender}
        onChange={gender => setVariables({ ...variables, gender })}
        placeHolder='gender'
        options={Object.values(Gender)}
        small
      />
      <Select
        label='category'
        value={variables.category}
        onChange={category => setVariables({ ...variables, category })}
        placeHolder='category'
        options={Object.values(Category)}
        small
      />
      <Select
        label='items per page'
        onChange={take =>
          take && setVariables({ ...variables, take: parseInt(take) })
        }
        placeHolder='5'
        value={variables.take}
        options={[5, 10, 15, 20, 25]}
        small
      />
    </ItemsFiltersWrapper>
  );
};

export default ItemsFilters;
