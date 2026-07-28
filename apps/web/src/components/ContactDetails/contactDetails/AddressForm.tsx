"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import type React from "react";
import { type FormEvent, useEffect } from "react";
import { updateAddress } from "../../../graphql/mutations/UPDATE_ADDRESS";
import { me } from "../../../graphql/queries/ME";
import useForm from "../../../hooks/useForm";
import { SiteForm, SiteSubtitle } from "../../../styles/site.styles";
import Button from "../../Button/Button";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Input from "../../Input/Input";

const AddressForm: React.FC = () => {
	const { values, handleInput, setForm } = useForm({
		addressLine1: "",
		addressLine2: "",
		zipCode: "",
		city: "",
		country: "",
	});
	const { data } = useQuery(me);

	const [update, { error, data: success }] = useMutation(updateAddress, {
		refetchQueries: [{ query: me }],
	});

	useEffect(() => {
		if (data?.me?.address) {
			const { __typename, ...rest } = data.me.address;
			setForm({
				addressLine1: rest.addressLine1 || "",
				addressLine2: rest.addressLine2 || "",
				zipCode: rest.zipCode || "",
				city: rest.city || "",
				country: rest.country || "",
			});
		}
	}, [data]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await update({ variables: { ...values } });
	};

	return (
		<SiteForm onSubmit={handleSubmit}>
			<SiteSubtitle>Address</SiteSubtitle>
			{success?.updateAddress.message}
			<ErrorMessage error={error?.message} />
			<div style={{ maxWidth: "350px" }}>
				<Input
					className="mt-[50px]"
					value={values.addressLine1}
					onChange={handleInput}
					type="text"
					placeholder="address line 1"
					label="address line 1"
					name="addressLine1"
					icon="/home-icon.svg"
				/>
				<Input
					value={values.addressLine2}
					onChange={handleInput}
					type="text"
					placeholder="address line 2"
					label="address line 2"
					name="addressLine2"
					icon="/home-icon.svg"
				/>
				<Input
					value={values.zipCode}
					onChange={handleInput}
					type="text"
					placeholder="00-000"
					label="zip code"
					name="zipCode"
					icon="/city-icon.svg"
				/>
				<Input
					value={values.city}
					onChange={handleInput}
					type="text"
					placeholder="City"
					label="city"
					icon="/city-icon.svg"
				/>
				<Input
					value={values.country}
					onChange={handleInput}
					type="text"
					placeholder="Country"
					label="country"
					icon="/globe-icon.svg"
				/>
				<Button type="submit">save</Button>
			</div>
		</SiteForm>
	);
};

export default AddressForm;
