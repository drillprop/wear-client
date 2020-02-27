import React from 'react';
import {
  Category,
  Gender,
  ItemsQueryVariables
} from '../../../../generated/types';
import Input from '../../../Input/Input';
import Select from '../../../Select/Select';
import { ItemsFiltersWrapper } from './ItemsFilters.styles';

interface Props {
  variables: ItemsQueryVariables;
  setVariables: React.Dispatch<React.SetStateAction<ItemsQueryVariables>>;
}

const ItemsFilters: React.FC<Props> = ({ variables, setVariables }) => {
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
