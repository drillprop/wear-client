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
  category?: Category | null;
  query: {
    category?: string;
    page?: string;
  };
}

const Shop: React.FC<Props> = ({ gender, category, query }) => {
  const [variables, setVariables] = useState<ItemsQueryVariables>({
    take: 5,
    skip: 0,
    gender,
    category,
    sortBy: 'Item.createdAt',
    sortOrder: SortOrder.DESC
  });

  const debouncedSetFilters = debounce(
    (variables: ItemsQueryVariables) => setVariables(variables),
    300
  );

  const { data } = useItemsQuery({
    variables: { ...variables }
  });

  useEffect(() => {
    setVariables({ ...variables, category });
  }, [category]);

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
