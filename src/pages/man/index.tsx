import { NextPage } from 'next';
import React from 'react';
import Shop from '../../components/Shop/Shop';
import { Gender, Category } from '../../generated/types';

interface Props {
  query: {
    category?: string;
    page?: string;
  };
}

const ShopPage: NextPage<Props> = ({ query }) => {
  return (
    <Shop
      gender={Gender.MAN}
      query={query}
      category={
        query.category ? (query.category.toUpperCase() as Category) : null
      }
    />
  );
};

export default ShopPage;
