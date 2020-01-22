import React from 'react';
import LinkAnchor from '../../LinkAnchor/LinkAnchor';
import { ProfileMainTitle } from './ProfileMain.styles';
import {
  ProfileCard,
  ProfileCardPar,
  ProfileNav,
  ProfileNavItem,
  ProfileNavList
} from './ProfileSideNav.styles';

const ProfileSideNav = () => {
  return (
    <ProfileNav>
      <ProfileMainTitle>Your Profile</ProfileMainTitle>
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
