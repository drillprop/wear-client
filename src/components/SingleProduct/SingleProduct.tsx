import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { SingleItemQuery } from '../../generated/types';
import { white } from '../../styles/colors';
import { SiteWrapper } from '../../styles/site.styles';
import CartIcon from '../CartIcon/CartIcon';
import Select from '../Select/Select';
import ShopSideNav from '../ShopSideNav/ShopSideNav';
import {
  AddToCart,
  SingleProductDescription,
  SingleProductImg,
  SingleProductMain,
  SingleProductName,
  SingleProductPrice,
  Unavailable,
} from './SingleProduct.styles';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { SizesArr } from '../../utils/constants';

interface Props {
  item?: SingleItemQuery['item'];
  loading?: boolean;
}

const SingleProduct: React.FC<Props> = ({ item, loading }) => {
  const [size, setSize] = useState<keyof typeof SizesArr | ''>('');
  const [alert, setAlert] = useState('');

  const sizes =
    item?.sizes &&
    item.sizes
      .filter((size) => size.quantity && size)
      .map((size) => size.sizeSymbol);

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
  return (
    <SiteWrapper>
      {item ? <ShopSideNav gender={item.gender.toUpperCase()} /> : <div />}
      <SingleProductMain>
        {item && !loading ? (
          <>
            <SingleProductImg src={item?.imageUrl} alt={item?.name} />
            <section>
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
                    onChange={(size) => setSize(size)}
                    value={size}
                    options={sizes}
                  />
                  <AddToCart disabled={!!!size} type='submit'>
                    <CartIcon color={white} size={'1em'} />
                    {alert ? alert : 'add to cart'}
                  </AddToCart>
                </form>
              ) : (
                <Unavailable>
                  product is not available at the moment
                </Unavailable>
              )}
            </section>
          </>
        ) : (
          <div style={{ display: 'grid', gridColumn: '1/3' }}>
            <LoadingSpinner />
          </div>
        )}
        {!item && !loading && <div>No such item</div>}
      </SingleProductMain>
    </SiteWrapper>
  );
};

export default SingleProduct;
