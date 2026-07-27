"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import type React from "react";
import { subscribeToNewsletter } from "../../../graphql/mutations/SUBSCRIBE_TO_NEWSLETTER";
import { me } from "../../../graphql/queries/ME";
import {
	SiteForm,
	SiteParagraph,
	SiteSubtitle,
} from "../../../styles/site.styles";
import Checkbox from "../../Checkbox/Checkbox";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const NewsletterForm: React.FC = () => {
	const { data, error } = useQuery(me);
	const [subscribe] = useMutation(subscribeToNewsletter, {
		refetchQueries: [{ query: me }],
	});

	const handleChecked = async (e: React.ChangeEvent<HTMLInputElement>) => {
		await subscribe({ variables: { newsletter: e.target.checked } });
	};
	return (
		<SiteForm>
			<SiteSubtitle>Newsletter</SiteSubtitle>
			<SiteParagraph>
				Subscribe for email newsletter to get updates on new arrivals and offers
			</SiteParagraph>
			<ErrorMessage error={error?.message} />
			<Checkbox
				checked={data?.me?.newsletter || false}
				onChange={handleChecked}
				text="subscribe to newsletter"
				id="subscribe"
				marginTop="50px"
			/>
		</SiteForm>
	);
};

export default NewsletterForm;
