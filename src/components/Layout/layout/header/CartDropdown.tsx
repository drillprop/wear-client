import React from 'react';
import { useCart } from '../../../../contexts/CartContext';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import CartIcon from '../../../CartIcon/CartIcon';
import { black } from '../../../../styles/colors';
import { Li } from '../Header.styles';

const CartDropdown = () => {
  const { cartItems } = useCart();
  const cartItemsLength = cartItems.length;
  const products = cartItemsLength
    ? `${cartItemsLength} product${cartItemsLength > 1 ? 's' : ''} in `
    : '';
  return (
    <Li>
      <LinkAnchor href='/cart' queryHighlight={!!cartItemsLength}>
        <CartIcon fill={cartItemsLength ? black : 'none'} />
        {products}
        cart
      </LinkAnchor>
    </Li>
  );
};

export default CartDropdown;
