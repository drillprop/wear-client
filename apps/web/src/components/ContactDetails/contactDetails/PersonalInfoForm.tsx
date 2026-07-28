"use client";
import { useMutation, useQuery } from "@apollo/client/react";
import type React from "react";
import { type FormEvent, useEffect } from "react";
import { updatePersonalInfo } from "../../../graphql/mutations/UPDATE_PERSONAL_INFO";
import { me } from "../../../graphql/queries/ME";
import useForm from "../../../hooks/useForm";
import Button from "../../Button/Button";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Input from "../../Input/Input";
import { SiteForm, SiteSubtitle } from "../../SiteLayout/SiteLayout";

const PersonalInfoForm: React.FC = () => {
	const { values, handleInput, setForm } = useForm({
		firstName: "",
		lastName: "",
		phoneNumber: "",
	});

	const { data, error } = useQuery(me);
	const [update, { data: success }] = useMutation(updatePersonalInfo, {
		refetchQueries: [{ query: me }],
	});

	useEffect(() => {
		if (data?.me) {
			const { firstName, lastName, phoneNumber } = data.me;
			setForm({
				firstName: firstName || "",
				lastName: lastName || "",
				phoneNumber: phoneNumber || "",
			});
		}
	}, [data]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await update({ variables: { ...values } });
	};
	return (
		<SiteForm onSubmit={handleSubmit}>
			<SiteSubtitle>Personal Info</SiteSubtitle>
			<ErrorMessage error={error?.message} />
			{success?.updatePersonalInfo.message}
			<div style={{ maxWidth: "350px" }}>
				<Input
					label="first name"
					placeholder="John"
					name="firstName"
					onChange={handleInput}
					type="text"
					icon="/user-icon.svg"
					value={values.firstName}
					className="mt-[50px]"
				/>
				<Input
					label="last name"
					placeholder="Doe"
					name="lastName"
					onChange={handleInput}
					type="text"
					value={values.lastName}
					icon="/user-icon.svg"
				/>
				<Input
					label="phone number"
					placeholder="XX 000 000 000"
					type="tel"
					name="phoneNumber"
					value={values.phoneNumber}
					onChange={handleInput}
					icon="/phone-icon.svg"
				/>
				<Button type="submit">save</Button>
			</div>
		</SiteForm>
	);
};

export default PersonalInfoForm;
