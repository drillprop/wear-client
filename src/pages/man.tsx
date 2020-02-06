import { NextPage } from 'next';
import React from 'react';
import Shop from '../components/Shop/Shop';
import { Gender } from '../generated/types';

const ManPage: NextPage = () => {
  return <Shop gender={Gender.Male}></Shop>;
};

export default ManPage;
