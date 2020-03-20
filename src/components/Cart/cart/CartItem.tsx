import React from 'react';
import { ICartItem } from '../../../contexts/CartContext';
import {
  Arrow,
  CartItemAmount,
  CartItemDelete,
  CartItemImg,
  CartItemInfo,
  CartItemName,
  CartItemPrice,
  CartItemSize,
  StyledCartItem,
  CartItemRow
} from './CartItem.styles';

interface Props {
  item: ICartItem;
}

const CartItem: React.FC<Props> = ({ item }) => {
  return (
    <StyledCartItem>
      <CartItemImg src={item.imageUrl} alt={item.name} />
      <CartItemInfo>
        <CartItemRow>
          <div>
            <CartItemName>{item.name}</CartItemName>
            <CartItemSize>size: {item.size}</CartItemSize>
          </div>
          <CartItemDelete>&#10005;</CartItemDelete>
        </CartItemRow>
        <CartItemRow>
          <CartItemAmount>
            amount: <Arrow>&#10094;</Arrow> {item.quantity}{' '}
            <Arrow>&#10095;</Arrow>
          </CartItemAmount>
          <CartItemPrice> $ {item.price * item.quantity}</CartItemPrice>
        </CartItemRow>
      </CartItemInfo>
    </StyledCartItem>
  );
};

export default CartItem;
