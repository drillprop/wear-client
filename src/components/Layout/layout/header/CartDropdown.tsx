import Link from 'next/link';
import React from 'react';
import { useCart } from '../../../../contexts/CartContext';
import { black } from '../../../../styles/colors';
import CartIcon from '../../../CartIcon/CartIcon';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import {
  CartDropdownButton,
  CartDropdownItem,
  CartDropdownList,
  CartDropDownWrapper,
  CartDropdownItemImg,
  CartDropdownItemInfo,
  CartDropdownItemName,
  CartDropdownItemSize,
  CartDropdownItemPrice,
  CartDropdownItemsMore,
  CartDropdownTotalPrice,
} from './CartDropdown.styles';
import { Li } from '../Header.styles';

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
      <LinkAnchor href='/cart' wordToHighlight='cart'>
        <CartIcon fill={cartItemsLength ? black : 'none'} />
        {products}
        cart
      </LinkAnchor>
      {cartVisible && !!cartItemsLength && (
        <CartDropDownWrapper>
          <CartDropdownList>
            {cartItems
              .map((item) => (
                <CartDropdownItem key={item.id + 'size:' + item.size}>
                  <CartDropdownItemImg
                    src={item.imageUrl}
                    alt='product image'
                  />
                  <CartDropdownItemInfo>
                    <CartDropdownItemName>{item.name}</CartDropdownItemName>
                    <CartDropdownItemSize>
                      size: {item.size}
                    </CartDropdownItemSize>
                    <CartDropdownItemPrice>
                      price: {item.quantity} x ${item.price}
                    </CartDropdownItemPrice>
                  </CartDropdownItemInfo>
                </CartDropdownItem>
              ))
              .slice(0, 2)}
          </CartDropdownList>
          {cartItemsLength > 2 && (
            <CartDropdownItemsMore>{`and ${cartItemsLength -
              2} more`}</CartDropdownItemsMore>
          )}
          <CartDropdownTotalPrice>
            <div>total:</div>
            <div>${totals.totalPrice}</div>
          </CartDropdownTotalPrice>
          <Link href='/cart'>
            <CartDropdownButton>go to cart</CartDropdownButton>
          </Link>
        </CartDropDownWrapper>
      )}
    </Li>
  );
};

export default CartDropdown;
