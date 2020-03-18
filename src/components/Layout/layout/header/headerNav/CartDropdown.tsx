import Link from 'next/link';
import React from 'react';
import { useCart } from '../../../../../contexts/CartContext';
import { black } from '../../../../../styles/colors';
import CartIcon from '../../../../CartIcon/CartIcon';
import LinkAnchor from '../../../../LinkAnchor/LinkAnchor';
import { Li } from '../HeaderNav.styles';
import {
  CartDropdownButton,
  CartDropdownItem,
  CartDropdownList,
  CartDropDownWrapper,
  CartItemImg,
  CartItemInfo,
  CartItemName,
  CartItemPrice,
  CartItemSize,
  CartItemsMore,
  TotalPrice
} from './CartDropdown.styles';

const CartDropdown = () => {
  const { cartItems, cartVisible, toggleCartVisible, totals } = useCart();
  const cartItemsLength = cartItems.length;
  const products = totals.total
    ? `${totals.total} product${totals.total > 1 ? 's' : ''} in `
    : '';
  return (
    <Li
      onMouseEnter={() => toggleCartVisible(true)}
      onMouseLeave={() => toggleCartVisible(false)}
    >
      <LinkAnchor href='/cart' queryHighlight={!!cartItemsLength}>
        <CartIcon fill={cartItemsLength ? black : 'none'} />
        {products}
        cart
      </LinkAnchor>
      {cartVisible && !!cartItemsLength && (
        <CartDropDownWrapper>
          <CartDropdownList>
            {cartItems
              .map(item => (
                <CartDropdownItem key={item.id + 'size:' + item.size}>
                  <CartItemImg src={item.imageUrl} alt='product image' />
                  <CartItemInfo>
                    <CartItemName>{item.name}</CartItemName>
                    <CartItemSize>size: {item.size}</CartItemSize>
                    <CartItemPrice>
                      price: {item.quantity} x ${item.price}
                    </CartItemPrice>
                  </CartItemInfo>
                </CartDropdownItem>
              ))
              .slice(0, 3)}
          </CartDropdownList>
          {cartItemsLength > 3 && (
            <CartItemsMore>{`and ${cartItemsLength - 3} more`}</CartItemsMore>
          )}
          <TotalPrice>
            <div>total</div>
            <div>${totals.totalPrice}</div>
          </TotalPrice>
          <Link href='/cart'>
            <CartDropdownButton>go to cart</CartDropdownButton>
          </Link>
        </CartDropDownWrapper>
      )}
    </Li>
  );
};

export default CartDropdown;
