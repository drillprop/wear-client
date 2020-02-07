import React, { useState } from 'react';

const useChangePage = (take: number, skip: number) => {
  const [pages, setPages] = useState({
    take,
    skip
  });

  const changePage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { textContent } = e.currentTarget;
    if (textContent === '>')
      setPages({
        ...pages,
        skip: pages.skip + pages.take
      });
    else
      setPages({
        ...pages,
        skip: pages.skip - pages.take
      });
  };
  return { skip: pages.skip, take: pages.take, changePage };
};

export default useChangePage;
