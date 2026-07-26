import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSingleUserQuery } from "../../generated/types";

const SingleUser: NextPage = () => {
	const { query } = useRouter();
	const { data } = useSingleUserQuery({
		variables: {
			id: typeof query.id === "string" ? query.id : "",
		},
	});
	console.log(data?.user);
	return <div>single user {query.id}</div>;
};

export default SingleUser;
