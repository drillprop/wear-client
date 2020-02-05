import React from 'react';
import { useSingleItemQuery } from '../../generated/types';

interface Props {
  query: {
    id: string;
  };
}

const SingleItem: React.FC<Props> = ({ query }) => {
  const { data } = useSingleItemQuery({
    variables: {
      id: query.id
    }
  });
  console.log(data?.item);
  return <div>single item {query.id}</div>;
};

export default SingleItem;
