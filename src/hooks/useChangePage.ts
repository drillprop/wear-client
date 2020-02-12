import React, { useState } from 'react';

const useChangePage = (take: number, skip: number, total: number = 0) => {
  const [pageState, setPages] = useState({
    take,
    skip,
    total,
    pageNumber: Math.ceil(skip / take + 1 || 1),
    totalPages: Math.ceil(total / take)
  });

  const changePage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { textContent } = e.currentTarget;

    if (textContent === '<') {
      if (pageState.pageNumber < pageState.skip) {
        setPages({
          ...pageState,
          skip: Math.max(0, pageState.skip - pageState.take),
          pageNumber: pageState.pageNumber - 1
        });
      }
    } else {
      if (pageState.pageNumber < pageState.totalPages) {
        setPages({
          ...pageState,
          skip: pageState.skip + pageState.take,
          pageNumber: pageState.pageNumber + 1
        });
      }
    }
  };

  const changeTake = (take: number) => {
    setPages({
      ...pageState,
      take,
      skip:
        take >= pageState.total ? Math.max(0, total - take) : pageState.skip,
      pageNumber: Math.ceil(pageState.skip / take + 1 || 1),
      totalPages: Math.ceil(pageState.total / take)
    });
  };

  return {
    skip: pageState.skip,
    take: pageState.take,
    changePage,
    changeTake
  };
};

export default useChangePage;
