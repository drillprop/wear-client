"use client";
import { useMutation } from "@apollo/client/react";
import type React from "react";
import type { FormEvent } from "react";
import type { ItemsQueryVariables } from "@/gql/graphql";
import { createItem } from "../../../graphql/mutations/CREATE_ITEM";
import { items } from "../../../graphql/queries/ITEMS";
import useForm from "../../../hooks/useForm";
import { CategoryArr, GenderArr, SizesArr } from "../../../utils/constants";
import uploadImage from "../../../utils/uploadImage";
import Button from "../../Button/Button";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Input from "../../Input/Input";
import RadioGroup from "../../RadioGroup/RadioGroup";
import Select from "../../Select/Select";
import { SiteSubtitle } from "../../SiteLayout/SiteLayout";
import TextArea from "../../TextArea/TextArea";
import UploadImage from "../../UploadImage/UploadImage";

interface Props {
	variables: ItemsQueryVariables;
}

const CreateItemForm: React.FC<Props> = ({ variables }) => {
	const { values, handleInput, setForm, clearForm } = useForm({
		name: "",
		price: 0,
		category: "",
		gender: "",
		description: "",
		imageUrl: "",
		...SizesArr.reduce((acc: any, size) => {
			acc[size] = 0;
			return acc;
		}, {}),
	});

	const [create, { data, error }] = useMutation(createItem, {
		refetchQueries: [{ query: items, variables }],
		onCompleted: () => clearForm(values),
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const file = await uploadImage(values.imageUrl);
		const imageUrl = file.secure_url;

		const sizes = SizesArr.map(
			(size) =>
				values[size] && {
					sizeSymbol: size,
					quantity: parseInt(values[size], 10),
				},
		).filter((size) => size && size);

		create({
			variables: {
				...values,
				imageUrl,
				price: parseFloat(values.price),
				sizes,
			},
		});
	};
	return (
		<form onSubmit={handleSubmit} className="grid grid-rows-[repeat(1,1fr)]">
			<SiteSubtitle>Create an item</SiteSubtitle>
			<ErrorMessage error={error?.message} />
			{data?.createItem.id && "Succesfully create item"}
			<div className="grid grid-cols-[repeat(auto-fill,minmax(auto,300px))] grid-rows-[repeat(2,auto)] gap-x-[100px] gap-y-0">
				<div>
					<Input
						type="text"
						placeholder="name"
						onChange={handleInput}
						value={values.name}
						label="name"
						name="name"
						icon="/info-icon.svg"
					/>
					<Input
						type="number"
						placeholder="price"
						onChange={handleInput}
						value={values.price}
						label="price"
						name="price"
						icon="/wallet-icon.svg"
					/>
					<UploadImage
						onChange={(imageUrl) => setForm({ ...values, imageUrl })}
						imageUrl={values.imageUrl}
					/>
				</div>
				<div>
					<Select
						options={CategoryArr}
						label="category"
						placeHolder="select"
						onChange={(category) => setForm({ ...values, category })}
						value={values.category}
					/>
					<RadioGroup
						legend="Gender"
						name="gender"
						buttons={GenderArr}
						onChange={(gender) => setForm({ ...values, gender })}
						value={values.gender}
					/>
					<TextArea
						label="description"
						placeholder="Lorem ipsum dolor sit amet."
						value={values.description}
						onChange={handleInput}
					/>
					<div className="relative mt-[34px] grid w-full grid-cols-2 justify-items-center gap-[30px] border-2 border-foreground px-[25px] py-[30px]">
						<span className="absolute -top-2 left-[5px] bg-background px-[5px] font-roboto text-1 font-bold text-foreground uppercase">
							available sizes
						</span>
						{SizesArr.map((size) => (
							<Input
								key={size}
								name={size}
								icon="/category-icon.svg"
								type="number"
								className="mt-0"
								placeholder="0"
								value={values[size]}
								label={size}
								onChange={handleInput}
							/>
						))}
					</div>
					<Button type="submit">save</Button>
				</div>
			</div>
		</form>
	);
};

export default CreateItemForm;
