import debounce from 'lodash.debounce';
import React, { useEffect, useState } from 'react';
import {
  Gender,
  ItemsQueryVariables,
  SortOrder
} from '../../../generated/types';
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

type SortType = 'newest' | 'lowest price' | 'highest price';

const ShopFilters: React.FC<Props> = ({ setFilters, filters, maxPrice }) => {
  const [priceRange, setPriceRange] = useState({
    priceFrom: 0,
    priceTo: 0
  });
  const [sortValue, setSortValue] = useState<SortType>('newest');

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

  const debounceSetFilters = debounce((filters: ItemsQueryVariables) => {
    setFilters({ ...filters });
  }, 300);

  const handleSort = (sort: SortType) => {
    if (sort === 'newest')
      setFilters({
        ...filters,
        sortBy: 'created_at',
        sortOrder: SortOrder.Desc
      });
    else if (sort === 'lowest price')
      setFilters({ ...filters, sortBy: 'price', sortOrder: SortOrder.Asc });
    else if (sort === 'highest price')
      setFilters({ ...filters, sortBy: 'price', sortOrder: SortOrder.Desc });

    setSortValue(sort);
  };
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
      <Select
        label='sort by'
        value={sortValue}
        placeHolder='name'
        options={['newest', 'lowest price', 'highest price']}
        onChange={handleSort}
        small
      />
    </ShopFiltersWrapper>
  );
};

export default ShopFilters;
