import React, { useState } from 'react';
import Checkbox from '../../Checkbox/Checkbox';
import { AccountForm, AccountFormTitle } from '../../../styles/sharedStyles';

const NewsletterForm = () => {
  const [checked, setChecked] = useState(false);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(checked => !checked);
  };
  return (
    <AccountForm>
      <AccountFormTitle>Newsletter</AccountFormTitle>
      <Checkbox
        checked={checked}
        onChange={handleChecked}
        text='subscribe'
        id='subscribe'
        marginTop='50px'
      />
    </AccountForm>
  );
};

export default NewsletterForm;
