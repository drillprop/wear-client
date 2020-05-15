import React, { FormEvent, useEffect, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { useRegisterMutation } from '../../generated/types';
import ME from '../../graphql/queries/ME';
import useForm from '../../hooks/useForm';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SignImage from '../SignImage/SignImage';
import SwitchSignButton from '../SwitchSignButton/SwitchSignButton';
import { SignForm, SignTitle, SignWrapper } from '../../styles/sign.styles';

interface Props {
  setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<Props> = ({ setIsNewUser }) => {
  const [registerMutation, { error }] = useRegisterMutation({
    refetchQueries: [{ query: ME }],
  });

  const [passwordError, setPasswordError] = useState('');
  const { values, handleInput, clearForm } = useForm({
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (error) {
      clearForm(values);
    }
  }, [error]);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      setPasswordError(`Password don't match`);
    } else {
      await registerMutation({ variables: values });
      clearForm(values);
    }
  };

  return (
    <>
      <SignWrapper>
        <SignForm onSubmit={handleRegister}>
          <SignTitle>CREATE NEW ACCOUNT</SignTitle>
          <ErrorMessage error={error || passwordError} />
          <Input
            marginTop='50px'
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
          <Input
            onChange={handleInput}
            type='password'
            icon='/padlock-icon.svg'
            name='confirmPassword'
            label='confirm password'
            placeholder='*******'
            value={values.confirmPassword}
            required
          />
          <Button type='submit'>register</Button>
        </SignForm>
        <SwitchSignButton onClick={() => setIsNewUser(false)} hoverText='LOGIN'>
          ALREADY HAVE ACCOUNT?
        </SwitchSignButton>
        <SignImage image='/woman-playing-with-blonde-hair.jpg' />
      </SignWrapper>
    </>
  );
};

export default Register;
