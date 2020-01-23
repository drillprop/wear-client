import React, { FormEvent } from 'react';
import useForm from '../../../hooks/useForm';
import { AccountForm, AccountFormTitle } from '../../../styles/sharedStyles';
import Button from '../../Button/Button';
import Input from '../../Input/Input';

const DeleteAccountForm = () => {
  const { values, handleInput } = useForm({
    confirmWithPassword: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <AccountForm onSubmit={handleSubmit}>
      <AccountFormTitle>Delete Account</AccountFormTitle>
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
    </AccountForm>
  );
};

export default DeleteAccountForm;
