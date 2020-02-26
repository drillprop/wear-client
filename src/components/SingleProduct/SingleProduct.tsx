import React from 'react';
import { SingleItemQuery, useMeQuery, UserRole } from '../../generated/types';
import { white } from '../../styles/colors';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import CartIcon from '../CartIcon/CartIcon';
import Select from '../Select/Select';
import ShopSideNav from '../ShopSideNav/ShopSideNav';
import {
  AddToCart,
  SingleProductDescription,
  SingleProductEdit,
  SingleProductImg,
  SingleProductInfo,
  SingleProductMain,
  SingleProductName,
  SingleProductPrice
} from './SingleProduct.styles';

interface Props {
  title?: string;
  item?: SingleItemQuery['item'];
}

const SingleProduct: React.FC<Props> = ({ title, item }) => {
  const meQuery = useMeQuery();
  const isAdmin =
    meQuery.data?.me && meQuery.data.me.role !== UserRole.Customer;

  return item ? (
    <SiteWrapper>
      <ShopSideNav gender={item?.gender} />
      <div>
        <SiteSubtitle>{item?.category}</SiteSubtitle>
        <SingleProductMain>
          <SingleProductImg src={item?.imageUrl} alt={item?.name} />
          <SingleProductInfo>
            {isAdmin && <SingleProductEdit>Edit</SingleProductEdit>}
            <SingleProductName>{item?.name}</SingleProductName>
            <SingleProductDescription>
              {item?.description}
            </SingleProductDescription>
            <SingleProductPrice>$ {item?.price}</SingleProductPrice>
            <Select
              label='Pick size'
              placeHolder='SIZE'
              onChange={() => null}
              options={['S', 'M', 'L', 'XL', 'XXL']}
            />
            <AddToCart>
              <CartIcon color={white} size={'1em'} />
              add to cart
            </AddToCart>
          </SingleProductInfo>
        </SingleProductMain>
      </div>
    </SiteWrapper>
  ) : (
    <div>no such item</div>
  );
};

export default SingleProduct;
