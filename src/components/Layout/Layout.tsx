import React from 'react';
import Header from './layout/Header';
import { Main, PageWrapper } from './Layout.styles';
import { useRouter } from 'next/router';
import Footer from './layout/Footer';
import Head from 'next/head';

const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter();
  return (
    <>
      <Head>
        <title>wear | {`${pathname.split('/').pop()}`}</title>
      </Head>
      <PageWrapper>
        <Header />
        <Main>{children}</Main>
        {pathname !== '/sign' && <Footer />}
      </PageWrapper>
    </>
  );
};

export default Layout;
