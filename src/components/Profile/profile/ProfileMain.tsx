import React from 'react';
import { ProfileMainWrapper, ProfileMainTitle } from './ProfileMain.styles';
import PersonalInfoForm from './profilemain/PersonalInfoForm';
import ChangePasswordForm from './profilemain/ChangePasswordForm';

const ProfileMain = () => {
  return (
    <ProfileMainWrapper>
      <ProfileMainTitle>Your Profile</ProfileMainTitle>
      <PersonalInfoForm />
      <ChangePasswordForm />
    </ProfileMainWrapper>
  );
};

export default ProfileMain;
