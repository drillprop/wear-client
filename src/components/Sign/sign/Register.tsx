import React, { FormEvent } from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import useForm from '../../../hooks/useForm';
import SignImage from '../../SignImage/SignImage';
import SwitchSignButton from '../../SwitchSignButton/SwitchSignButton';
import { SignForm, SignTitle, SignWrapper } from '../Sign.styles';
import { useRegisterMutation } from '../../../generated/types';

interface Props {
  setIsNewUser: any;
}

const Register: React.FC<Props> = ({ setIsNewUser }) => {
  const [values, handleInput, clearForm] = useForm({
    email: '',
    password: ''
  });

  const [registerMutation, payload] = useRegisterMutation();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerMutation({ variables: values });
    clearForm(values);
  };

  return (
    <SignWrapper>
      <SignImage image='/woman-playing-with-blonde-hair.jpg' />
      <SignForm onSubmit={handleRegister}>
        <SignTitle>CREATE NEW ACCOUNT</SignTitle>
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
