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
  setVariables: any;
  variables: ItemsQueryVariables;
  gender: Gender;
  maxPrice: number;
}

type SortType = 'newest' | 'lowest price' | 'highest price';

const ShopFilters: React.FC<Props> = ({
  setVariables,
  variables,
  maxPrice
}) => {
  const [filtersState, setFiltersState] = useState({
    priceFrom: 0,
    priceTo: 0,
    name: ''
  });
  const [sortValue, setSortValue] = useState<SortType>('newest');

  useEffect(() => {
    setVariables({
      ...variables,
      ...filtersState
    });
    return () => setVariables.cancel();
  }, [filtersState]);

  useEffect(() => {
    setFiltersState({ ...filtersState, priceTo: maxPrice });
  }, [maxPrice]);

  const handleSort = (sort: SortType) => {
    if (sort === 'newest')
      setVariables({
        ...variables,
        sortBy: 'created_at',
        sortOrder: SortOrder.Desc
      });
    else if (sort === 'lowest price')
      setVariables({ ...variables, sortBy: 'price', sortOrder: SortOrder.Asc });
    else if (sort === 'highest price')
      setVariables({
        ...variables,
        sortBy: 'price',
        sortOrder: SortOrder.Desc
      });
    setSortValue(sort);
  };
  return (
    <ShopFiltersWrapper>
      <RangeInput
        max={maxPrice}
        label={'price from'}
        value={filtersState.priceFrom}
        onChange={e =>
          setFiltersState({
            ...filtersState,
            priceFrom: Math.min(parseInt(e.target.value), filtersState.priceTo)
          })
        }
      />
      <RangeInput
        max={maxPrice}
        label={'price to'}
        value={filtersState.priceTo}
        onChange={e =>
          setFiltersState({
            ...filtersState,
            priceTo: Math.max(parseInt(e.target.value), filtersState.priceFrom)
          })
        }
      />
      <Input
        label='search item by name'
        name='name'
        value={filtersState.name}
        onChange={e =>
          setFiltersState({
            ...filtersState,
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
          take && setVariables({ ...variables, take: parseInt(take) })
        }
        value={variables.take}
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
