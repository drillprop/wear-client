import React from 'react';
import { Ul, Li } from '../Header.styles';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';

const ShopNav = () => {
  return (
    <Ul>
      <Li>
        <LinkAnchor href='/woman'>women</LinkAnchor>
      </Li>
      <Li>
        <LinkAnchor href='/man'>men</LinkAnchor>
      </Li>
    </Ul>
  );
};

export default ShopNav;
