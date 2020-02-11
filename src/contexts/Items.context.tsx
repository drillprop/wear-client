import React, { createContext, useState } from 'react';
import {
  ItemsQuery,
  ItemsQueryVariables,
  useItemsQuery
} from '../generated/types';
import useChangePage from '../hooks/useChangePage';

interface Context {
  variables: ItemsQueryVariables;
  changePage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  changeTake: (take: number) => void;
  items?: ItemsQuery['items'];
  setVariables: (variables: any | ItemsQueryVariables) => void;
}

export const ItemsContext = createContext<Context>({
  variables: {},
  changePage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {},
  changeTake: (take: number) => {},
  items: [],
  setVariables: () => {}
});

const ItemsProvider: React.FC = ({ children }) => {
  const { take, skip, changePage, changeTake } = useChangePage(5, 0);
  const [variables, setVariables] = useState({});

  const { data } = useItemsQuery({
    variables: {
      ...variables,
      take,
      skip
    }
  });

  return (
    <ItemsContext.Provider
      value={{
        variables: {
          ...variables,
          take,
          skip
        },
        changePage,
        changeTake,
        items: data?.items,
        setVariables
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
