import React, { useEffect, useState } from 'react';
import { Category, Gender, useItemsQuery } from '../../generated/types';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import Pagination from '../Pagination/Pagination';
import ShopSideNav from '../ShopSideNav/ShopSideNav';
import ShopFilters from './shop/ShopFilters';

interface Props {
  gender: Gender;
  category?: Category | null;
}

const Shop: React.FC<Props> = ({ gender, category }) => {
  const [filters, setFilters] = useState({
    take: 5,
    skip: 0,
    whereGender: gender,
    whereCategory: category
  });
  const { take, skip } = filters;

  const { data } = useItemsQuery({
    variables: { ...filters }
  });

  useEffect(() => {
    setFilters({ ...filters, whereCategory: category });
  }, [category]);

  return (
    <SiteWrapper>
      <ShopSideNav gender={gender} />
      <div>
        <SiteSubtitle>shop</SiteSubtitle>
        <ShopFilters
          filters={filters}
          setFilters={setFilters}
          gender={gender}
        />
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <Pagination
          total={data?.items.count}
          take={take}
          skip={skip}
          setNewState={setFilters}
          state={filters}
        />
      </div>
    </SiteWrapper>
  );
};

export default Shop;
