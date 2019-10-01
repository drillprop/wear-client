import React from 'react';
import Header from './Header/Header';
import { Main } from './Layout.styles';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
