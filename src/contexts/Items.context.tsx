import React, { createContext } from 'react';
import { useItemsCountQuery } from '../generated/types';
import useChangePage from '../hooks/useChangePage';

export const ItemsContext = createContext({
  skip: 0,
  take: 0,
  changePage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {},
  changeTake: (take: number) => {},
  total: 0
});

const ItemsProvider: React.FC = ({ children }) => {
  const { take, skip, changePage, changeTake } = useChangePage(5, 0);
  const { data: countData, error: countError } = useItemsCountQuery();

  return (
    <ItemsContext.Provider
      value={{
        skip,
        take,
        changePage,
        changeTake,
        total: countData?.itemsCount || 0
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
