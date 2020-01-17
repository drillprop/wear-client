import React, { FormEvent } from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { useRegisterMutation } from '../../../generated/types';
import { ME } from '../../../graphql/queries';
import useForm from '../../../hooks/useForm';
import SignImage from '../../SignImage/SignImage';
import SwitchSignButton from '../../SwitchSignButton/SwitchSignButton';
import { SignForm, SignTitle, SignWrapper } from '../Sign.styles';

interface Props {
  setIsNewUser: any;
}

const Register: React.FC<Props> = ({ setIsNewUser }) => {
  const [values, handleInput, clearForm] = useForm({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [registerMutation] = useRegisterMutation({
    refetchQueries: [{ query: ME }]
  });

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.password === values.confirmPassword) {
      await registerMutation({ variables: values });
      clearForm(values);
    } else {
      console.log('password dont match');
    }
  };

  return (
    <>
      <SignWrapper>
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
          <Button width='250px' type='submit'>
            register
          </Button>
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
