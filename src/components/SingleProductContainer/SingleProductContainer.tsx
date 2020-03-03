import React, { useState } from 'react';
import { SiteWrapper, SiteSubtitle } from '../../styles/site.styles';
import ShopSideNav from '../ShopSideNav/ShopSideNav';
import { SingleItemQuery, useMeQuery, UserRole } from '../../generated/types';
import SingleProduct from './singleProductContainer/SingleProduct';
import EditItemForm from './singleProductContainer/EditItemForm';

interface Props {
  item?: SingleItemQuery['item'];
}

const SingleProductContainer: React.FC<Props> = ({ item }) => {
  const [editState, setToEditState] = useState(false);
  const meQuery = useMeQuery();
  const isAdmin =
    meQuery.data?.me && meQuery.data.me.role !== UserRole.Customer;

  return item ? (
    <SiteWrapper>
      <ShopSideNav gender={item?.gender} />
      {editState ? (
        <EditItemForm item={item} setToEditState={setToEditState} />
      ) : (
        <SingleProduct
          item={item}
          setToEditState={setToEditState}
          isAdmin={isAdmin}
        />
      )}
    </SiteWrapper>
  ) : (
    <div>no such item</div>
  );
};

export default SingleProductContainer;
