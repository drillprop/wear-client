import React, { FormEvent } from 'react';
import { useDeleteAccountMutation } from '../../../generated/types';
import ME from '../../../graphql/queries/ME';
import useForm from '../../../hooks/useForm';
import { SiteForm, SiteSubtitle } from '../../../styles/site.styles';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Input from '../../Input/Input';

const DeleteAccountForm: React.FC = () => {
  const { values, handleInput, clearForm } = useForm({
    confirmWithPassword: '',
  });

  const [deleteAccount, { error }] = useDeleteAccountMutation({
    refetchQueries: [{ query: ME }],
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(values.confirmWithPassword);
    e.preventDefault();
    await deleteAccount({
      variables: {
        password: values.confirmWithPassword,
      },
    }).catch((err) => err && clearForm(values));
    clearForm(values);
  };
  return (
    <SiteForm onSubmit={handleSubmit}>
      <SiteSubtitle>Delete Account</SiteSubtitle>
      <ErrorMessage error={error} />
      <div style={{ maxWidth: '350px' }}>
        <Input
          label='confirm with password'
          placeholder='******'
          name='confirmWithPassword'
          onChange={handleInput}
          type='password'
          icon='/user-icon.svg'
          value={values.confirmWithPassword}
          marginTop='50px'
        />
        <Button type='submit'>delete</Button>
      </div>
    </SiteForm>
  );
};

export default DeleteAccountForm;
