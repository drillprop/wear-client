import React from 'react';
import {
  useMeQuery,
  useSubscribeToNewsletterMutation
} from '../../../generated/types';
import { ME } from '../../../graphql/queries';
import {
  AccountForm,
  AccountFormTitle,
  AccountParagraph
} from '../../../styles/sharedStyles';
import Checkbox from '../../Checkbox/Checkbox';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const NewsletterForm = () => {
  const { data, error } = useMeQuery();
  const [subscribeToNewsletter] = useSubscribeToNewsletterMutation({
    refetchQueries: [{ query: ME }]
  });

  const handleChecked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await subscribeToNewsletter({
      variables: {
        newsletter: e.target.checked
      }
    });
  };
  return (
    <AccountForm>
      <AccountFormTitle>Newsletter</AccountFormTitle>
      <AccountParagraph>
        Subscribe for email newsletter to get updates on new arrivals and offers
      </AccountParagraph>
      <ErrorMessage error={error} />
      <Checkbox
        checked={data?.me?.newsletter || false}
        onChange={handleChecked}
        text='subscribe to newsletter'
        id='subscribe'
        marginTop='50px'
      />
    </AccountForm>
  );
};

export default NewsletterForm;
