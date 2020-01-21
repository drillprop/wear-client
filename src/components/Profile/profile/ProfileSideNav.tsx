import React from 'react';
import {
  ProfileNav,
  ProfileNavTitle,
  ProfileCard,
  ProfileNavList,
  ProfileNavItem,
  ProfileCardPar
} from './ProfileSideNav.styles';
import LinkAnchor from '../../LinkAnchor/LinkAnchor';

const ProfileSideNav = () => {
  return (
    <ProfileNav>
      <ProfileNavTitle>Email@Email.com</ProfileNavTitle>
      <ProfileCard>
        <ProfileCardPar>Total Orders: 0</ProfileCardPar>
        <ProfileCardPar>Member since 20/12/2019</ProfileCardPar>
      </ProfileCard>
      <ProfileNavList>
        <ProfileNavItem>
          <LinkAnchor href='/profile'>profile</LinkAnchor>
        </ProfileNavItem>
        <ProfileNavItem>
          <LinkAnchor href='/profile'>contact details</LinkAnchor>
        </ProfileNavItem>
        <ProfileNavItem>
          <LinkAnchor href='/orders'>orders</LinkAnchor>
        </ProfileNavItem>
      </ProfileNavList>
    </ProfileNav>
  );
};

export default ProfileSideNav;
