import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import { useMeQuery } from '../generated/types';
import { withAuth } from '../hoc/withAuth';

const SignPage: NextPage = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const { data } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (data?.me) {
      router.push('/');
    }
  }, [data]);

  return isNewUser ? (
    <Register setIsNewUser={setIsNewUser} />
  ) : (
    <Login setIsNewUser={setIsNewUser} />
  );
};

export default withAuth(SignPage, '/cart');
