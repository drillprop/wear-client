import type React from "react";
import { SizesArr } from "../../../utils/constants";
import Input from "../../Input/Input";

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
		<div className="relative mt-[34px] grid w-full grid-cols-[repeat(2,90px)] justify-center gap-5 border-2 border-foreground px-[25px] py-[30px]">
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
					value={sizes[size]}
					label={size}
					onChange={handleOnChange}
				/>
			))}
		</div>
	);
};

export default EditSizes;
