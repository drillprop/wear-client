"use client";
import { useMutation } from "@apollo/client/react";
import type React from "react";
import { useEffect } from "react";
import type { SingleItemQuery } from "@/gql/graphql";
import { updateItem } from "../../graphql/mutations/UPDATE_ITEM";
import useForm from "../../hooks/useForm";
import { CategoryArr, GenderArr } from "../../utils/constants";
import convertSizesToArr from "../../utils/convertSizesToArr";
import convertSizesToObject from "../../utils/convertSizesToObject";
import getNewValFromSecObj from "../../utils/getNewValFromSecObj";
import uploadImage from "../../utils/uploadImage";
import AdminSideNav from "../AdminSideNav/AdminSideNav";
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Input from "../Input/Input";
import LinkAnchor from "../LinkAnchor/LinkAnchor";
import RadioGroup from "../RadioGroup/RadioGroup";
import Select from "../Select/Select";
import { SiteSubtitle, SiteWrapper } from "../SiteLayout/SiteLayout";
import TextArea from "../TextArea/TextArea";
import UploadImage from "../UploadImage/UploadImage";
import EditSizes from "./editItemForm/EditSizes";

interface Props {
	item: SingleItemQuery["item"];
}

const EditItemForm: React.FC<Props> = ({ item }) => {
	const [update, { data, error }] = useMutation(updateItem);

	const { values, handleInput, setForm } = useForm({
		name: "",
		price: 0,
		category: "",
		gender: "",
		description: "",
		imageUrl: "",
		sizes: convertSizesToObject([]),
	});

	useEffect(() => {
		setForm({ ...item, sizes: convertSizesToObject(item?.sizes || []) });
	}, [item]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Only re-upload when the image actually changed; otherwise keep the
		// item's existing URL (the old code dereferenced `false.secure_url` here
		// and threw on every no-image-change edit).
		const file =
			values.imageUrl !== item?.imageUrl
				? await uploadImage(values.imageUrl)
				: null;

		update({
			variables: {
				...getNewValFromSecObj(item, values),
				id: item?.id ?? "",
				imageUrl: file ? file.secure_url : values.imageUrl,
				price: parseFloat(values.price),
				sizes: convertSizesToArr(values.sizes),
			},
		});
	};

	const { name, price, category, gender, description, imageUrl } = values;
	return (
		<SiteWrapper>
			<AdminSideNav />
			{item && (
				<form
					onSubmit={handleSubmit}
					className="grid grid-rows-[repeat(1,1fr)]"
				>
					<SiteSubtitle>EDIT ITEM</SiteSubtitle>
					<div className="mb-[10px] font-roboto text-3 text-muted-foreground uppercase">
						<LinkAnchor href={`/shop/item?id=${item.id}`}>
							Go to item
						</LinkAnchor>
					</div>
					<ErrorMessage error={error?.message} />
					{data?.updateItem.id && "Succesfully updated item"}
					<div className="grid grid-cols-[repeat(auto-fill,minmax(auto,300px))] gap-x-[100px] gap-y-0">
						<div>
							<Input
								type="text"
								placeholder="name"
								onChange={handleInput}
								value={name}
								label="name"
								name="name"
								icon="/info-icon.svg"
							/>
							<Input
								type="number"
								placeholder="price"
								onChange={handleInput}
								value={price}
								label="price"
								name="price"
								icon="/wallet-icon.svg"
							/>
							<UploadImage
								onChange={(imageUrl) => setForm({ ...values, imageUrl })}
								imageUrl={imageUrl}
								placeholder="change image"
							/>
						</div>
						<div>
							<Select
								options={CategoryArr}
								label="category"
								placeHolder="select"
								onChange={(category) => setForm({ ...values, category })}
								value={category}
							/>
							<RadioGroup
								legend="Gender"
								name="gender"
								buttons={GenderArr}
								onChange={(gender) => setForm({ ...values, gender })}
								value={gender}
							/>
							<TextArea
								label="description"
								placeholder="Lorem ipsum dolor sit amet."
								value={description}
								onChange={handleInput}
							/>
							<EditSizes setForm={setForm} sizes={values.sizes} />
							<Button type="submit">save</Button>
						</div>
					</div>
				</form>
			)}
		</SiteWrapper>
	);
};

export default EditItemForm;
