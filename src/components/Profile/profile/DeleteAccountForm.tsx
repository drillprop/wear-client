import React, { FormEvent } from 'react';
import { useDeleteAccountMutation } from '../../../generated/types';
import { ME } from '../../../graphql/queries';
import useForm from '../../../hooks/useForm';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Input from '../../Input/Input';
import { SiteForm, SiteFormTitle } from '../../../styles/site.styles';

const DeleteAccountForm: React.FC = () => {
  const { values, handleInput, clearForm } = useForm({
    confirmWithPassword: ''
  });

  const [deleteAccount, { error }] = useDeleteAccountMutation({
    refetchQueries: [{ query: ME }]
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log(values.confirmWithPassword);
    e.preventDefault();
    await deleteAccount({
      variables: {
        password: values.confirmWithPassword
      }
    }).catch(err => err && clearForm(values));
    clearForm(values);
  };
  return (
    <SiteForm onSubmit={handleSubmit}>
      <SiteFormTitle>Delete Account</SiteFormTitle>
      <ErrorMessage error={error} />
      <Input
        label='confirm with password'
        placeholder='******'
        name='confirmWithPassword'
        onChange={handleInput}
        type='password'
        icon='/user-icon.svg'
        value={values.confirmWithPassword}
        marginTop='50px'
        width='350px'
      />
      <Button width='350px' type='submit'>
        delete
      </Button>
    </SiteForm>
  );
};

export default DeleteAccountForm;
