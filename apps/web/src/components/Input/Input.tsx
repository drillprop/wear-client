import { Input as UiInput } from "@wear/ui/components/ui/input";
import { Label } from "@wear/ui/components/ui/label";
import { cn } from "@wear/ui/lib/utils";
import type React from "react";
import type { ChangeEvent } from "react";

interface Props {
	label: string;
	placeholder: string;
	type: string;
	icon?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	value?: string | number;
	required?: boolean;
	name?: string;
	className?: string;
	small?: boolean;
}

/**
 * Labelled text input: the shadcn `Input` + `Label` primitives composed with
 * `cn()` (#84). The old styled-components label/wrapper is gone; the boolean
 * `small` prop (a bounded on/off) drives sizing via `clsx`, and the optional
 * `icon` becomes an absolutely-positioned leading image rather than a label
 * `::before` background. Wrapper spacing is a Tailwind default (`mt-[25px]`)
 * that callers override through `className` (e.g. `mt-[50px]`, `mt-0`).
 */
const Input: React.FC<Props> = ({
	label,
	placeholder,
	icon,
	type,
	value = "",
	onChange = () => null,
	name,
	required,
	className,
	small,
}) => {
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
			<div className="relative">
				{icon && (
					<span
						aria-hidden="true"
						style={{ backgroundImage: `url(${icon})` }}
						className={cn(
							"pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 bg-contain bg-center bg-no-repeat opacity-70",
							small ? "size-4" : "size-5",
						)}
					/>
				)}
				<UiInput
					id={label}
					name={name ? name : label}
					type={type}
					placeholder={placeholder}
					required={required}
					value={value}
					onChange={onChange}
					className={cn(icon && "pl-10", !small && "h-11 text-base")}
				/>
			</div>
		</div>
	);
};

export default Input;
