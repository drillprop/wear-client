"use client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { type FormEvent, useEffect, useState } from "react";
import { register } from "../../graphql/mutations/REGISTER";
import useForm from "../../hooks/useForm";
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Input from "../Input/Input";
import SignImage from "../SignImage/SignImage";
import SwitchSignButton from "../SwitchSignButton/SwitchSignButton";

interface Props {
	setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<Props> = ({ setIsNewUser }) => {
	const router = useRouter();
	const [registerMutation, { error }] = useMutation(register);

	const [passwordError, setPasswordError] = useState("");
	const { values, handleInput, clearForm } = useForm({
		email: "",
		password: "",
		confirmPassword: "",
	});

	useEffect(() => {
		if (error) {
			clearForm(values);
		}
	}, [error]);

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { password, confirmPassword, email } = values;
		if (password !== confirmPassword) {
			setPasswordError(`Password don't match`);
		} else {
			const { data } = await registerMutation({
				variables: { email, password },
			});
			clearForm(values);
			if (data?.register) {
				router.push("/");
			}
		}
	};

	return (
		<div className="grid h-[calc(100vh-100px)] max-w-[1300px] grid-cols-1 lg:grid-cols-2">
			<form
				onSubmit={handleRegister}
				className="mx-auto flex w-[230px] flex-col items-center lg:w-[290px]"
			>
				<h1 className="mt-[60px] text-center font-roboto text-6 font-bold">
					CREATE NEW ACCOUNT
				</h1>
				<ErrorMessage error={error?.message || passwordError} />
				<Input
					className="mt-[50px]"
					onChange={handleInput}
					type="email"
					icon="/mail-icon.svg"
					label="email"
					placeholder="user@example.com"
					value={values.email}
					required
				/>
				<Input
					onChange={handleInput}
					type="password"
					icon="/padlock-icon.svg"
					label="password"
					placeholder="*******"
					value={values.password}
					required
				/>
				<Input
					onChange={handleInput}
					type="password"
					icon="/padlock-icon.svg"
					name="confirmPassword"
					label="confirm password"
					placeholder="*******"
					value={values.confirmPassword}
					required
				/>
				<Button type="submit">register</Button>
			</form>
			<SwitchSignButton onClick={() => setIsNewUser(false)} hoverText="LOGIN">
				ALREADY HAVE ACCOUNT?
			</SwitchSignButton>
			<SignImage image="/woman-playing-with-blonde-hair.jpg" />
		</div>
	);
};

export default Register;
