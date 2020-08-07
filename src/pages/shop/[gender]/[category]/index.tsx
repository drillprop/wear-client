import { useRouter } from 'next/router';
import React from 'react';
import Shop from '../../../../components/Shop/Shop';

const ShopPage = () => {
  const { query } = useRouter();
  return <Shop query={query} />;
};

export default ShopPage;
