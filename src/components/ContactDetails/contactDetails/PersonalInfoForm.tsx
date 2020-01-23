import React, { FormEvent } from 'react';
import useForm from '../../../hooks/useForm';
import { AccountForm, AccountFormTitle } from '../../../styles/sharedStyles';
import Button from '../../Button/Button';
import Input from '../../Input/Input';

const PersonalInfoForm: React.FC = () => {
  const { values, handleInput } = useForm({
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <AccountForm onSubmit={handleSubmit}>
      <AccountFormTitle>Personal Info</AccountFormTitle>
      <Input
        label='first name'
        placeholder='John'
        name='firstName'
        onChange={handleInput}
        type='text'
        icon='/user-icon.svg'
        value={values.firstName}
        marginTop='50px'
      />
      <Input
        label='last name'
        placeholder='Doe'
        name='lastName'
        onChange={handleInput}
        type='text'
        value={values.lastName}
        icon='/user-icon.svg'
      />
      <Input
        label='phone number'
        placeholder='XX 000 000 000'
        type='tel'
        name='phoneNumber'
        value={values.phoneNumber}
        onChange={handleInput}
        icon='/user-icon.svg'
      />
      <Button type='submit'>save</Button>
    </AccountForm>
  );
};

export default PersonalInfoForm;
