import React from 'react';
import LinkAnchor from '../../LinkAnchor/LinkAnchor';
import Button from '../../Button/Button';
import { StyledEmptyCart } from './EmptyCart.styles';

const EmptyCart = () => {
  return (
    <StyledEmptyCart>
      <h1>Your Cart is empty</h1>
      <h3>Go back to homepage and pick something for yourself</h3>
      <LinkAnchor href='/'>
        <Button width='250px'>go to homepage</Button>
      </LinkAnchor>
    </StyledEmptyCart>
  );
};

export default EmptyCart;
