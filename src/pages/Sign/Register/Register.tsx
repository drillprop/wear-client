import React from 'react';
import { SignForm, SignTitle, SignWrapper } from '../Sign.styles';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import mail from '../../../assets/mail-icon.svg';
import user from '../../../assets/user-icon.svg';
import blonde from '../../../assets/woman-playing-with-blonde-hair.jpg';
import SignHero from '../../../components/SignHero/SignHero';

const Register = () => {
  return (
    <SignWrapper>
      <SignHero image={blonde} />
      <SignForm>
        <SignTitle>CREATE NEW ACCOUNT</SignTitle>
        <Input
          type='text'
          icon={user}
          label='username'
          placeholder='John Doe'
        />
        <Input
          type='email'
          icon={mail}
          label='email'
          placeholder='user@example.com'
        />
        <Input
          type='password'
          icon={mail}
          label='password'
          placeholder='*******'
        />
        <Button type='submit'>register</Button>
      </SignForm>
    </SignWrapper>
  );
};

export default Register;
