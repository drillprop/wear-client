import React, { useState } from 'react';
import Register from './sign/Register';
import Login from './sign/Login';

const Sign: React.FC = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  return isNewUser ? (
    <Register setIsNewUser={setIsNewUser} />
  ) : (
    <Login setIsNewUser={setIsNewUser} />
  );
};

export default Sign;
