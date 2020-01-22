import React from 'react';
import { ProfileMainWrapper } from './ProfileMain.styles';
import ChangePasswordForm from './profilemain/ChangePasswordForm';
import DeleteAccountForm from './profilemain/DeleteAccountForm';
import PersonalInfoForm from './profilemain/PersonalInfoForm';

const ProfileMain = () => {
  return (
    <ProfileMainWrapper>
      <PersonalInfoForm />
      <ChangePasswordForm />
      <DeleteAccountForm />
    </ProfileMainWrapper>
  );
};

export default ProfileMain;
