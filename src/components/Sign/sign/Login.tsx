import React from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import SignImage from '../../SignImage/SignImage';
import { SignForm, SignTitle, SignWrapper } from '../Sign.styles';
import SwitchSignButton from '../../SwitchSignButton/SwitchSignButton';
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
      <SwitchSignButton onClick={() => setIsNewUser(true)} hoverText='REGISTER'>
        DON'T HAVE ACCOUNT?
      </SwitchSignButton>
      <SignImage image='/young-woman-on-ferris-wheel.jpg' />
    </SignWrapper>
  );
};

export default Login;
