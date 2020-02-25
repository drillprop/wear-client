import debounce from 'lodash.debounce';
import React, { useEffect, useState } from 'react';
import { Gender, ItemsQueryVariables } from '../../../generated/types';
import Input from '../../Input/Input';
import RangeInput from '../../RangeInput/RangeInput';
import Select from '../../Select/Select';
import { ShopFiltersWrapper } from './ShopFilters.styles';

interface Props {
  setFilters: any;
  filters: ItemsQueryVariables;
  gender: Gender;
  maxPrice: number;
}

const ShopFilters: React.FC<Props> = ({ setFilters, filters, maxPrice }) => {
  const [priceRange, setPriceRange] = useState({
    priceFrom: 0,
    priceTo: 0
  });

  const debounceSetFilters = debounce((filters: ItemsQueryVariables) => {
    setFilters({ ...filters });
  }, 300);

  useEffect(() => {
    debounceSetFilters({
      ...filters,
      ...priceRange
    });
    return () => debounceSetFilters.cancel();
  }, [priceRange]);

  useEffect(() => {
    setPriceRange({ priceFrom: 0, priceTo: maxPrice });
  }, [maxPrice]);

  return (
    <ShopFiltersWrapper>
      <RangeInput
        max={maxPrice}
        label={'price from'}
        value={priceRange.priceFrom}
        onChange={e =>
          setPriceRange({
            ...priceRange,
            priceFrom: Math.min(parseInt(e.target.value), priceRange.priceTo)
          })
        }
      />
      <RangeInput
        max={maxPrice}
        label={'price to'}
        value={priceRange.priceTo}
        onChange={e =>
          setPriceRange({
            ...priceRange,
            priceTo: Math.max(parseInt(e.target.value), priceRange.priceFrom)
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
