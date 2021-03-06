import React from 'react';
import {
  useMeQuery,
  useSubscribeToNewsletterMutation
} from '../../../generated/types';
import ME from '../../../graphql/queries/ME';
import {
  SiteForm,
  SiteParagraph,
  SiteSubtitle
} from '../../../styles/site.styles';
import Checkbox from '../../Checkbox/Checkbox';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

const NewsletterForm: React.FC = () => {
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
    <SiteForm>
      <SiteSubtitle>Newsletter</SiteSubtitle>
      <SiteParagraph>
        Subscribe for email newsletter to get updates on new arrivals and offers
      </SiteParagraph>
      <ErrorMessage error={error} />
      <Checkbox
        checked={data?.me?.newsletter || false}
        onChange={handleChecked}
        text='subscribe to newsletter'
        id='subscribe'
        marginTop='50px'
      />
    </SiteForm>
  );
};

export default NewsletterForm;
