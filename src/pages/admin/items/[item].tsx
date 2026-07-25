import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import EditItemForm from "../../../components/EditItemForm/EditItemForm";
import { useSingleItemQuery } from "../../../generated/types";
import { withPrivateRoute } from "../../../hoc/withPrivateRoute";

const AdminItem: NextPage = () => {
	const { query } = useRouter();
	const { data } = useSingleItemQuery({
		variables: {
			id: typeof query.item === "string" ? query.item : "",
		},
	});
	return (
		<>
			<Head>
				<title> wear | edit item</title>
			</Head>
			<EditItemForm item={data?.item} />;
		</>
	);
};

export default withPrivateRoute(AdminItem, "EMPLOYEE");
