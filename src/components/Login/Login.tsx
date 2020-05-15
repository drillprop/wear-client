import React, { FormEvent, useEffect } from 'react';
import { useLoginMutation } from '../../generated/types';
import ME from '../../graphql/queries/ME';
import useForm from '../../hooks/useForm';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Input from '../Input/Input';
import SignImage from '../SignImage/SignImage';
import SwitchSignButton from '../SwitchSignButton/SwitchSignButton';
import {
  ForgotPassword,
  SignForm,
  SignTitle,
  SignWrapper,
} from '../../styles/sign.styles';

interface Props {
  setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setIsNewUser }) => {
  const [login, { error }] = useLoginMutation({
    refetchQueries: [{ query: ME }],
  });
  const { values, handleInput, clearForm } = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (error) {
      clearForm(values);
    }
  }, [error]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({ variables: values });
    clearForm(values);
  };

  return (
    <SignWrapper>
      <SignForm onSubmit={handleLogin}>
        <SignTitle>WELCOME BACK</SignTitle>
        <ErrorMessage error={error}></ErrorMessage>
        <Input
          marginTop='50px'
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
        <Button type='submit'>login</Button>
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
