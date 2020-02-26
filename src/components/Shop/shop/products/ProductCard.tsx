import React from 'react';
import { ItemsQuery } from '../../../../generated/types';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import {
  ProductCardImg,
  ProductCardWrapper,
  ProductName,
  ProductPrice,
  ProductNameAndPrice
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
            <ProductNameAndPrice>
              <ProductName>{item.name}</ProductName>
              <ProductPrice>${item.price}</ProductPrice>
            </ProductNameAndPrice>
          </LinkAnchor>
        </ProductCardWrapper>
      </>
    )
  );
};

export default ProductCard;
