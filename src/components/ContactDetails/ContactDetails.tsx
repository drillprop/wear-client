import React from 'react';
import { SiteWrapper } from '../../styles/site.styles';
import AccountSideNav from '../AccountSideNav/AccountSideNav';
import AddressForm from './contactDetails/AddressForm';
import PersonalInfoForm from './contactDetails/PersonalInfoForm';

const ContactDetails: React.FC = () => {
  return (
    <SiteWrapper>
      <AccountSideNav />
      <div>
        <PersonalInfoForm />
        <AddressForm />
      </div>
    </SiteWrapper>
  );
};

export default ContactDetails;
