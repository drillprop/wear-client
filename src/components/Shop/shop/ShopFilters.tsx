import React from 'react';
import { Gender, ItemsQueryVariables } from '../../../generated/types';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import { ShopFiltersWrapper } from './ShopFilters.styles';

interface Props {
  setFilters: any;
  filters: ItemsQueryVariables;
  gender: Gender;
}

const ShopFilters: React.FC<Props> = ({ setFilters, filters }) => {
  return (
    <ShopFiltersWrapper>
      <Input
        label='search item by name'
        name='name'
        value={filters.name ? filters.name : ''}
        onChange={e =>
          setFilters({
            ...filters,
            name: e.target.value
          })
        }
        placeholder='search'
        type='search'
        icon='/search-icon.svg'
        small
      />
      <Select
        label='items per page'
        onChange={take =>
          take && setFilters({ ...filters, take: parseInt(take) })
        }
        value={filters.take}
        placeHolder='5'
        options={[5, 10, 15, 20, 25]}
        small
      />
    </ShopFiltersWrapper>
  );
};

export default ShopFilters;
