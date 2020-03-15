import { NextPage } from 'next';
import React from 'react';
import Items from '../../components/Items/Items';

interface Props {
  query: {
    page?: string;
  };
}

const ItemsPage: NextPage<Props> = ({ query }) => {
  return <Items query={query} />;
};

export default ItemsPage;
