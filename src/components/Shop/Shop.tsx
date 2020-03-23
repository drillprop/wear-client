import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Category,
  Gender,
  ItemsQueryVariables,
  SortOrder,
  useItemsQuery
} from '../../generated/types';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import Pagination from '../Pagination/Pagination';
import ShopSideNav from '../ShopSideNav/ShopSideNav';
import { ShopFiltersWrapper } from './Shop.styles';
import NameAndPriceFilters from './shop/NameAndPriceFilters';
import Products from './shop/Products';
import SortAndPerPage from './shop/SortAndPerPage';

interface Props {
  gender: Gender;
  query: {
    category?: string;
    page?: string;
    gender?: string;
  };
}

const Shop: React.FC<Props> = ({ query }) => {
  const category = query.category?.toUpperCase() as Category;
  const gender = query.gender?.toUpperCase() as Gender;
  const router = useRouter();

  const { data, refetch, variables } = useItemsQuery({
    variables: {
      gender,
      sortBy: 'Item.createdAt',
      take: 5,
      sortOrder: SortOrder.DESC,
      category
    }
  });

  const path = category ? `/shop/[gender]/[category]` : `/shop/[gender]`;
  const asPath = category
    ? `/shop/${query?.gender}/${query?.category}`
    : `/shop/${query?.gender}`;

  const debouncedRefetch = debounce((variables: ItemsQueryVariables) => {
    if (variables.skip) {
      router.push(path, asPath);
    }
    refetch(variables);
  }, 400);

  return (
    <SiteWrapper>
      <ShopSideNav gender={gender} />
      <div>
        <SiteSubtitle>shop</SiteSubtitle>
        <ShopFiltersWrapper>
          <NameAndPriceFilters
            maxPrice={data?.items.maxPrice || 0}
            refetch={debouncedRefetch}
            variables={variables}
          />
          <SortAndPerPage
            refetch={refetch}
            variables={variables}
            path={path}
            asPath={asPath}
          />
        </ShopFiltersWrapper>
        <Products items={data?.items.select || []} />
        <Pagination
          path={path}
          page={(query.page && parseInt(query.page)) || 1}
          total={data?.items.count}
          take={(variables && variables.take) || 5}
          refetch={refetch}
        />
      </div>
    </SiteWrapper>
  );
};

export default Shop;
