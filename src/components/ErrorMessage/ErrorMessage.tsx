import React, { useEffect, useState } from 'react';

const ErrorMessage: React.FC<{ error?: string }> = ({ error }) => {
  const [errorMessage, setError] = useState('');

  useEffect(() => {
    if (error) {
      if (error.includes('GraphQL error:')) {
        const message = error.split('GraphQL error:')[1];
        setError(message);
      } else {
        setError(error);
      }
    }
  }, [error]);

  return <>{errorMessage ? errorMessage : null}</>;
};

export default ErrorMessage;
