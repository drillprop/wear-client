import React, { useEffect, useState } from 'react';
import {
  Category,
  Gender,
  useItemsQuery,
  SortOrder,
  ItemsQueryVariables,
  ItemsQuery
} from '../../generated/types';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import Pagination from '../Pagination/Pagination';
import ShopSideNav from '../ShopSideNav/ShopSideNav';
import ShopFilters from './shop/ShopFilters';
import debounce from 'lodash.debounce';
import Products from './shop/Products';

interface Props {
  gender: Gender;
  query: {
    category?: string;
    page?: string;
  };
}

const Shop: React.FC<Props> = ({ gender, query }) => {
  const category = query.category?.toUpperCase() as Category;

  const { data, refetch, loading, variables } = useItemsQuery({
    variables: {
      gender,
      sortBy: 'Item.createdAt',
      sortOrder: SortOrder.DESC,
      category
    }
  });

  const debouncedRefetch = debounce(
    (variables: ItemsQueryVariables) => refetch(variables),
    300
  );

  return (
    <SiteWrapper>
      <ShopSideNav gender={gender} />
      <div>
        <SiteSubtitle>shop</SiteSubtitle>
        <ShopFilters
          maxPrice={data?.items.maxPrice || 0}
          variables={variables}
          refetch={debouncedRefetch}
          gender={gender}
        />
        <Products items={data?.items.select || []} />
        {/* <Pagination
          page={(query.page && parseInt(query.page)) || 1}
          total={data?.items.count}
          take={variables.take || 5}
          setNewState={setState}
        /> */}
      </div>
    </SiteWrapper>
  );
};

export default Shop;
