import React from 'react';
import { ProfileMainWrapper, ProfileMainTitle } from './ProfileMain.styles';
import PersonalInfoForm from './profilemain/PersonalInfoForm';
import ChangePasswordForm from './profilemain/ChangePasswordForm';
import DeleteAccountForm from './profilemain/DeleteAccountForm';

const ProfileMain = () => {
  return (
    <ProfileMainWrapper>
      <ProfileMainTitle>Your Profile</ProfileMainTitle>
      <PersonalInfoForm />
      <ChangePasswordForm />
      <DeleteAccountForm />
    </ProfileMainWrapper>
  );
};

export default ProfileMain;
