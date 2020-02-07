import { NextPage } from 'next';
import React from 'react';
import Items from '../../components/Items/Items';
import ItemsProvider from '../../contexts/Items.context';

const ItemsPage: NextPage = () => {
  return (
    <ItemsProvider>
      <Items />;
    </ItemsProvider>
  );
};

export default ItemsPage;
