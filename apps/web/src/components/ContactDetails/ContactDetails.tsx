import type React from "react";
import { SiteWrapper } from "../SiteLayout/SiteLayout";
import AccountSideNav from "../AccountSideNav/AccountSideNav";
import AddressForm from "./contactDetails/AddressForm";
import PersonalInfoForm from "./contactDetails/PersonalInfoForm";

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
