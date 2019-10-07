import React, { useState } from 'react';
import mail from '../../../assets/mail-icon.svg';
import padlock from '../../../assets/padlock-icon.svg';
import woman from '../../../assets/young-woman-on-ferris-wheel.jpg';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import SignHero from '../../../components/SignHero/SignHero';
import {
  HaveAccountButton,
  SignForm,
  SignTitle,
  SignWrapper
} from '../Sign.styles';
import { ForgotPassword } from './Login.styles';

interface Props {
  setIsNewUser: Function;
}

const Login: React.FC<Props> = ({ setIsNewUser }) => {
  const [isHovered, hover] = useState(false);
  return (
    <SignWrapper>
      <SignForm>
        <SignTitle>WELCOME BACK</SignTitle>
        <Input
          placeholder='user@example.com'
          label='email'
          icon={mail}
          type='email'
        />
        <Input
          placeholder='*********'
          label='password'
          icon={padlock}
          type='password'
        />
        <Button type='submit'>login</Button>
        <ForgotPassword>Forgot your password?</ForgotPassword>
      </SignForm>
      <SignHero image={woman}>
        <HaveAccountButton
          onClick={() => setIsNewUser(true)}
          onMouseEnter={() => hover(!isHovered)}
          onMouseLeave={() => hover(!isHovered)}
        >
          {!isHovered ? 'DONT HAVE ACCOUNT?' : 'CREATE NEW ONE'}
        </HaveAccountButton>
      </SignHero>
    </SignWrapper>
  );
};

export default Login;
