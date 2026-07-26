import type { NextPage } from "next";
import SingleUser from "../../components/SingleUser/SingleUser";
import { withPrivateRoute } from "../../hoc/withPrivateRoute";

const User: NextPage = () => {
	return <SingleUser />;
};

export default withPrivateRoute(User, "ADMIN");
