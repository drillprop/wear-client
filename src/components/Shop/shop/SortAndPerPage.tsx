import { ApolloQueryResult } from 'apollo-boost';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ItemsQuery, ItemsQueryVariables } from '../../../generated/types';
import Select from '../../Select/Select';

type SortType = 'newest' | 'lowest price' | 'highest price';

interface Props {
  refetch: (
    variables?: ItemsQueryVariables | undefined
  ) => Promise<ApolloQueryResult<ItemsQuery>>;
  variables: ItemsQueryVariables;
  path: string;
  asPath: string;
}

const SortAndPerPage: React.FC<Props> = ({
  refetch,
  variables,
  path,
  asPath,
}) => {
  const [sortValue, setSortValue] = useState<SortType>('newest');

  const router = useRouter();

  const handleSort = (sort: SortType) => {
    if (sort === 'newest')
      refetch({
        ...variables,
        sortBy: 'Item.createdAt',
        sortOrder: 'DESC',
      });
    else if (sort === 'lowest price')
      refetch({
        ...variables,
        sortBy: 'Item.price',
        sortOrder: 'ASC',
      });
    else if (sort === 'highest price')
      refetch({
        ...variables,
        sortBy: 'Item.price',
        sortOrder: 'DESC',
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
        onChange={(take) => {
          if (variables.skip) {
            router.push(path, asPath);
          }
          take && refetch({ ...variables, take: parseInt(take) });
        }}
        value={(variables && variables.take) || 6}
        placeHolder='6'
        options={[6, 12, 18, 24, 30]}
        small
      />
    </>
  );
};

export default SortAndPerPage;
