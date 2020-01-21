import React from 'react';
import Button from '../../../Button/Button';
import Input from '../../../Input/Input';
import { StyledForm, StyledFormTitle } from '../ProfileMain.styles';
import useForm from '../../../../hooks/useForm';

const ChangePasswordForm: React.FC = () => {
  const { values, handleInput } = useForm({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  return (
    <StyledForm>
      <StyledFormTitle>Change Password</StyledFormTitle>
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
    </StyledForm>
  );
};

export default ChangePasswordForm;
