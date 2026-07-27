import type { ApolloError } from "@apollo/client-v3";
import type React from "react";
import { useEffect, useState } from "react";
import getValidationExceptions from "../../utils/getValidationExceptions";

const ErrorMessage: React.FC<{ error?: string | ApolloError }> = ({
	error,
}) => {
	const [errorMessage, setError] = useState(error);

	useEffect(() => {
		if (error) {
			const formatedError = getValidationExceptions(error);
			setError(`Error: ${formatedError}`);
		} else {
			setError("");
		}
	}, [error]);

	return <>{errorMessage ? errorMessage : null}</>;
};

export default ErrorMessage;
