import React, { useEffect, useState } from 'react';
import {
  Category,
  Gender,
  useItemsQuery,
  SortOrder,
  ItemsQueryVariables
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
  const [variables, setVariables] = useState<ItemsQueryVariables>({
    take: 5,
    gender,
    sortBy: 'Item.createdAt',
    sortOrder: SortOrder.DESC
  });

  const { data } = useItemsQuery({
    variables
  });

  const debouncedSetFilters = debounce(
    (variables: ItemsQueryVariables) => setVariables(variables),
    300
  );

  useEffect(() => {
    const category = query.category?.toUpperCase() as Category;
    setVariables({
      ...variables,
      category,
      gender,
      skip: query.page
        ? parseInt(query.page) * (variables?.take || 5) - (variables?.take || 5)
        : 0
    });
  }, [query.category, query.page]);

  return (
    <SiteWrapper>
      <ShopSideNav gender={gender} />
      <div>
        <SiteSubtitle>shop</SiteSubtitle>
        <ShopFilters
          maxPrice={data?.items.maxPrice || 0}
          variables={variables}
          setVariables={debouncedSetFilters}
          gender={gender}
        />
        <Products items={data?.items.select || []} />
        <Pagination
          page={(query.page && parseInt(query.page)) || 1}
          total={data?.items.count}
          take={variables.take || 5}
          setNewState={setVariables}
        />
      </div>
    </SiteWrapper>
  );
};

export default Shop;
