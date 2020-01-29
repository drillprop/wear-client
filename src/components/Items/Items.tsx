import React, { useState } from 'react';
import { SiteWrapper } from '../../styles/site.styles';
import AdminSideNav from '../AdminSideNav/AdminSideNav';

const Items: React.FC = () => {
  const [pages, setPages] = useState({
    take: 5,
    skip: 0
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

  return (
    <SiteWrapper>
      <AdminSideNav />
      <div></div>
    </SiteWrapper>
  );
};

export default Items;
