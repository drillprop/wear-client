import React from 'react';
import { useMeQuery, UserRole } from '../../../../generated/types';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import { Li, Ul } from '../Header.styles';
import { LiWithDropdown } from './UserNav.styles';
import DropDownMenu from './userNav/DropDownMenu';

const UserNav: React.FC = () => {
  const { data } = useMeQuery();
  return (
    <Ul>
      <LiWithDropdown>
        <LinkAnchor href='/sign'>
          <img src='/user-icon.svg' alt='profile icon' />
          {data?.me ? data.me.email : 'login'}
        </LinkAnchor>
        {data?.me ? (
          <DropDownMenu admin={data.me.role !== UserRole.Customer} />
        ) : null}
      </LiWithDropdown>
      <Li>
        <LinkAnchor href='/cart'>
          <img src='/shoping-icon.svg' alt='shopping cart icon' /> cart
        </LinkAnchor>
      </Li>
    </Ul>
  );
};

export default UserNav;
