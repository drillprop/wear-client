import React from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import SignImage from '../../SignImage/SignImage';
import { SignForm, SignTitle, SignWrapper } from '../Sign.styles';
import SwitchSignButton from '../../SwitchSignButton/SwitchSignButton';

interface Props {
  setIsNewUser: any;
}

const Register: React.FC<Props> = ({ setIsNewUser }) => {
  return (
    <SignWrapper>
      <SignImage image='/woman-playing-with-blonde-hair.jpg' />
      <SignForm>
        <SignTitle>CREATE NEW ACCOUNT</SignTitle>
        <Input
          type='text'
          icon='/user-icon.svg'
          label='username'
          placeholder='John Doe'
        />
        <Input
          type='email'
          icon='/mail-icon.svg'
          label='email'
          placeholder='user@example.com'
        />
        <Input
          type='password'
          icon='/padlock-icon.svg'
          label='password'
          placeholder='*******'
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
