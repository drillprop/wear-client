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
  CartItemColumn
} from './CartItem.styles';

interface Props {
  item: ICartItem;
}

const CartItem: React.FC<Props> = ({ item }) => {
  return (
    <StyledCartItem>
      <CartItemImg src={item.imageUrl} alt={item.name} />
      <CartItemInfo>
        <CartItemColumn>
          <div>
            <CartItemName>{item.name}</CartItemName>
            <CartItemSize>size: {item.size}</CartItemSize>
          </div>
          <CartItemAmount>
            amount: <Arrow>&#10094;</Arrow> {item.quantity}{' '}
            <Arrow>&#10095;</Arrow>
          </CartItemAmount>
        </CartItemColumn>
        <CartItemColumn>
          <CartItemDelete>&#10005;</CartItemDelete>
          <CartItemPrice> $ {item.price * item.quantity}</CartItemPrice>
        </CartItemColumn>
      </CartItemInfo>
    </StyledCartItem>
  );
};

export default CartItem;
