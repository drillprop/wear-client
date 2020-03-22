import { ApolloQueryResult } from 'apollo-boost';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  ItemsQuery,
  ItemsQueryVariables,
  SortOrder
} from '../../../../generated/types';
import Select from '../../../Select/Select';

type SortType = 'newest' | 'lowest price' | 'highest price';

interface Props {
  refetch: (
    variables?: ItemsQueryVariables | undefined
  ) => Promise<ApolloQueryResult<ItemsQuery>>;
  variables: ItemsQueryVariables;
}

const SortAndPerPage: React.FC<Props> = ({ refetch, variables }) => {
  const router = useRouter();
  const [sortValue, setSortValue] = useState<SortType>('newest');
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
    <>
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
    </>
  );
};

export default SortAndPerPage;
