import React from 'react';
import {
  useMeQuery,
  UserRole,
  useSingleItemQuery
} from '../../generated/types';
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
import Head from 'next/head';

interface Props {
  query: {
    id: string;
  };
  title?: string;
}

const SingleItem: React.FC<Props> = ({ query, title }) => {
  console.log(title);
  const meQuery = useMeQuery();
  const isAdmin =
    meQuery.data?.me && meQuery.data.me.role !== UserRole.Customer;
  const { data } = useSingleItemQuery({
    variables: {
      id: query.id
    }
  });
  const genderCategories =
    data?.item?.gender && getGenderCategories(data?.item?.gender);
  return (
    <>
      <SiteWrapper>
        <ShopSideNav title={data?.item?.gender} categories={genderCategories} />
        <div>
          <SiteSubtitle>{data?.item?.category}</SiteSubtitle>
          <SingleItemMain>
            <SingleItemImg src={data?.item?.imageUrl} alt={data?.item?.name} />
            <SingleItemInfo>
              {isAdmin && <SingleItemEdit>Edit</SingleItemEdit>}
              <SingleItemName>{data?.item?.name}</SingleItemName>
              <SingleItemDescription>
                {data?.item?.description}
              </SingleItemDescription>
              <SingleItemPrice>$ {data?.item?.price}</SingleItemPrice>
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
