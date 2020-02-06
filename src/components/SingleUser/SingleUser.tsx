import React from 'react';
import { useSingleUserQuery } from '../../generated/types';

interface Props {
  query: {
    id: string;
  };
}

const SingleUser: React.FC<Props> = ({ query }) => {
  const { data } = useSingleUserQuery({
    variables: {
      id: query.id
    }
  });
  console.log(data?.user);
  return <div>single user {query.id}</div>;
};

export default SingleUser;
