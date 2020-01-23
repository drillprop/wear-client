import React from 'react';
import { useMeQuery } from '../../generated/types';
import { AccountMain, AccountSiteWrapper } from '../../styles/sharedStyles';
import AccountSideNav from '../AccountSideNav/AccountSideNav';
import ChangePasswordForm from './profile/ChangePasswordForm';
import DeleteAccountForm from './profile/DeleteAccountForm';
import NewsletterForm from './profile/NewsletterForm';

const Profile: React.FC = () => {
  const { data } = useMeQuery();
  return (
    <AccountSiteWrapper>
      <AccountSideNav email={data?.me?.email} />
      <AccountMain>
        <ChangePasswordForm />
        <NewsletterForm />
        <DeleteAccountForm />
      </AccountMain>
    </AccountSiteWrapper>
  );
};

export default Profile;
