import type React from "react";
import { SizesArr } from "../../../utils/constants";
import Input from "../../Input/Input";
import { SizesInputsWrapper } from "./EditSizes.styles";

interface Props {
	setForm: React.Dispatch<any>;
	sizes: any;
}

const EditSizes: React.FC<Props> = ({ sizes, setForm }) => {
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSizes = {
			...sizes,
			[e.target.name]: parseInt(e.target.value, 10),
		};
		setForm((values: any) => ({
			...values,
			sizes: newSizes,
		}));
	};
	return (
		<SizesInputsWrapper>
			{SizesArr.map((size) => (
				<Input
					key={size}
					name={size}
					icon="/category-icon.svg"
					type="number"
					marginTop="0"
					placeholder="0"
					value={sizes[size]}
					label={size}
					onChange={handleOnChange}
				/>
			))}
		</SizesInputsWrapper>
	);
};

export default EditSizes;
