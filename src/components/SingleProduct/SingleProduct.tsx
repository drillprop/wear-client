import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { SingleItemQuery, SizeSymbol } from '../../generated/types';
import { white } from '../../styles/colors';
import { SiteWrapper } from '../../styles/site.styles';
import CartIcon from '../CartIcon/CartIcon';
import Select from '../Select/Select';
import ShopSideNav from '../ShopSideNav/ShopSideNav';
import {
  AddToCart,
  SingleProductDescription,
  SingleProductImg,
  SingleProductInfo,
  SingleProductMain,
  SingleProductName,
  SingleProductPrice,
  Unavailable
} from './SingleProduct.styles';
interface Props {
  item?: SingleItemQuery['item'];
}

const SingleProduct: React.FC<Props> = ({ item }) => {
  const [size, setSize] = useState<keyof typeof SizeSymbol | ''>('');
  const [alert, setAlert] = useState('');

  const sizes =
    item?.sizes &&
    item.sizes
      .filter(size => size.quantity && size)
      .map(size => size.sizeSymbol);

  const { addItemToCart, toggleCartVisible } = useCart();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (alert) {
      timeout = setTimeout(() => {
        setAlert('');
        toggleCartVisible(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [alert]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (item) {
      const { id, name, price, imageUrl } = item;
      const newItem = { id, size, name, price, imageUrl, quantity: 1 };
      setAlert('product added to your cart');
      toggleCartVisible(true);
      addItemToCart(newItem);
      setSize('');
    }
  };
  return item ? (
    <SiteWrapper>
      <ShopSideNav gender={item?.gender} />
      <SingleProductMain>
        <SingleProductImg src={item?.imageUrl} alt={item?.name} />
        <SingleProductInfo>
          <SingleProductName>{item?.name}</SingleProductName>
          <SingleProductDescription>
            {item?.description}
          </SingleProductDescription>
          <SingleProductPrice>$ {item?.price}</SingleProductPrice>
          {sizes?.length ? (
            <form onSubmit={handleSubmit}>
              <Select
                marginTop={'100px'}
                label='Pick size'
                placeHolder='SIZE'
                onChange={size => setSize(size)}
                value={size}
                options={sizes}
              />
              <AddToCart disabled={!!!size} type='submit'>
                <CartIcon color={white} size={'1em'} />
                {alert ? alert : 'add to cart'}
              </AddToCart>
            </form>
          ) : (
            <Unavailable>product is not available at the moment</Unavailable>
          )}
        </SingleProductInfo>
      </SingleProductMain>
    </SiteWrapper>
  ) : (
    <div>no such item</div>
  );
};

export default SingleProduct;
