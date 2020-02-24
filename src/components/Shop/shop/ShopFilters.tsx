import React from 'react';
import { Gender, ItemsQueryVariables } from '../../../generated/types';
import Input from '../../Input/Input';
import Select from '../../Select/Select';
import { ShopFiltersWrapper } from './ShopFilters.styles';
import RangeInput from '../../RangeInput/RangeInput';

interface Props {
  setFilters: any;
  filters: ItemsQueryVariables;
  gender: Gender;
}

const ShopFilters: React.FC<Props> = ({ setFilters, filters }) => {
  return (
    <ShopFiltersWrapper>
      <RangeInput
        label={'price from'}
        value={filters.priceFrom || 0}
        onChange={e =>
          setFilters({ ...filters, priceFrom: parseInt(e.target.value) })
        }
      />
      <RangeInput
        label={'price to'}
        value={filters.priceTo || 0}
        onChange={e =>
          setFilters({ ...filters, priceTo: parseInt(e.target.value) })
        }
      />
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
