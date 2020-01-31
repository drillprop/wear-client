import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import App from 'next/app';
import React from 'react';
import Layout from '../components/Layout/Layout';
import Globalstyle from '../styles/globalstyle';
import withApollo from '../utils/withApollo';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';

if (typeof window !== 'undefined') {
  Router.events.on('routeChangeStart', () => nProgress.start());
  Router.events.on('routeChangeComplete', () => nProgress.done());
  Router.events.on('routeChangeError', () => nProgress.done());
}

interface Props {
  apollo: ApolloClient<any>;
}

class MyApp extends App<Props> {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <>
        <Head>
          <title>wear</title>
          <link rel='stylesheet' type='text/css' href='/nprogress.css' />
        </Head>
        <ApolloProvider client={apollo}>
          <Layout>
            <Globalstyle />
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </>
    );
  }
}

export default withApollo(MyApp);
