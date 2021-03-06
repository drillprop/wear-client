import React from 'react';
import Header from './layout/Header';
import { Main, PageWrapper } from './Layout.styles';
import { useRouter } from 'next/router';
import Footer from './layout/Footer';
import Head from 'next/head';
import CartContextProvider from '../../contexts/CartContext';

const Layout: React.FC = ({ children }) => {
  const { asPath, pathname } = useRouter();
  const subpath = asPath
    .split(/\/|\?/gi)
    .filter((el) => el !== 'shop')
    .slice(1)
    .join(' | ')
    .split('=')
    .join(' ');

  return (
    <>
      <Head>
        <title>wear {subpath && `| ${subpath}`}</title>
      </Head>
      <CartContextProvider>
        <Header />
        <PageWrapper>
          <Main>{children}</Main>
        </PageWrapper>
        {pathname !== '/sign' && <Footer />}
      </CartContextProvider>
    </>
  );
};

export default Layout;
