import React from 'react';
import { Ul, Li } from '../Header.styles';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';

const ShopNav = () => {
  return (
    <Ul>
      <LinkAnchor href='/woman'>
        <Li>women</Li>
      </LinkAnchor>
      <LinkAnchor href='/man'>
        <Li>men</Li>
      </LinkAnchor>
    </Ul>
  );
};

export default ShopNav;
