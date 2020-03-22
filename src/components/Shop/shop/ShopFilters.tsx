import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Gender,
  ItemsQueryVariables,
  SortOrder,
  ItemsQuery
} from '../../../generated/types';
import Select from '../../Select/Select';
import { ShopFiltersWrapper } from './ShopFilters.styles';
import NameAndPriceFilters from './shopFilters/NameAndPriceFilters';
import { ApolloQueryResult } from 'apollo-boost';

interface Props {
  refetch: (
    variables?: ItemsQueryVariables | undefined
  ) => Promise<ApolloQueryResult<ItemsQuery>>;
  variables: ItemsQueryVariables;
  gender: Gender;
  maxPrice: number;
}

type SortType = 'newest' | 'lowest price' | 'highest price';

const ShopFilters: React.FC<Props> = ({ variables, maxPrice, refetch }) => {
  const router = useRouter();
  const [sortValue, setSortValue] = useState<SortType>('newest');

  const debouncedRefetch = debounce(
    (variables: ItemsQueryVariables) => refetch(variables),
    300
  );

  const handleSort = (sort: SortType) => {
    if (sort === 'newest')
      refetch({
        ...variables,
        sortBy: 'Item.createdAt',
        sortOrder: SortOrder.DESC
      });
    else if (sort === 'lowest price')
      refetch({
        ...variables,
        sortBy: 'Item.price',
        sortOrder: SortOrder.ASC
      });
    else if (sort === 'highest price')
      refetch({
        ...variables,
        sortBy: 'Item.price',
        sortOrder: SortOrder.DESC
      });
    setSortValue(sort);
  };
  return (
    <ShopFiltersWrapper>
      <NameAndPriceFilters
        maxPrice={maxPrice}
        variables={variables}
        refetch={debouncedRefetch}
      />
      <Select
        label='sort by'
        value={sortValue}
        placeHolder='name'
        options={['newest', 'lowest price', 'highest price']}
        onChange={handleSort}
        small
      />
      <Select
        label='items per page'
        onChange={take => {
          take && refetch({ ...variables, take: parseInt(take) });
          router.push(
            `/${variables.gender?.toLowerCase()}${
              variables?.category
                ? `?category=${variables?.category.toLowerCase()}`
                : ''
            }`
          );
        }}
        value={variables.take}
        placeHolder='5'
        options={[5, 10, 15, 20, 25]}
        small
      />
    </ShopFiltersWrapper>
  );
};

export default ShopFilters;
