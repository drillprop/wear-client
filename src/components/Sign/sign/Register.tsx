import React from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import SignHero from '../../../components/SignHero/SignHero';
import { SignForm, SignTitle, SignWrapper } from '../Sign.styles';
import HeroButton from '../../HeroButton/HeroButton';

interface Props {
  setIsNewUser: any;
}

const Register: React.FC<Props> = ({ setIsNewUser }) => {
  return (
    <SignWrapper>
      <SignHero image='/woman-playing-with-blonde-hair.jpg' />
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
        <Button type='submit'>register</Button>
      </SignForm>
      <HeroButton onClick={() => setIsNewUser(false)} hoverText='LOGIN'>
        ALREADY HAVE ACCOUNT?
      </HeroButton>
    </SignWrapper>
  );
};

export default Register;
