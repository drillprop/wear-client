import { Label } from "@wear/ui/components/ui/label";
import {
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Select as UiSelect,
} from "@wear/ui/components/ui/select";
import { cn } from "@wear/ui/lib/utils";
import type React from "react";

interface Props {
	// biome-ignore lint/suspicious/noExplicitAny: options carry enum unions (roles, genders, statuses) and plain numbers across call sites
	options?: any[];
	className?: string;
	label: string;
	placeHolder?: string;
	// biome-ignore lint/suspicious/noExplicitAny: the picked value flows straight back into enum-typed mutation vars
	onChange: (value: any) => void;
	value?: string | number | null;
	small?: boolean;
}

/**
 * Labelled dropdown: the shadcn (radix) `Select` primitive set + `Label`
 * composed with `cn()` (#84), replacing the hand-built keyboard-driven
 * combobox. Radix owns the value as a string, so numeric options are coerced to
 * strings for rendering/selection while `onChange` still hands the raw picked
 * value back to the caller. The bounded `small` prop drives the trigger size;
 * full width by default, wrapper spacing overridable through `className`.
 */
const Select: React.FC<Props> = ({
	options = [],
	className,
	label,
	placeHolder,
	value,
	onChange,
	small,
}) => {
	const selected =
		value !== undefined && value !== null && value !== ""
			? String(value)
			: undefined;

	return (
		<div className={cn("mt-[25px] w-full", className)}>
			<Label
				htmlFor={label}
				className={cn(
					"mb-1 block cursor-pointer font-bold uppercase",
					small ? "text-xs text-muted-foreground" : "text-sm text-foreground",
				)}
			>
				{label}
			</Label>
			<UiSelect value={selected} onValueChange={onChange}>
				<SelectTrigger
					id={label}
					size={small ? "sm" : "default"}
					// Match the shared `Input` height (h-11 default / h-9 small) so
					// selects and text inputs line up in the same form row; `!` beats the
					// primitive's baked `data-[size]` height.
					className={cn("w-full uppercase", small ? "h-9!" : "h-11!")}
				>
					<SelectValue placeholder={placeHolder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem
							key={String(option)}
							value={String(option)}
							className="uppercase"
						>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</UiSelect>
		</div>
	);
};

export default Select;
