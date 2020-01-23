import React from 'react';
import LinkAnchor from '../LinkAnchor/LinkAnchor';
import {
  UserCard,
  UserCardPar,
  UserNav,
  UserNavItem,
  UserNavList,
  UserMainTitle
} from './UserSideNav.styles';

interface Props {
  email?: string;
}

const UserSideNav: React.FC<Props> = ({ email }) => {
  return (
    <UserNav>
      <UserMainTitle>{email}</UserMainTitle>
      <UserCard>
        <UserCardPar>Total Orders: 0</UserCardPar>
        <UserCardPar>Member since 20/12/2019</UserCardPar>
      </UserCard>
      <UserNavList>
        <UserNavItem>
          <LinkAnchor href='/profile'>profile</LinkAnchor>
        </UserNavItem>
        <UserNavItem>
          <LinkAnchor href='/profile'>contact details</LinkAnchor>
        </UserNavItem>
        <UserNavItem>
          <LinkAnchor href='/orders'>orders</LinkAnchor>
        </UserNavItem>
      </UserNavList>
    </UserNav>
  );
};

export default UserSideNav;
