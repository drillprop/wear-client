import React, { FormEvent } from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import useForm from '../../../hooks/useForm';
import SignImage from '../../SignImage/SignImage';
import SwitchSignButton from '../../SwitchSignButton/SwitchSignButton';
import { SignForm, SignTitle, SignWrapper } from '../Sign.styles';

interface Props {
  setIsNewUser: any;
}

const Register: React.FC<Props> = ({ setIsNewUser }) => {
  const [values, handleInput, handleSubmit] = useForm({
    email: '',
    userName: '',
    password: ''
  });
  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };
  return (
    <SignWrapper>
      <SignImage image='/woman-playing-with-blonde-hair.jpg' />
      <SignForm onSubmit={handleRegister}>
        <SignTitle>CREATE NEW ACCOUNT</SignTitle>
        <Input
          onChange={handleInput}
          type='text'
          icon='/user-icon.svg'
          label='userName'
          placeholder='John Doe'
          value={values.userName}
          required
        />
        <Input
          onChange={handleInput}
          type='email'
          icon='/mail-icon.svg'
          label='email'
          placeholder='user@example.com'
          value={values.email}
          required
        />
        <Input
          onChange={handleInput}
          type='password'
          icon='/padlock-icon.svg'
          label='password'
          placeholder='*******'
          value={values.password}
          required
        />
        <Button width='250px' type='submit'>
          register
        </Button>
      </SignForm>
      <SwitchSignButton onClick={() => setIsNewUser(false)} hoverText='LOGIN'>
        ALREADY HAVE ACCOUNT?
      </SwitchSignButton>
    </SignWrapper>
  );
};

export default Register;
