import React from 'react';
import Header from './layout/Header';
import { Main, PageWrapper } from './Layout.styles';
import { useRouter } from 'next/router';
import Footer from './layout/Footer';

const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <PageWrapper>
      <Header />
      <Main>{children}</Main>
      {pathname !== '/sign' && <Footer />}
    </PageWrapper>
  );
};

export default Layout;
