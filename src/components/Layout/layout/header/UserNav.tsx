import React from 'react';
import { useMeQuery } from '../../../../generated/types';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import { Li, Ul } from '../Header.styles';
import DropDownMenu from './userNav/DropDownMenu';
import { LiWithDropdown } from './UserNav.styles';

const UserNav = () => {
  const { data } = useMeQuery();
  return (
    <Ul>
      <LiWithDropdown>
        <LinkAnchor href='/sign'>
          <img src='/user-icon.svg' />
          {data?.me ? data.me.email : 'login'}
        </LinkAnchor>
        {data?.me ? <DropDownMenu /> : null}
      </LiWithDropdown>
      <Li>
        <LinkAnchor href='/checkout'>
          <img src='/shoping-icon.svg' /> cart
        </LinkAnchor>
      </Li>
    </Ul>
  );
};

export default UserNav;
