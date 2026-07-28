"use client";
import { cn } from "@wear/ui/lib/utils";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface Props {
	onChange: (arg: any) => void;
	imageUrl?: string;
	required?: boolean;
	placeholder?: string;
}

/**
 * Image upload (#89). The `UploadImage.styles.ts` styled-components port to
 * Tailwind: the grays map onto the shadcn neutral tokens; the preview box is a
 * dynamic `background-image` (kept an inline style since the URL is runtime);
 * the discard button's two `::before`/`::after` bars become `before:`/`after:`
 * rotated pseudo-elements; the file `::before` caption is folded into the label
 * text. The transparent native file input overlays the styled label
 * (`opacity-0`), and its focus toggles a ring on the label via the `outline`
 * state (a `clsx` boolean).
 */
const UploadImage: React.FC<Props> = ({
	onChange,
	imageUrl,
	required,
	placeholder = "send a file",
}) => {
	const [outline, setOutline] = useState(false);
	const [filename, setFilename] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!imageUrl) {
			setFilename("");
			if (inputRef.current) inputRef.current.value = "";
		}
	}, [imageUrl]);

	const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileName = e.target.value.split("\\").pop();
		fileName && setFilename(fileName);
		const reader = new FileReader();

		if (e.target.files?.[0]) {
			const file = e.target.files[0];
			reader.onload = (e) => {
				onChange(e.target?.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const discardImage = () => {
		onChange("");
		if (inputRef.current) inputRef.current.value = "";
	};

	return (
		<>
			<label
				htmlFor="file-input"
				className="relative mt-[25px] mb-[5px] block cursor-pointer font-roboto text-1 font-bold text-foreground uppercase"
			>
				UPLOAD AN IMAGE
			</label>
			<div
				className="relative flex h-[500px] items-center justify-center border border-border bg-muted bg-cover bg-center"
				style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
			>
				{filename && (
					<button
						type="button"
						aria-label="discard image"
						onClick={discardImage}
						className="absolute top-5 right-5 z-50 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border border-border bg-background before:absolute before:h-px before:w-[13px] before:rotate-45 before:bg-foreground before:content-[''] after:absolute after:h-px after:w-[13px] after:-rotate-45 after:bg-foreground after:content-['']"
					/>
				)}
				<label
					htmlFor="file-input"
					className={cn(
						"flex h-11 w-[250px] cursor-pointer items-center justify-center border border-border bg-background font-montserrat text-1 font-medium",
						filename ? "text-foreground" : "text-muted-foreground",
						outline && "outline outline-1 outline-ring",
					)}
				>
					{filename ? filename : placeholder}
				</label>
				<input
					ref={inputRef}
					name="imageUrl"
					accept="image/*"
					type="file"
					id="file-input"
					required={required}
					onChange={handleUpload}
					onFocus={() => setOutline(true)}
					onBlur={() => setOutline(false)}
					className="absolute z-[3] m-0 h-11 w-[250px] cursor-pointer opacity-0"
				/>
			</div>
		</>
	);
};

export default UploadImage;
