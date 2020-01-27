import React from 'react';
import { useMeQuery } from '../../generated/types';
import { AccountMain, AccountSiteWrapper } from '../../styles/sharedStyles';
import AccountSideNav from '../AccountSideNav/AccountSideNav';
import PersonalInfoForm from './contactDetails/PersonalInfoForm';
import AddressForm from './contactDetails/AddressForm';

const ContactDetails: React.FC = () => {
  const { data } = useMeQuery();
  return (
    <AccountSiteWrapper>
      <AccountSideNav email={data?.me?.email} />
      <AccountMain>
        <PersonalInfoForm />
        <AddressForm />
      </AccountMain>
    </AccountSiteWrapper>
  );
};

export default ContactDetails;
