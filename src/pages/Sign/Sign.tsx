import React from 'react';
import { SignWrapper } from './Sign.styles';
import Register from './Register/Register';
import Login from './Login/Login';

const Sign: React.FC = () => {
  return (
    <SignWrapper>
      <Login />
      <Register />
    </SignWrapper>
  );
};

export default Sign;
