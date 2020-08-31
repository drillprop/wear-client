import { useRouter } from 'next/router';
import React from 'react';
import { useSingleUserQuery } from '../../generated/types';
import { NextPage } from 'next';

const SingleUser: NextPage = () => {
  const { query } = useRouter();
  const { data } = useSingleUserQuery({
    variables: {
      id: typeof query.id === 'string' ? query.id : '',
    },
  });
  console.log(data?.user);
  return <div>single user {query.id}</div>;
};

export default SingleUser;
