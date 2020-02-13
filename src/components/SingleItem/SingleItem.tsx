import React from 'react';
import {
  useMeQuery,
  UserRole,
  useSingleItemQuery
} from '../../generated/types';
import { SiteSubtitle, SiteWrapper } from '../../styles/site.styles';
import Select from '../Select/Select';
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
  query: {
    id: string;
  };
}

const SingleItem: React.FC<Props> = ({ query }) => {
  const meQuery = useMeQuery();
  const isAdmin =
    meQuery.data?.me && meQuery.data.me.role !== UserRole.Customer;
  const { data } = useSingleItemQuery({
    variables: {
      id: query.id
    }
  });
  return (
    <SiteWrapper>
      <nav />
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
            <AddToCart>add to cart</AddToCart>
          </SingleItemInfo>
        </SingleItemMain>
      </div>
    </SiteWrapper>
  );
};

export default SingleItem;
