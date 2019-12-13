import React from 'react';
import Header from './layout/Header';
import { Main } from './Layout.styles';
import { useRouter } from 'next/router';
import Footer from './layout/Footer';

const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <>
      <Header />
      <Main>{children}</Main>
      {pathname !== '/sign' && <Footer />}
    </>
  );
};

export default Layout;
