import { NextPage } from 'next';
import React from 'react';
import Shop from '../../../../components/Shop/Shop';

interface Props {
  query: {
    category: string;
    page: string;
  };
}

const ShopPage: NextPage<Props> = ({ query }) => {
  return <Shop query={query} />;
};

export default ShopPage;
