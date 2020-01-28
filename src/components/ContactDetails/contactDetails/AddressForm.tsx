import React, { useEffect, FormEvent } from 'react';
import { SiteForm, SiteFormTitle } from '../../../styles/sharedStyles';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import useForm from '../../../hooks/useForm';
import { useMeQuery, useUpdateAddressMutation } from '../../../generated/types';
import { ME } from '../../../graphql/queries';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const AddressForm: React.FC = () => {
  const { values, handleInput, setForm } = useForm({
    addressLine1: '',
    addressLine2: '',
    zipCode: '',
    city: '',
    country: ''
  });
  const { data } = useMeQuery();

  const [updateAddress, { error, data: success }] = useUpdateAddressMutation({
    refetchQueries: [
      {
        query: ME
      }
    ]
  });

  useEffect(() => {
    if (data?.me?.address) {
      const {
        addressLine1,
        addressLine2,
        zipCode,
        city,
        country
      } = data.me.address;

      setForm({
        addressLine1: addressLine1 || '',
        addressLine2: addressLine2 || '',
        zipCode: zipCode || '',
        city: city || '',
        country: country || ''
      });
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateAddress({
      variables: {
        ...values
      }
    });
  };

  return (
    <SiteForm onSubmit={handleSubmit}>
      <SiteFormTitle>Address</SiteFormTitle>
      {success?.updateAddress.message}
      <ErrorMessage error={error} />
      <Input
        value={values.addressLine1}
        onChange={handleInput}
        type='text'
        placeholder='address line 1'
        label='address line 1'
        name='addressLine1'
        icon='/home-icon.svg'
        width='350px'
      />
      <Input
        value={values.addressLine2}
        onChange={handleInput}
        type='text'
        placeholder='address line 2'
        label='address line 2'
        name='addressLine2'
        icon='/home-icon.svg'
        width='350px'
      />
      <Input
        value={values.zipCode}
        onChange={handleInput}
        type='text'
        placeholder='00-000'
        label='zip code'
        name='zipCode'
        icon='/city-icon.svg'
        width='350px'
      />
      <Input
        value={values.city}
        onChange={handleInput}
        type='text'
        placeholder='City'
        label='city'
        icon='/city-icon.svg'
        width='350px'
      />
      <Input
        value={values.country}
        onChange={handleInput}
        type='text'
        placeholder='Country'
        label='country'
        icon='/globe-icon.svg'
        width='350px'
      />
      <Button width='350px' type='submit'>
        save
      </Button>
    </SiteForm>
  );
};

export default AddressForm;
