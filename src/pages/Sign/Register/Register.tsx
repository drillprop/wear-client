import React, { useState } from 'react';
import mail from '../../../assets/mail-icon.svg';
import user from '../../../assets/user-icon.svg';
import blonde from '../../../assets/woman-playing-with-blonde-hair.jpg';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import SignHero from '../../../components/SignHero/SignHero';
import {
  HaveAccountButton,
  SignForm,
  SignTitle,
  SignWrapper
} from '../Sign.styles';

interface Props {
  setIsNewUser: any;
}

const Register: React.FC<Props> = ({ setIsNewUser }) => {
  const [isHovered, hover] = useState(false);
  return (
    <SignWrapper>
      <SignHero image={blonde}>
        <HaveAccountButton
          onClick={() => setIsNewUser(false)}
          onMouseEnter={() => hover(!isHovered)}
          onMouseLeave={() => hover(!isHovered)}
        >
          {!isHovered ? 'LOGIN' : 'ALREADY HAVE ACCOUNT?'}
        </HaveAccountButton>
      </SignHero>
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
