import type { NextPage } from "next";
import ContactDetails from "../../components/ContactDetails/ContactDetails";
import { withPrivateRoute } from "../../hoc/withPrivateRoute";

const ContactPage: NextPage = () => {
	return <ContactDetails />;
};

export default withPrivateRoute(ContactPage);
