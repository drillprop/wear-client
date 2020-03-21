import { NextPage } from 'next';
import React from 'react';
import Shop from '../../components/Shop/Shop';
import { Gender } from '../../generated/types';

interface Props {
  query: {
    category?: string;
    page?: string;
  };
}

const ShopPage: NextPage<Props> = ({ query }) => {
  return <Shop gender={Gender.WOMAN} query={query} />;
};

export default ShopPage;
