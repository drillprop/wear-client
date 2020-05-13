import React from 'react';
import { useChangePasswordMutation } from '../../../generated/types';
import useForm from '../../../hooks/useForm';
import { SiteForm, SiteSubtitle } from '../../../styles/site.styles';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Input from '../../Input/Input';

const ChangePasswordForm: React.FC = () => {
  const [changePassword, { data, error }] = useChangePasswordMutation();

  const { values, handleInput, clearForm } = useForm({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = values;
    await changePassword({
      variables: {
        password: oldPassword,
        newPassword,
        confirmPassword,
      },
    }).catch((err) => err && clearForm(values));
    clearForm(values);
  };

  return (
    <SiteForm onSubmit={handleChangePassword}>
      <SiteSubtitle>Change Password</SiteSubtitle>
      <ErrorMessage error={error} />
      {data?.changePassword.message}
      <div style={{ maxWidth: '350px' }}>
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
        <Button type='submit'>change password</Button>
      </div>
    </SiteForm>
  );
};

export default ChangePasswordForm;
