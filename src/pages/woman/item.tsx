import { NextPage } from 'next';
import React from 'react';
import SingleItem from '../../components/SingleItem/SingleItem';

interface Props {
  query: {
    id: string;
  };
}

const Item: NextPage<Props> = ({ query }) => {
  return <SingleItem query={query} />;
};

export default Item;
