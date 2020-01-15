import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import App from 'next/app';
import React from 'react';
import Layout from '../components/Layout/Layout';
import Globalstyle from '../utils/globalstyle';
import withApollo from '../utils/withApollo';

interface Props {
  apollo: ApolloClient<any>;
}

class MyApp extends App<Props> {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Layout>
          <Globalstyle />
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
