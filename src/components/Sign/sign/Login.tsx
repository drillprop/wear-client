import React from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import SignHero from '../../../components/SignHero/SignHero';
import { SignForm, SignTitle, SignWrapper } from '../Sign.styles';
import HeroButton from '../../HeroButton/HeroButton';
import { ForgotPassword } from './Login.styles';

interface Props {
  setIsNewUser: Function;
}

const Login: React.FC<Props> = ({ setIsNewUser }) => {
  return (
    <SignWrapper>
      <SignForm>
        <SignTitle>WELCOME BACK</SignTitle>
        <Input
          placeholder='user@example.com'
          label='email'
          icon='/mail-icon.svg'
          type='email'
        />
        <Input
          placeholder='*********'
          label='password'
          icon='/padlock-icon.svg'
          type='password'
        />
        <Button width='250px' type='submit'>
          login
        </Button>
        <ForgotPassword>Forgot your password?</ForgotPassword>
      </SignForm>
      <HeroButton onClick={() => setIsNewUser(true)} hoverText='CREATE NEW ONE'>
        DON'T HAVE ACCOUNT?
      </HeroButton>
      <SignHero image='/young-woman-on-ferris-wheel.jpg' />
    </SignWrapper>
  );
};

export default Login;
