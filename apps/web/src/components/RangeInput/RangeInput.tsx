import { Label } from "@wear/ui/components/ui/label";
import { cn } from "@wear/ui/lib/utils";
import type React from "react";
import type { ChangeEvent } from "react";

interface Props {
	label?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	value?: number;
	name?: string;
	className?: string;
	max?: number;
	placeholder?: string;
}

/**
 * Slider + numeric readout paired to one value (#84). There is no shadcn range
 * primitive, so this stays native `<input type="range">`/`<input type="number">`
 * — both still emit real change events, keeping the `e.target.value` contract
 * the price filters read — restyled with Tailwind (`accent-primary` themes the
 * native track/thumb) instead of the old vendor-pseudo-element styled-component.
 * Full width by default; wrapper spacing overridable through `className`.
 */
const RangeInput: React.FC<Props> = ({
	label,
	value = 0,
	onChange,
	name,
	className,
	max,
	placeholder,
}) => {
	return (
		<div className={cn("mt-[25px] w-full", className)}>
			<Label
				htmlFor={label}
				className="mb-1 block cursor-pointer text-xs font-bold text-muted-foreground uppercase"
			>
				{label}
			</Label>
			<div className="flex items-center">
				<input
					name={name}
					max={max}
					id={label}
					value={value}
					onChange={onChange}
					type="range"
					className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
				/>
				<input
					type="number"
					max={max}
					onChange={onChange}
					placeholder={placeholder}
					value={value}
					className="h-9 w-15 border-0 bg-transparent text-center text-xs text-muted-foreground"
				/>
			</div>
		</div>
	);
};

export default RangeInput;
