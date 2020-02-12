import React, { createContext, useState } from 'react';
import {
  ItemsQuery,
  ItemsQueryVariables,
  useItemsQuery
} from '../generated/types';

interface Context {
  variables: ItemsQueryVariables;
  setVariables: (variables: any | ItemsQueryVariables) => void;
  changePage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  items: ItemsQuery['items']['select'];
  count: number;
}

export const ItemsContext = createContext<Context>({
  variables: {},
  setVariables: () => {},
  changePage: () => {},
  items: [],
  count: 0
});

const ItemsProvider: React.FC = ({ children }) => {
  const [variables, setVariables] = useState({ take: 5, skip: 0 });
  const { data } = useItemsQuery({ variables });
  const changePage = () => {};

  return (
    <ItemsContext.Provider
      value={{
        variables,
        setVariables,
        changePage,
        items: data?.items.select || [],
        count: data?.items.count || 0
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
