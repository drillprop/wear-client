import React, { useState } from 'react';
import Register from './Register/Register';
import Login from './Login/Login';

const Sign: React.FC = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  return isNewUser ? (
    <Register setIsNewUser={setIsNewUser} />
  ) : (
    <Login setIsNewUser={setIsNewUser} />
  );
};

export default Sign;
