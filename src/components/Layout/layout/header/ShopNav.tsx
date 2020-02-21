import React from 'react';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import { Li, Ul } from '../Header.styles';

const ShopNav = () => {
  return (
    <Ul>
      <Li>
        <LinkAnchor href='/woman' as='/woman'>
          women
        </LinkAnchor>
      </Li>
      <Li>
        <LinkAnchor href='/man' as='/man'>
          men
        </LinkAnchor>
      </Li>
    </Ul>
  );
};

export default ShopNav;
