import React from 'react';
import { useChangePasswordMutation } from '../../../generated/types';
import useForm from '../../../hooks/useForm';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Input from '../../Input/Input';
import { SiteForm, SiteFormTitle } from '../../../styles/site.styles';

const ChangePasswordForm: React.FC = () => {
  const [changePassword, { data, error }] = useChangePasswordMutation();

  const { values, handleInput, clearForm } = useForm({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = values;
    await changePassword({
      variables: {
        password: oldPassword,
        newPassword,
        confirmPassword
      }
    }).catch(err => err && clearForm(values));
    clearForm(values);
  };

  return (
    <SiteForm onSubmit={handleChangePassword}>
      <SiteFormTitle>Change Password</SiteFormTitle>
      <ErrorMessage error={error} />
      {data?.changePassword.message}
      <Input
        value={values.oldPassword}
        onChange={handleInput}
        label='old password'
        placeholder='*******'
        name='oldPassword'
        type='password'
        icon='/padlock-icon.svg'
        marginTop='50px'
        width='350px'
      />
      <Input
        value={values.newPassword}
        onChange={handleInput}
        label='new password'
        placeholder='*******'
        name='newPassword'
        type='password'
        icon='/padlock-icon.svg'
        width='350px'
      />
      <Input
        value={values.confirmPassword}
        onChange={handleInput}
        label='confirm new password'
        placeholder='*******'
        name='confirmPassword'
        type='password'
        icon='/padlock-icon.svg'
        width='350px'
      />
      <Button type='submit' width='350px'>
        change password
      </Button>
    </SiteForm>
  );
};

export default ChangePasswordForm;
