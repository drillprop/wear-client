import React from 'react';
import { ItemsQuery } from '../../../generated/types';
import LinkAnchor from '../../LinkAnchor/LinkAnchor';
import {
  ProductCardImg,
  ProductCardWrapper,
  ProductName,
  ProductNameAndPrice,
  ProductPrice,
  ProductsWrapper,
} from './Products.styles';

interface Props {
  items: ItemsQuery['items']['select'];
}

const Products: React.FC<Props> = ({ items }) => {
  return (
    <ProductsWrapper>
      {items.map(
        (item) =>
          item && (
            <ProductCardWrapper key={item.id}>
              <LinkAnchor
                href={{
                  pathname: `/shop/[...params]/item`,
                  query: {
                    id: item.id,
                  },
                }}
                as={`/shop/${item.gender.toLowerCase()}/${item.category.toLowerCase()}/item?id=${
                  item.id
                }`}
              >
                <ProductCardImg src={item.imageUrl} alt={item.name} />
                <ProductNameAndPrice>
                  <ProductName>{item.name}</ProductName>
                  <ProductPrice>${item.price}</ProductPrice>
                </ProductNameAndPrice>
              </LinkAnchor>
            </ProductCardWrapper>
          )
      )}
    </ProductsWrapper>
  );
};

export default Products;
