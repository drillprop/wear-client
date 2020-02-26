import React from 'react';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import { Li, Ul } from '../Header.styles';

const ShopNav = () => {
  return (
    <Ul>
      <Li>
        <LinkAnchor highlight href='/woman'>
          woman
        </LinkAnchor>
      </Li>
      <Li>
        <LinkAnchor highlight href='/man'>
          man
        </LinkAnchor>
      </Li>
    </Ul>
  );
};

export default ShopNav;
