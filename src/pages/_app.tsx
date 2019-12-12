import React from 'react';
import App from 'next/app';
import Layout from '../components/Layout/Layout';
import Globalstyle from '../utils/globalstyle';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import fetch from 'node-fetch';

const client = new ApolloClient({
  fetch: fetch as any
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ApolloProvider client={client}>
        <Layout>
          <Globalstyle />
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }
}

export default MyApp;
