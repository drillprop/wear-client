import React from 'react';
import { ProfileWrapper } from './Profile.styles';
import ProfileMain from './profile/ProfileMain';
import ProfileSideNav from './profile/ProfileSideNav';

const Profile: React.FC = () => {
  return (
    <ProfileWrapper>
      <ProfileSideNav />
      <ProfileMain />
    </ProfileWrapper>
  );
};

export default Profile;
