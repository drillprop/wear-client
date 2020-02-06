import { NextPage } from 'next';
import React from 'react';
import Shop from '../components/Shop/Shop';
import { Gender } from '../generated/types';

const WomanPage: NextPage = () => {
  return <Shop gender={Gender.Female} />;
};

export default WomanPage;
