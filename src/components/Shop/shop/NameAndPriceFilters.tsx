import React, { useEffect, useState } from 'react';
import { ItemsQueryVariables } from '../../../generated/types';
import Input from '../../Input/Input';
import RangeInput from '../../RangeInput/RangeInput';

interface Props {
  refetch: any;
  variables: ItemsQueryVariables;
  maxPrice: number;
}

const NameAndPriceFilters: React.FC<Props> = ({
  refetch,
  variables,
  maxPrice
}) => {
  const [filtersState, setFiltersState] = useState({
    priceFrom: 0,
    priceTo: 0,
    name: ''
  });

  useEffect(() => {
    setFiltersState({ ...filtersState, priceTo: maxPrice });
  }, [maxPrice]);

  return (
    <>
      <RangeInput
        max={maxPrice}
        label={'price from'}
        value={filtersState.priceFrom}
        onChange={e => {
          setFiltersState({
            ...filtersState,
            priceFrom: Math.min(parseInt(e.target.value), filtersState.priceTo)
          });
          refetch({
            ...variables,
            priceFrom: Math.min(parseInt(e.target.value), filtersState.priceTo)
          });
        }}
      />
      <RangeInput
        max={maxPrice}
        label={'price to'}
        value={filtersState.priceTo}
        onChange={e => {
          setFiltersState({
            ...filtersState,
            priceTo: Math.max(parseInt(e.target.value), filtersState.priceFrom)
          });
          refetch({
            ...variables,
            priceTo: Math.max(parseInt(e.target.value), filtersState.priceFrom)
          });
        }}
      />
      <Input
        label='search item by name'
        name='name'
        value={filtersState.name}
        onChange={e => {
          setFiltersState({
            ...filtersState,
            name: e.target.value
          });
          refetch({
            ...variables,
            name: e.target.value
          });
        }}
        placeholder='search'
        type='search'
        icon='/search-icon.svg'
        small
      />
    </>
  );
};

export default NameAndPriceFilters;
