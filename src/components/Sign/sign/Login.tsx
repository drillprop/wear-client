import React, { FormEvent } from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import useForm from '../../../hooks/useForm';
import SignImage from '../../SignImage/SignImage';
import SwitchSignButton from '../../SwitchSignButton/SwitchSignButton';
import { SignForm, SignTitle, SignWrapper } from '../Sign.styles';
import { ForgotPassword } from './Login.styles';

interface Props {
  setIsNewUser: Function;
}

const Login: React.FC<Props> = ({ setIsNewUser }) => {
  const [values, handleInput, handleSubmit] = useForm({
    email: '',
    password: ''
  });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };
  return (
    <SignWrapper>
      <SignForm onSubmit={handleLogin}>
        <SignTitle>WELCOME BACK</SignTitle>
        <Input
          placeholder='user@example.com'
          label='email'
          icon='/mail-icon.svg'
          type='email'
          onChange={handleInput}
          value={values.email}
          required
        />
        <Input
          placeholder='*********'
          label='password'
          icon='/padlock-icon.svg'
          type='password'
          onChange={handleInput}
          value={values.password}
          required
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
