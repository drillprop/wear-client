import type { NextPage } from "next";
import Users from "../../components/Users/Users";
import { withPrivateRoute } from "../../hoc/withPrivateRoute";

const UsersPage: NextPage = () => {
	return <Users />;
};

export default withPrivateRoute(UsersPage, "ADMIN");
