import React, { useState } from 'react';

const useChangePage = (take: number, skip: number, total: number = 0) => {
  const [pages, setPages] = useState({
    take,
    skip
  });

  const changePage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { textContent } = e.currentTarget;
    if (textContent === '>') {
      setPages({
        ...pages,
        skip: pages.skip + pages.take
      });
    } else {
      setPages({
        ...pages,
        skip: pages.skip - pages.take
      });
    }
  };

  const changeTake = (take: number) => {
    setPages({
      ...pages,
      take
    });
  };

  return {
    skip: pages.take >= total ? Math.max(0, 15 - pages.take) : pages.skip,
    take: pages.take,
    changePage,
    changeTake
  };
};

export default useChangePage;
