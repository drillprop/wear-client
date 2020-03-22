import React from 'react';
import {
  Category,
  Gender,
  SortOrder,
  useItemsQuery
} from '../../generated/types';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import Pagination from '../Pagination/Pagination';
import ShopSideNav from '../ShopSideNav/ShopSideNav';
import Products from './shop/Products';
import ShopFilters from './shop/ShopFilters';

interface Props {
  gender: Gender;
  query: {
    category?: string;
    page?: string;
  };
}

const Shop: React.FC<Props> = ({ gender, query }) => {
  const category = query.category?.toUpperCase() as Category;

  const { data, refetch, variables } = useItemsQuery({
    variables: {
      gender,
      sortBy: 'Item.createdAt',
      sortOrder: SortOrder.DESC,
      category
    }
  });

  return (
    <SiteWrapper>
      <ShopSideNav gender={gender} />
      <div>
        <SiteSubtitle>shop</SiteSubtitle>
        <ShopFilters
          maxPrice={data?.items.maxPrice || 0}
          variables={variables}
          refetch={refetch}
          gender={gender}
        />
        <Products items={data?.items.select || []} />
        <Pagination
          page={(query.page && parseInt(query.page)) || 1}
          total={data?.items.count}
          take={variables.take || 5}
          refetch={refetch}
        />
      </div>
    </SiteWrapper>
  );
};

export default Shop;
