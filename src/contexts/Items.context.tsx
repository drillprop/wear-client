import React, { createContext } from 'react';
import useChangePage from '../hooks/useChangePage';

export const ItemsContext = createContext({
  itemsQueryVariables: {
    orderBy: 'Item.createdAt',
    desc: true,
    skip: 0,
    take: 0
  },
  changePage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {},
  changeTake: (take: number) => {}
});

const ItemsProvider: React.FC = ({ children }) => {
  const { take, skip, changePage, changeTake } = useChangePage(5, 0);

  return (
    <ItemsContext.Provider
      value={{
        itemsQueryVariables: {
          skip,
          take,
          orderBy: 'Item.createdAt',
          desc: true
        },
        changePage,
        changeTake
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
