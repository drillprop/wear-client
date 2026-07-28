"use client";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import type React from "react";
import type { FormEvent } from "react";
import { deleteAccount } from "../../../graphql/mutations/DELETE_ACCOUNT";
import { me } from "../../../graphql/queries/ME";
import useForm from "../../../hooks/useForm";
import { SiteForm, SiteSubtitle } from "../../../styles/site.styles";
import Button from "../../Button/Button";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Input from "../../Input/Input";

const DeleteAccountForm: React.FC = () => {
	const router = useRouter();
	const { values, handleInput, clearForm } = useForm({
		confirmWithPassword: "",
	});

	const [remove, { error }] = useMutation(deleteAccount, {
		refetchQueries: [{ query: me }],
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { data } = await remove({
			variables: { password: values.confirmWithPassword },
		}).catch((err) => {
			if (err) clearForm(values);
			return { data: undefined };
		});
		clearForm(values);
		// Account gone — leave the (now un-gated) account area.
		if (data?.deleteAccount) {
			router.push("/");
		}
	};
	return (
		<SiteForm onSubmit={handleSubmit}>
			<SiteSubtitle>Delete Account</SiteSubtitle>
			<ErrorMessage error={error?.message} />
			<div style={{ maxWidth: "350px" }}>
				<Input
					label="confirm with password"
					placeholder="******"
					name="confirmWithPassword"
					onChange={handleInput}
					type="password"
					icon="/user-icon.svg"
					value={values.confirmWithPassword}
					className="mt-[50px]"
				/>
				<Button type="submit">delete</Button>
			</div>
		</SiteForm>
	);
};

export default DeleteAccountForm;
