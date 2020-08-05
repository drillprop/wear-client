import React from 'react';
import { useResetPasswordMutation } from '../../generated/types';
import useForm from '../../hooks/useForm';
import {
  FullPageSubTitle,
  FullPageTitle,
  FullPageWrapper,
  SiteForm,
} from '../../styles/site.styles';
import Button from '../Button/Button';
import Input from '../Input/Input';

const Reset = () => {
  const [resetPassword, { error, loading, data }] = useResetPasswordMutation();
  const { values, clearForm, handleInput } = useForm({ email: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await resetPassword({
      variables: {
        email: values.email,
      },
    });
    console.log(error, loading, data);
    clearForm(values);
  };

  return (
    <FullPageWrapper>
      <FullPageTitle>reset password</FullPageTitle>
      <FullPageSubTitle>
        Write your email below to reset password
      </FullPageSubTitle>
      <SiteForm onSubmit={handleSubmit}>
        <Input
          value={values.email}
          label='email'
          placeholder='your email'
          icon='/mail-icon.svg'
          type='email'
          onChange={handleInput}
        />
        <Button type='submit'>send email</Button>
      </SiteForm>
    </FullPageWrapper>
  );
};

export default Reset;
