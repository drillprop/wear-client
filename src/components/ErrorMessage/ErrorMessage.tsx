import { ApolloError } from 'apollo-boost';
import React, { useEffect, useState } from 'react';
import getValidationExceptions from '../../utils/getValidationExceptions';

const ErrorMessage: React.FC<{ error?: string | ApolloError }> = ({
  error
}) => {
  const [errorMessage, setError] = useState(error);

  useEffect(() => {
    if (error) {
      const formatedError = getValidationExceptions(error);
      setError(`Error: ${formatedError}`);
    } else {
      setError('');
    }
  }, [error]);

  return <>{errorMessage ? errorMessage : null}</>;
};

export default ErrorMessage;
