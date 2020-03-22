import { ApolloQueryResult } from 'apollo-boost';
import debounce from 'lodash.debounce';
import React from 'react';
import {
  Gender,
  ItemsQuery,
  ItemsQueryVariables
} from '../../../generated/types';
import { ShopFiltersWrapper } from './ShopFilters.styles';
import NameAndPriceFilters from './shopFilters/NameAndPriceFilters';
import SortAndPerPage from './shopFilters/SortAndPerPage';

interface Props {
  refetch: (
    variables?: ItemsQueryVariables | undefined
  ) => Promise<ApolloQueryResult<ItemsQuery>>;
  variables: ItemsQueryVariables;
  gender: Gender;
  maxPrice: number;
}

const ShopFilters: React.FC<Props> = ({ variables, maxPrice, refetch }) => {
  const debouncedRefetch = debounce(
    (variables: ItemsQueryVariables) => refetch(variables),
    300
  );

  return (
    <ShopFiltersWrapper>
      <NameAndPriceFilters
        maxPrice={maxPrice}
        variables={variables}
        refetch={debouncedRefetch}
      />
      <SortAndPerPage refetch={refetch} variables={variables} />
    </ShopFiltersWrapper>
  );
};

export default ShopFilters;
