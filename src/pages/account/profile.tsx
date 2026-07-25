import type { NextPage } from "next";
import Profile from "../../components/Profile/Profile";
import { withPrivateRoute } from "../../hoc/withPrivateRoute";

const ProfilePage: NextPage = () => {
	return <Profile />;
};

export default withPrivateRoute(ProfilePage);
