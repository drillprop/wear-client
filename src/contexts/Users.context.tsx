import React, { createContext, useState } from 'react';
import {
  UsersQuery,
  UsersQueryVariables,
  useUsersQuery
} from '../generated/types';

interface Context {
  variables: UsersQueryVariables;
  setVariables: (variables: any | UsersQueryVariables) => void;
  users: UsersQuery['users']['select'];
  count: UsersQuery['users']['count'];
}

export const UsersContext = createContext<Context>({
  variables: {},
  setVariables: () => {},
  users: [],
  count: 0
});

const UsersProvider: React.FC = ({ children }) => {
  const [variables, setVariables] = useState({ take: 5, skip: 0 });

  const { data } = useUsersQuery({
    variables,
    fetchPolicy: 'cache-and-network'
  });

  const count = data?.users.count || 0;
  const users = data?.users.select || [];

  return (
    <UsersContext.Provider
      value={{
        variables,
        setVariables,
        users,
        count
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
