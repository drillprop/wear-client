import React from 'react';
import { useMeQuery } from '../../generated/types';
import AccountSideNav from '../AccountSideNav/AccountSideNav';
import AddressForm from './contactDetails/AddressForm';
import PersonalInfoForm from './contactDetails/PersonalInfoForm';
import { SiteWrapper } from '../../styles/site.styles';

const ContactDetails: React.FC = () => {
  const { data } = useMeQuery();
  return (
    <SiteWrapper>
      <AccountSideNav email={data?.me?.email} />
      <div>
        <PersonalInfoForm />
        <AddressForm />
      </div>
    </SiteWrapper>
  );
};

export default ContactDetails;
