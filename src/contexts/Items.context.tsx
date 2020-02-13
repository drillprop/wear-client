import React, { createContext, useEffect, useState } from 'react';
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
  const { skip, take } = variables;

  const { data } = useItemsQuery({
    variables,
    fetchPolicy: 'cache-and-network'
  });
  const count = data?.items.count || 0;
  const items = data?.items.select || [];

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
    <ItemsContext.Provider
      value={{
        variables,
        setVariables,
        changePage,
        items,
        count
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
