import type React from "react";
import { SiteWrapper } from "../../styles/site.styles";
import AccountSideNav from "../AccountSideNav/AccountSideNav";
import DeleteAccountForm from "./profile/DeleteAccountForm";
import NewsletterForm from "./profile/NewsletterForm";

/**
 * Account profile — newsletter toggle + account deletion. The old logged-in
 * "change password" form is dropped: the rebuilt API only exposes a token-based
 * `changePassword` (the reset-completion flow, wired into `/reset`).
 */
const Profile: React.FC = () => {
	return (
		<SiteWrapper>
			<AccountSideNav />
			<div>
				<NewsletterForm />
				<DeleteAccountForm />
			</div>
		</SiteWrapper>
	);
};

export default Profile;
