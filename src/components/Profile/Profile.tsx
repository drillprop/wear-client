import React from 'react';
import { useMeQuery } from '../../generated/types';
import { AccountMain, AccountSiteWrapper } from '../../styles/sharedStyles';
import AccountSideNav from '../AccountSideNav/AccountSideNav';
import ChangePasswordForm from './profile/ChangePasswordForm';
import DeleteAccountForm from './profile/DeleteAccountForm';
import PersonalInfoForm from './profile/PersonalInfoForm';

const Profile: React.FC = () => {
  const { data } = useMeQuery();
  return (
    <AccountSiteWrapper>
      <AccountSideNav email={data?.me?.email} />
      <AccountMain>
        <PersonalInfoForm />
        <ChangePasswordForm />
        <DeleteAccountForm />
      </AccountMain>
    </AccountSiteWrapper>
  );
};

export default Profile;
