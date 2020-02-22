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
    variables: {
      ...filters
    }
  });

  useEffect(() => {
    setFilters({
      ...filters,
      whereCategory: category
    });
  }, [category]);

  const count = data?.items.count || 0;

  useEffect(() => {
    setFilters({
      ...filters,
      skip: take >= count ? Math.max(0, count - take) : skip
    });
  }, [take, count]);

  const changePage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { textContent } = e.currentTarget;

    if (textContent === '>') {
      setFilters({
        ...filters,
        skip: count > skip + take ? skip + take : skip
      });
    }
    if (textContent === '<') {
      setFilters({
        ...filters,
        skip: Math.max(0, skip - take)
      });
    }
  };

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
          changePage={changePage}
        />
      </div>
    </SiteWrapper>
  );
};

export default Shop;
