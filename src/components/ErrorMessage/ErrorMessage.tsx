import { ApolloError } from 'apollo-boost';
import React, { useEffect, useState } from 'react';
import getValidationExceptions from '../../utils/getValidationExceptions';

const ErrorMessage: React.FC<{ error?: string | ApolloError }> = ({
  error
}) => {
  const [errorMessage, setError] = useState('');

  useEffect(() => {
    if (error) {
      const formatedError = getValidationExceptions(error);
      setError(`Error: ${formatedError}`);
    }
  }, [error]);

  return <>{errorMessage ? errorMessage : null}</>;
};

export default ErrorMessage;
