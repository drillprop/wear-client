import React, { FormEvent, useEffect } from 'react';
import {
  useMeQuery,
  useUpdatePersonalInfoMutation
} from '../../../generated/types';
import { ME } from '../../../graphql/queries';
import useForm from '../../../hooks/useForm';
import { SiteForm, SiteFormTitle } from '../../../styles/sharedStyles';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Input from '../../Input/Input';

const PersonalInfoForm: React.FC = () => {
  const { values, handleInput, setForm } = useForm({
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });

  const { data, error } = useMeQuery();
  const [updatePersonalInfo, { data: success }] = useUpdatePersonalInfoMutation(
    {
      refetchQueries: [
        {
          query: ME
        }
      ]
    }
  );

  useEffect(() => {
    if (data?.me) {
      const { firstName, lastName, phoneNumber } = data.me;
      setForm({
        firstName: firstName || '',
        lastName: lastName || '',
        phoneNumber: phoneNumber || ''
      });
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePersonalInfo({
      variables: {
        ...values
      }
    });
  };
  return (
    <SiteForm onSubmit={handleSubmit}>
      <SiteFormTitle>Personal Info</SiteFormTitle>
      <ErrorMessage error={error} />
      {success?.updatePersonalInfo.message}
      <Input
        label='first name'
        placeholder='John'
        name='firstName'
        onChange={handleInput}
        type='text'
        icon='/user-icon.svg'
        value={values.firstName}
        marginTop='50px'
        width='350px'
      />
      <Input
        label='last name'
        placeholder='Doe'
        name='lastName'
        onChange={handleInput}
        type='text'
        value={values.lastName}
        icon='/user-icon.svg'
        width='350px'
      />
      <Input
        label='phone number'
        placeholder='XX 000 000 000'
        type='tel'
        name='phoneNumber'
        value={values.phoneNumber}
        onChange={handleInput}
        icon='/phone-icon.svg'
        width='350px'
      />
      <Button width='350px' type='submit'>
        save
      </Button>
    </SiteForm>
  );
};

export default PersonalInfoForm;
