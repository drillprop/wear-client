import type { ApolloError } from "@apollo/client-v3";
import type React from "react";
import { useEffect, useState } from "react";
import getValidationExceptions from "../../utils/getValidationExceptions";

const ErrorMessage: React.FC<{ error?: string | ApolloError }> = ({
	error,
}) => {
	const [errorMessage, setError] = useState("");

	useEffect(() => {
		if (error) {
			const formatedError = getValidationExceptions(error);
			setError(`Error: ${formatedError}`);
		} else {
			setError("");
		}
	}, [error]);

	// Shared leaf given the shadcn look (#84): render the message in the
	// destructive token rather than as bare text.
	return errorMessage ? (
		<p className="text-sm font-medium text-destructive">{errorMessage}</p>
	) : null;
};

export default ErrorMessage;
