import { Label } from "@wear/ui/components/ui/label";
import { Textarea } from "@wear/ui/components/ui/textarea";
import { cn } from "@wear/ui/lib/utils";
import type React from "react";
import type { ChangeEvent } from "react";

interface Props {
	label: string;
	placeholder: string;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	value?: string | null;
	required?: boolean;
	name?: string;
	className?: string;
}

/**
 * Labelled multi-line input: the shadcn `Textarea` + `Label` primitives (#84).
 * Stays a native `textarea` so the `useForm` `handleInput` (`target.name`/
 * `target.value`) contract keeps working unchanged. Full width by default;
 * wrapper spacing is a Tailwind default callers override through `className`.
 */
const TextArea: React.FC<Props> = ({
	value,
	onChange,
	name,
	label,
	placeholder,
	required,
	className,
}) => {
	return (
		<div className={cn("mt-[25px] w-full", className)}>
			<Label
				htmlFor={label}
				className="mb-1 block cursor-pointer text-sm font-bold text-foreground uppercase"
			>
				{label}
			</Label>
			<Textarea
				value={value || ""}
				onChange={onChange}
				name={name ? name : label}
				id={label}
				placeholder={placeholder}
				required={required}
				className="min-h-25"
			/>
		</div>
	);
};

export default TextArea;
