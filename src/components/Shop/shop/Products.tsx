import React from 'react';
import { ItemsQuery } from '../../../generated/types';
import ProductCard from './products/ProductCard';
import { ProductsWrapper } from './Products.styles';

interface Props {
  items: ItemsQuery['items']['select'];
}

const ManyItems: React.FC<Props> = ({ items }) => {
  return (
    <ProductsWrapper>
      {items.map(item => item && <ProductCard item={item} key={item.id} />)}
    </ProductsWrapper>
  );
};

export default ManyItems;
