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
  };
}

const Shop: React.FC<Props> = ({ gender, query }) => {
  const category = query.category?.toUpperCase() as Category;
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

  const defaultRoute = `/${gender.toLowerCase()}${
    variables?.category ? `?category=${variables?.category.toLowerCase()}` : ''
  }`;

  const debouncedRefetch = debounce((variables: ItemsQueryVariables) => {
    if (variables.skip) {
      router.push(defaultRoute);
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
            defaultRoute={defaultRoute}
          />
        </ShopFiltersWrapper>
        <Products items={data?.items.select || []} />
        <Pagination
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
