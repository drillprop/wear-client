import type { NextPage } from "next";
import { withPrivateRoute } from "../../hoc/withPrivateRoute";

const OrdersPage: NextPage = () => {
	return <div>OrdersPage page</div>;
};

export default withPrivateRoute(OrdersPage, "EMPLOYEE");
