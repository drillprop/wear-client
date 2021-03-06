import React, { FormEvent, useEffect } from 'react';
import {
  useMeQuery,
  useUpdatePersonalInfoMutation,
} from '../../../generated/types';
import ME from '../../../graphql/queries/ME';
import useForm from '../../../hooks/useForm';
import { SiteForm, SiteSubtitle } from '../../../styles/site.styles';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Input from '../../Input/Input';

const PersonalInfoForm: React.FC = () => {
  const { values, handleInput, setForm } = useForm({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const { data, error } = useMeQuery();
  const [updatePersonalInfo, { data: success }] = useUpdatePersonalInfoMutation(
    {
      refetchQueries: [
        {
          query: ME,
        },
      ],
    }
  );

  useEffect(() => {
    if (data?.me) {
      const { firstName, lastName, phoneNumber } = data.me;
      setForm({
        firstName: firstName || '',
        lastName: lastName || '',
        phoneNumber: phoneNumber || '',
      });
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePersonalInfo({
      variables: {
        ...values,
      },
    });
  };
  return (
    <SiteForm onSubmit={handleSubmit}>
      <SiteSubtitle>Personal Info</SiteSubtitle>
      <ErrorMessage error={error} />
      {success?.updatePersonalInfo.message}
      <div style={{ maxWidth: '350px' }}>
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
          icon='/phone-icon.svg'
        />
        <Button type='submit'>save</Button>
      </div>
    </SiteForm>
  );
};

export default PersonalInfoForm;
