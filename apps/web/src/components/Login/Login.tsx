"use client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import type React from "react";
import { type FormEvent, useEffect } from "react";
import { login } from "../../graphql/mutations/LOGIN";
import { me } from "../../graphql/queries/ME";
import useForm from "../../hooks/useForm";
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Input from "../Input/Input";
import LinkAnchor from "../LinkAnchor/LinkAnchor";
import SignImage from "../SignImage/SignImage";
import { SignForm, SignTitle, SignWrapper } from "../SignLayout/SignLayout";
import SwitchSignButton from "../SwitchSignButton/SwitchSignButton";

interface Props {
	setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setIsNewUser }) => {
	const router = useRouter();
	// Refetch `me` once the session cookie is set so the header (and protected
	// layouts) pick up the authenticated user before we navigate — otherwise the
	// cached logged-out `me` sticks and the header still shows "login".
	const [loginMutation, { error }] = useMutation(login, {
		refetchQueries: [{ query: me }],
		awaitRefetchQueries: true,
	});
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
		<SignWrapper>
			<SignForm onSubmit={handleLogin}>
				<SignTitle>WELCOME BACK</SignTitle>
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
			</SignForm>
			<SwitchSignButton onClick={() => setIsNewUser(true)} hoverText="REGISTER">
				DON'T HAVE ACCOUNT?
			</SwitchSignButton>
			<SignImage image="/young-woman-on-ferris-wheel.jpg" />
		</SignWrapper>
	);
};

export default Login;
