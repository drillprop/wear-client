import React, { createContext, useState } from 'react';
import {
  ItemsQuery,
  ItemsQueryVariables,
  useItemsQuery
} from '../generated/types';

interface Context {
  variables: ItemsQueryVariables;
  setVariables: (variables: any | ItemsQueryVariables) => void;
  items: ItemsQuery['items']['select'];
  count: number;
}

export const ItemsContext = createContext<Context>({
  variables: {},
  setVariables: () => {},
  items: [],
  count: 0
});

const ItemsProvider: React.FC = ({ children }) => {
  const [variables, setVariables] = useState({ take: 5, skip: 0 });

  const { data } = useItemsQuery({
    variables,
    fetchPolicy: 'cache-and-network'
  });
  const count = data?.items.count || 0;
  const items = data?.items.select || [];

  return (
    <ItemsContext.Provider
      value={{
        variables,
        setVariables,
        items,
        count
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
