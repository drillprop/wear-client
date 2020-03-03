import React from 'react';
import { SingleItemQuery } from '../../../generated/types';
import { white } from '../../../styles/colors';
import CartIcon from '../../CartIcon/CartIcon';
import Select from '../../Select/Select';
import { EditButton } from '../SingleProductContainer.styles';
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
  setToEditState: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin?: boolean | null;
}

const SingleProduct: React.FC<Props> = ({ item, setToEditState, isAdmin }) => {
  const sizes =
    item?.sizes &&
    item.sizes
      .filter(size => size.quantity && size)
      .map(size => size.sizeSymbol);

  return item ? (
    <>
      <SingleProductMain>
        <SingleProductImg src={item?.imageUrl} alt={item?.name} />
        <SingleProductInfo>
          {isAdmin && (
            <EditButton onClick={() => setToEditState(true)}>Edit</EditButton>
          )}
          <SingleProductName>{item?.name}</SingleProductName>
          <SingleProductDescription>
            {item?.description}
          </SingleProductDescription>
          <SingleProductPrice>$ {item?.price}</SingleProductPrice>
          {sizes?.length ? (
            <>
              <Select
                label='Pick size'
                placeHolder='SIZE'
                onChange={() => null}
                options={sizes || []}
              />
              <AddToCart>
                <CartIcon color={white} size={'1em'} />
                add to cart
              </AddToCart>
            </>
          ) : (
            <Unavailable>product is not available at the moment</Unavailable>
          )}
        </SingleProductInfo>
      </SingleProductMain>
    </>
  ) : (
    <div>no such item</div>
  );
};

export default SingleProduct;
