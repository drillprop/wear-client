"use client";
import { useMutation } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { changePassword } from "../../graphql/mutations/CHANGE_PASSWORD";
import { resetPassword } from "../../graphql/mutations/RESET_PASSWORD";
import useForm from "../../hooks/useForm";
import {
	FullPageSubTitle,
	FullPageTitle,
	FullPageWrapper,
	SiteForm,
} from "../../styles/site.styles";
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Input from "../Input/Input";

/**
 * Request a reset email for an address (`resetPassword`).
 */
const RequestResetForm = () => {
	const [request, { error, data }] = useMutation(resetPassword);
	const { values, clearForm, handleInput } = useForm({ email: "" });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await request({ variables: { email: values.email } });
		clearForm(values);
	};

	return (
		<FullPageWrapper>
			<FullPageTitle>reset password</FullPageTitle>
			<FullPageSubTitle>
				Write your email below to reset password
			</FullPageSubTitle>
			<SiteForm onSubmit={handleSubmit}>
				<ErrorMessage error={error?.message} />
				{data?.resetPassword.message}
				<Input
					value={values.email}
					label="email"
					placeholder="your email"
					icon="/mail-icon.svg"
					type="email"
					onChange={handleInput}
				/>
				<Button type="submit">send email</Button>
			</SiteForm>
		</FullPageWrapper>
	);
};

/**
 * Complete a reset with the emailed token and a new password (`changePassword`).
 */
const SetNewPasswordForm = ({ token }: { token: string }) => {
	const [change, { error, data }] = useMutation(changePassword);
	const { values, clearForm, handleInput } = useForm({ password: "" });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await change({ variables: { password: values.password, token } });
		clearForm(values);
	};

	return (
		<FullPageWrapper>
			<FullPageTitle>set a new password</FullPageTitle>
			<FullPageSubTitle>
				Choose a new password for your account
			</FullPageSubTitle>
			<SiteForm onSubmit={handleSubmit}>
				<ErrorMessage error={error?.message} />
				{data?.changePassword.message}
				<Input
					value={values.password}
					label="new password"
					placeholder="*******"
					name="password"
					icon="/padlock-icon.svg"
					type="password"
					onChange={handleInput}
				/>
				<Button type="submit">change password</Button>
			</SiteForm>
		</FullPageWrapper>
	);
};

const Reset = () => {
	const token = useSearchParams()?.get("token");
	return token ? <SetNewPasswordForm token={token} /> : <RequestResetForm />;
};

export default Reset;
