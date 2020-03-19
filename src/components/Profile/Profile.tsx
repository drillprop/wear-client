import React from 'react';
import { SiteWrapper } from '../../styles/site.styles';
import AccountSideNav from '../AccountSideNav/AccountSideNav';
import ChangePasswordForm from './profile/ChangePasswordForm';
import DeleteAccountForm from './profile/DeleteAccountForm';
import NewsletterForm from './profile/NewsletterForm';

const Profile: React.FC = () => {
  return (
    <SiteWrapper>
      <AccountSideNav />
      <div>
        <ChangePasswordForm />
        <NewsletterForm />
        <DeleteAccountForm />
      </div>
    </SiteWrapper>
  );
};

export default Profile;
