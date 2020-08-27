import React from 'react';
import { ICartItem, useCart } from '../../../contexts/CartContext';
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
  CartItemRow,
} from './CartItem.styles';

interface Props {
  item: ICartItem;
}

const CartItem: React.FC<Props> = ({ item }) => {
  const { incItemInCart, decrItemInCart, removeItemFromCart } = useCart();
  return (
    <StyledCartItem>
      <CartItemImg src={item.imageUrl} alt={item.name} />
      <CartItemInfo>
        <CartItemRow>
          <div>
            <CartItemName>{item.name}</CartItemName>
            <CartItemSize>size: {item.size}</CartItemSize>
          </div>
          <CartItemDelete
            data-testid='remove'
            onClick={() => removeItemFromCart(item)}
          >
            &#10005;
          </CartItemDelete>
        </CartItemRow>
        <CartItemRow>
          <CartItemAmount>
            amount:{' '}
            <Arrow data-testid='decrease' onClick={() => decrItemInCart(item)}>
              &#10094;
            </Arrow>{' '}
            {item.quantity}{' '}
            <Arrow data-testid='increase' onClick={() => incItemInCart(item)}>
              &#10095;
            </Arrow>
          </CartItemAmount>
          <CartItemPrice data-testid='item-price'>
            {' '}
            $ {item.price * item.quantity}
          </CartItemPrice>
        </CartItemRow>
      </CartItemInfo>
    </StyledCartItem>
  );
};

export default CartItem;
