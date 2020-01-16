import React, { useState, useEffect } from 'react';
import Register from './sign/Register';
import Login from './sign/Login';
import { useRouter } from 'next/router';
import { useMeQuery } from '../../generated/types';

const Sign: React.FC = () => {
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

export default Sign;
