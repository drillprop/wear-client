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
  maxPrice: number;
}

const ShopFilters: React.FC<Props> = ({ setFilters, filters, maxPrice }) => {
  return (
    <ShopFiltersWrapper>
      <RangeInput
        max={maxPrice}
        label={'price from'}
        value={filters.priceFrom || 0}
        onChange={e =>
          setFilters({
            ...filters,
            priceFrom: Math.min(parseInt(e.target.value), filters.priceTo || 0)
          })
        }
      />
      <RangeInput
        max={maxPrice}
        label={'price to'}
        value={filters.priceTo || maxPrice}
        onChange={e =>
          setFilters({
            ...filters,
            priceTo: Math.max(parseInt(e.target.value), filters.priceFrom || 0)
          })
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
