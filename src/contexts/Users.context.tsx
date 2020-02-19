import React, { createContext, useEffect, useState } from 'react';
import {
  UsersQuery,
  UsersQueryVariables,
  useUsersQuery
} from '../generated/types';

interface Context {
  variables: UsersQueryVariables;
  setVariables: (variables: any | UsersQueryVariables) => void;
  changePage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  users: UsersQuery['users']['select'];
  count: UsersQuery['users']['count'];
}

export const UsersContext = createContext<Context>({
  variables: {},
  setVariables: () => {},
  changePage: () => {},
  users: [],
  count: 0
});

const UsersProvider: React.FC = ({ children }) => {
  const [variables, setVariables] = useState({ take: 5, skip: 0 });
  const { skip, take } = variables;

  const { data } = useUsersQuery({
    variables,
    fetchPolicy: 'cache-and-network'
  });
  const count = data?.users.count || 0;
  const users = data?.users.select || [];

  useEffect(() => {
    setVariables({
      ...variables,
      skip: take >= count ? Math.max(0, count - take) : skip
    });
  }, [take, count]);

  const changePage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { textContent } = e.currentTarget;

    if (textContent === '>') {
      setVariables({
        ...variables,
        skip: count > skip + take ? skip + take : skip
      });
    }
    if (textContent === '<') {
      setVariables({
        ...variables,
        skip: Math.max(0, skip - take)
      });
    }
  };

  return (
    <UsersContext.Provider
      value={{
        variables,
        setVariables,
        changePage,
        users,
        count
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
