import { NextPage } from 'next';
import React from 'react';
import Shop from '../../components/Shop/Shop';
import { Gender } from '../../generated/types';

const ShopPage: NextPage = () => {
  return <Shop gender={Gender.Man}></Shop>;
};

export default ShopPage;
