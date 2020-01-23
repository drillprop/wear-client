import React from 'react';
import useForm from '../../../hooks/useForm';
import { AccountForm, AccountFormTitle } from '../../../styles/sharedStyles';
import Button from '../../Button/Button';
import Input from '../../Input/Input';

const ChangePasswordForm: React.FC = () => {
  const { values, handleInput } = useForm({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  return (
    <AccountForm>
      <AccountFormTitle>Change Password</AccountFormTitle>
      <Input
        value={values.oldPassword}
        onChange={handleInput}
        label='old password'
        placeholder='*******'
        name='oldPassword'
        type='password'
        icon='/padlock-icon.svg'
        marginTop='50px'
      />
      <Input
        value={values.newPassword}
        onChange={handleInput}
        label='new password'
        placeholder='*******'
        name='newPassword'
        type='password'
        icon='/padlock-icon.svg'
      />
      <Input
        value={values.confirmPassword}
        onChange={handleInput}
        label='confirm new password'
        placeholder='*******'
        name='confirmPassword'
        type='password'
        icon='/padlock-icon.svg'
      />
      <Button type='submit' width='100%'>
        change password
      </Button>
    </AccountForm>
  );
};

export default ChangePasswordForm;
