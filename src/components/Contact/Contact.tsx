import React from 'react';
import { useMeQuery } from '../../generated/types';
import { AccountMain, AccountSiteWrapper } from '../../styles/sharedStyles';
import AccountSideNav from '../AccountSideNav/AccountSideNav';
import PersonalInfoForm from './contact/PersonalInfoForm';

const Profile: React.FC = () => {
  const { data } = useMeQuery();
  return (
    <AccountSiteWrapper>
      <AccountSideNav email={data?.me?.email} />
      <AccountMain>
        <PersonalInfoForm />
      </AccountMain>
    </AccountSiteWrapper>
  );
};

export default Profile;
