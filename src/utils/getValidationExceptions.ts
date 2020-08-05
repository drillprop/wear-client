import { ApolloError } from 'apollo-boost';

const getValidationExceptions = (error: ApolloError | string) => {
  if (typeof error === 'string') {
    return error;
  }
  if (error.message === 'GraphQL error: Argument Validation Error') {
    const { extensions } = error.graphQLErrors[0];
    if (extensions)
      return extensions.exception.validationErrors.reduce(
        (acc: any, val: any) => acc + ', ' + Object.values(val.constraints)[0],
        ''
      );
  }
  if (error.message.includes('GraphQL error: Error:')) {
    return error.message.split('GraphQL error: Error:')[1];
  }

  return error.message;
};

export default getValidationExceptions;
