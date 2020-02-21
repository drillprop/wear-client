import React from 'react';
import { SingleItemQuery, useMeQuery, UserRole } from '../../generated/types';
import { white } from '../../styles/colors';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import getGenderCategories from '../../utils/getGenderCategories';
import CartIcon from '../CartIcon/CartIcon';
import Select from '../Select/Select';
import ShopSideNav from '../ShopSideNav/ShopSideNav';
import {
  AddToCart,
  SingleItemDescription,
  SingleItemEdit,
  SingleItemImg,
  SingleItemInfo,
  SingleItemMain,
  SingleItemName,
  SingleItemPrice
} from './SingleItem.styles';

interface Props {
  title?: string;
  item?: SingleItemQuery['item'];
}

const SingleItem: React.FC<Props> = ({ title, item }) => {
  const meQuery = useMeQuery();
  const isAdmin =
    meQuery.data?.me && meQuery.data.me.role !== UserRole.Customer;

  const genderCategories = item?.gender && getGenderCategories(item?.gender);
  return (
    <>
      <SiteWrapper>
        <ShopSideNav title={item?.gender} categories={genderCategories} />
        <div>
          <SiteSubtitle>{item?.category}</SiteSubtitle>
          <SingleItemMain>
            <SingleItemImg src={item?.imageUrl} alt={item?.name} />
            <SingleItemInfo>
              {isAdmin && <SingleItemEdit>Edit</SingleItemEdit>}
              <SingleItemName>{item?.name}</SingleItemName>
              <SingleItemDescription>{item?.description}</SingleItemDescription>
              <SingleItemPrice>$ {item?.price}</SingleItemPrice>
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
            </SingleItemInfo>
          </SingleItemMain>
        </div>
      </SiteWrapper>
    </>
  );
};

export default SingleItem;
