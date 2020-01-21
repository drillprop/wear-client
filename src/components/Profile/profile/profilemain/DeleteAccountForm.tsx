import React, { FormEvent } from 'react';
import useForm from '../../../../hooks/useForm';
import { StyledForm, StyledFormTitle } from '../ProfileMain.styles';
import Input from '../../../Input/Input';
import Button from '../../../Button/Button';

const DeleteAccountForm = () => {
  const { values, handleInput } = useForm({
    confirmWithPassword: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledFormTitle>Delete Account</StyledFormTitle>
      <Input
        label='confirm with password'
        placeholder='******'
        name='confirmWithPassword'
        onChange={handleInput}
        type='password'
        icon='/user-icon.svg'
        value={values.firstName}
        marginTop='50px'
      />
      <Button type='submit'>delete</Button>
    </StyledForm>
  );
};

export default DeleteAccountForm;
