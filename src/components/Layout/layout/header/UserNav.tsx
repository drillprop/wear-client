import React from 'react';
import { useCart } from '../../../../contexts/CartContext';
import { useMeQuery, UserRole } from '../../../../generated/types';
import { black } from '../../../../styles/colors';
import CartIcon from '../../../CartIcon/CartIcon';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import { Li, Ul } from '../Header.styles';
import { LiWithDropdown } from './UserNav.styles';
import DropDownMenu from './userNav/DropDownMenu';

const UserNav: React.FC = () => {
  const { data } = useMeQuery();
  const { cartItems } = useCart();
  const cartItemsLength = cartItems.length;
  const products = cartItemsLength
    ? `${cartItemsLength} product${cartItemsLength > 1 ? 's' : ''} in `
    : '';
  return (
    <Ul>
      <LiWithDropdown>
        <LinkAnchor href='/sign'>
          <img src='/user-icon.svg' alt='profile icon' />
          {data?.me ? data.me.email : 'login'}
        </LinkAnchor>
        {data?.me ? (
          <DropDownMenu admin={data.me.role !== UserRole.CUSTOMER} />
        ) : null}
      </LiWithDropdown>
      <Li>
        <LinkAnchor href='/cart' queryHighlight={!!cartItemsLength}>
          <CartIcon fill={cartItemsLength ? black : 'none'} />
          {products}
          cart
        </LinkAnchor>
      </Li>
    </Ul>
  );
};

export default UserNav;
