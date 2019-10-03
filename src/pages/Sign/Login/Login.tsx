import React from 'react';
import { SignTitle, SignForm, ForgotPassword } from '../Sign.styles';
import Input from '../../../components/Input/Input';
import mail from '../../../assets/mail-icon.svg';
import padlock from '../../../assets/padlock-icon.svg';
import Button from '../../../components/Button/Button';

const Login = () => {
  return (
    <SignForm>
      <SignTitle>WELCOME BACK</SignTitle>
      <Input
        placeholder='user@example.com'
        label='email'
        icon={mail}
        type='email'
      />
      <Input
        placeholder='*********'
        label='password'
        icon={padlock}
        type='password'
      />
      <ForgotPassword>Forgot your password?</ForgotPassword>
      <Button type='submit'>login</Button>
    </SignForm>
  );
};

export default Login;
