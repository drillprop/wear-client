import React from 'react';
import { useMeQuery } from '../../generated/types';
import { SiteWrapper } from '../../styles/sharedStyles';
import AccountSideNav from '../AccountSideNav/AccountSideNav';
import ChangePasswordForm from './profile/ChangePasswordForm';
import DeleteAccountForm from './profile/DeleteAccountForm';
import NewsletterForm from './profile/NewsletterForm';

const Profile: React.FC = () => {
  const { data } = useMeQuery();
  return (
    <SiteWrapper>
      <AccountSideNav email={data?.me?.email} />
      <div>
        <ChangePasswordForm />
        <NewsletterForm />
        <DeleteAccountForm />
      </div>
    </SiteWrapper>
  );
};

export default Profile;
