import type { ApolloError } from "@apollo/client-v3";

const getValidationExceptions = (error: ApolloError | string) => {
	if (typeof error === "string") {
		return error;
	}
	if (error.message === "GraphQL error: Argument Validation Error") {
		const { extensions } = error.graphQLErrors[0];
		if (extensions) {
			const exception = extensions.exception as {
				validationErrors: { constraints: Record<string, string> }[];
			};
			return exception.validationErrors.reduce(
				(acc: string, val) => `${acc}, ${Object.values(val.constraints)[0]}`,
				"",
			);
		}
	}
	if (error.message.includes("GraphQL error: Error:")) {
		return error.message.split("GraphQL error: Error:")[1];
	}

	return error.message;
};

export default getValidationExceptions;
