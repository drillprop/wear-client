import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import { useSingleItemQuery } from "../../generated/types";

const Item: NextPage = () => {
	const { query } = useRouter();
	const { data, loading } = useSingleItemQuery({
		variables: {
			id: typeof query.id === "string" ? query.id : "",
		},
	});
	return (
		<>
			<Head>
				<title>
					wear {data ? data.item?.name && `| ${data.item?.name}` : ""}
				</title>
			</Head>
			<SingleProduct item={data?.item} loading={loading} />
		</>
	);
};

export default Item;
