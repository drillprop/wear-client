"use client";
import { useMutation } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { changePassword } from "../../graphql/mutations/CHANGE_PASSWORD";
import { resetPassword } from "../../graphql/mutations/RESET_PASSWORD";
import useForm from "../../hooks/useForm";
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
		<div className="flex h-[400px] flex-col items-center justify-center">
			<h1 className="text-center font-roboto text-7 uppercase">
				reset password
			</h1>
			<h3 className="mt-[30px] max-w-[400px] text-center text-3 leading-[2] text-muted-foreground">
				Write your email below to reset password
			</h3>
			<form onSubmit={handleSubmit} className="w-[260px] sm:w-auto">
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
			</form>
		</div>
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
		<div className="flex h-[400px] flex-col items-center justify-center">
			<h1 className="text-center font-roboto text-7 uppercase">
				set a new password
			</h1>
			<h3 className="mt-[30px] max-w-[400px] text-center text-3 leading-[2] text-muted-foreground">
				Choose a new password for your account
			</h3>
			<form onSubmit={handleSubmit} className="w-[260px] sm:w-auto">
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
			</form>
		</div>
	);
};

const Reset = () => {
	const token = useSearchParams()?.get("token");
	return token ? <SetNewPasswordForm token={token} /> : <RequestResetForm />;
};

export default Reset;
