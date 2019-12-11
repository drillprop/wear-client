import React from 'react';
import App from 'next/app';
import Layout from '../components/Layout/Layout';
import Globalstyle from '../utils/globalstyle';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Globalstyle />
        <Component {...pageProps} />;
      </Layout>
    );
  }
}

export default MyApp;
