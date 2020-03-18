import React from 'react';
import { useCart } from '../../../../contexts/CartContext';
import { useMeQuery, UserRole } from '../../../../generated/types';
import { black } from '../../../../styles/colors';
import CartIcon from '../../../CartIcon/CartIcon';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import { Li, Ul } from '../Header.styles';
import { LiWithDropdown } from './UserNav.styles';
import ProfileDropDown from './userNav/ProfileDropDown';

const UserNav: React.FC = () => {
  const { cartItems } = useCart();
  const cartItemsLength = cartItems.length;
  const products = cartItemsLength
    ? `${cartItemsLength} product${cartItemsLength > 1 ? 's' : ''} in `
    : '';
  return (
    <Ul>
      <LiWithDropdown>
        <ProfileDropDown />
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
