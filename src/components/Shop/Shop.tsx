import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Category,
  Gender,
  ItemsQueryVariables,
  SortOrder,
  useItemsQuery,
} from '../../generated/types';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import Pagination from '../Pagination/Pagination';
import ShopSideNav from '../ShopSideNav/ShopSideNav';
import { ShopFiltersWrapper, ShopWrapper } from './Shop.styles';
import NameAndPriceFilters from './shop/NameAndPriceFilters';
import SortAndPerPage from './shop/SortAndPerPage';
import Products from './shop/Products';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface Props {
  query: {
    category: string;
    page: string;
    gender?: string;
  };
}

const Shop: React.FC<Props> = ({ query }) => {
  const category = query.category?.toUpperCase() as Category;
  const gender = query.gender?.toUpperCase() as Gender;
  const router = useRouter();
  const take = 6;

  const skip = parseInt(query.page) * take - take || 0;

  const { data, refetch, variables, loading } = useItemsQuery({
    variables: {
      gender,
      skip,
      sortBy: 'Item.createdAt',
      take,
      sortOrder: SortOrder.DESC,
      category,
    },
  });

  const path = category ? `/[gender]/[category]` : `/[gender]`;
  const asPath = category
    ? `/${query?.gender}/${query?.category}`
    : `/${query?.gender}`;

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
        <ShopWrapper>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Products items={data?.items.select || []} />
              <Pagination
                path={path}
                page={parseInt(query.page) || 1}
                total={data?.items.count}
                take={(variables && variables.take) || take}
                refetch={refetch}
              />
            </>
          )}
        </ShopWrapper>
      </div>
    </SiteWrapper>
  );
};

export default Shop;
