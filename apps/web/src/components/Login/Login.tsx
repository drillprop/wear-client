"use client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { type FormEvent, useEffect } from "react";
import { login } from "../../graphql/mutations/LOGIN";
import useForm from "../../hooks/useForm";
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Input from "../Input/Input";
import LinkAnchor from "../LinkAnchor/LinkAnchor";
import SignImage from "../SignImage/SignImage";
import SwitchSignButton from "../SwitchSignButton/SwitchSignButton";

interface Props {
	setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setIsNewUser }) => {
	const router = useRouter();
	const [loginMutation, { error }] = useMutation(login);
	const { values, handleInput, clearForm } = useForm({
		email: "",
		password: "",
	});

	useEffect(() => {
		if (error) {
			clearForm(values);
		}
	}, [error]);

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { data } = await loginMutation({ variables: values });
		clearForm(values);
		// The session cookie came back through the proxy; navigate home so the
		// server (reverse gate + protected layouts) sees the authenticated session.
		if (data?.login) {
			router.push("/");
		}
	};

	return (
		<div className="grid h-[calc(100vh-100px)] max-w-[1300px] grid-cols-1 lg:grid-cols-2">
			<form
				onSubmit={handleLogin}
				className="mx-auto flex w-[230px] flex-col items-center lg:w-[290px]"
			>
				<h1 className="mt-[60px] text-center font-roboto text-6 font-bold">
					WELCOME BACK
				</h1>
				<ErrorMessage error={error?.message}></ErrorMessage>
				<Input
					className="mt-[50px]"
					placeholder="user@example.com"
					label="email"
					icon="/mail-icon.svg"
					type="email"
					onChange={handleInput}
					value={values.email}
					required
				/>
				<Input
					placeholder="*********"
					label="password"
					icon="/padlock-icon.svg"
					type="password"
					onChange={handleInput}
					value={values.password}
					required
				/>
				<Button type="submit">login</Button>
				<LinkAnchor href="/reset">
					<p className="mt-5 w-full text-center text-1">
						Forgot your password?
					</p>
				</LinkAnchor>
			</form>
			<SwitchSignButton onClick={() => setIsNewUser(true)} hoverText="REGISTER">
				DON'T HAVE ACCOUNT?
			</SwitchSignButton>
			<SignImage image="/young-woman-on-ferris-wheel.jpg" />
		</div>
	);
};

export default Login;
