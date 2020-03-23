import { NextPage } from 'next';
import React from 'react';
import Sign from '../components/Sign/Sign';
import { withAuth } from '../hoc/withAuth';

const SignPage: NextPage = () => {
  return <Sign />;
};

export default withAuth(SignPage, '/cart');
