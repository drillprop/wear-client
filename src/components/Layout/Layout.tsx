import React from 'react';
import Header from './layout/Header';
import { Main, PageWrapper } from './Layout.styles';
import { useRouter } from 'next/router';
import Footer from './layout/Footer';
import Head from 'next/head';
import CartContextProvider from '../../contexts/CartContext';

const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  const subpath = pathname.split('/').pop();
  return (
    <>
      <Head>
        <title>wear {subpath && `| ${subpath}`}</title>
      </Head>
      <PageWrapper>
        <CartContextProvider>
          <Header />
          <Main>{children}</Main>
          {pathname !== '/sign' && <Footer />}
        </CartContextProvider>
      </PageWrapper>
    </>
  );
};

export default Layout;
