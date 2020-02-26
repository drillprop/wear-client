import React from 'react';
import { ItemsQuery } from '../../../../generated/types';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import {
  ProductCardImg,
  ProductCardName,
  ProductCardPrice,
  ProductCardWrapper
} from './ProductCard.styles';

interface Props {
  item: ItemsQuery['items']['select'][number];
}

const ProductCard: React.FC<Props> = ({ item }) => {
  return (
    item && (
      <>
        <ProductCardWrapper>
          <LinkAnchor
            href={{
              pathname: `/${item.gender.toLowerCase()}/item`,
              query: {
                category: item.category.toLowerCase(),
                id: item.id
              }
            }}
          >
            <ProductCardImg src={item.imageUrl} alt={item.name} />
            <ProductCardName>{item.name}</ProductCardName>
            <ProductCardPrice>${item.price}</ProductCardPrice>
          </LinkAnchor>
        </ProductCardWrapper>
      </>
    )
  );
};

export default ProductCard;
