import React from 'react';
import { SignTitle, SignForm, SignWrapper } from '../Sign.styles';
import Input from '../../../components/Input/Input';
import mail from '../../../assets/mail-icon.svg';
import padlock from '../../../assets/padlock-icon.svg';
import Button from '../../../components/Button/Button';
import SignHero from '../../../components/SignHero/SignHero';
import woman from '../../../assets/young-woman-on-ferris-wheel.jpg';
import { ForgotPassword } from './Login.styles';

const Login = () => {
  return (
    <SignWrapper>
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
        <Button type='submit'>login</Button>
        <ForgotPassword>Forgot your password?</ForgotPassword>
      </SignForm>
      <SignHero image={woman} />
    </SignWrapper>
  );
};

export default Login;
