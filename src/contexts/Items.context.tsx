import React, { createContext, useState } from 'react';
import {
  ItemsQuery,
  ItemsQueryVariables,
  useItemsQuery
} from '../generated/types';
import useChangePage from '../hooks/useChangePage';

interface Context {
  variables: ItemsQueryVariables;
  setVariables: (variables: any | ItemsQueryVariables) => void;
  changePage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  items: ItemsQuery['items']['select'];
}

export const ItemsContext = createContext<Context>({
  variables: {},
  setVariables: () => {},
  changePage: () => {},
  items: []
});

const ItemsProvider: React.FC = ({ children }) => {
  const [variables, setVariables] = useState({});
  const { data } = useItemsQuery({ variables });
  const { changePage } = useChangePage(5, 0, data?.items.count || 0);

  return (
    <ItemsContext.Provider
      value={{
        variables,
        setVariables,
        changePage,
        items: data?.items.select || []
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
