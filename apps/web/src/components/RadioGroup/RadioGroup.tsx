import { Label } from "@wear/ui/components/ui/label";
import {
	RadioGroupItem,
	RadioGroup as UiRadioGroup,
} from "@wear/ui/components/ui/radio-group";
import { cn } from "@wear/ui/lib/utils";
import type React from "react";

interface Props {
	buttons: string[];
	name: string;
	className?: string;
	legend: string;
	onChange: (value: string) => void;
	value?: string;
}

/**
 * Fielded radio set: the shadcn (radix) `RadioGroup`/`RadioGroupItem` + `Label`
 * primitives inside a native `fieldset`/`legend` (#84). The former per-button
 * `RadioButton` styled-component is folded in. Radix reports the chosen option
 * via `onValueChange(value)`, so `onChange` now takes the value string directly
 * (call sites feed it straight into `setForm`). Full width by default; wrapper
 * spacing overridable through `className`.
 */
const RadioGroup: React.FC<Props> = ({
	buttons,
	className,
	legend,
	name,
	onChange,
	value = "",
}) => {
	return (
		<fieldset
			className={cn(
				"mt-[25px] w-full rounded-md border border-input px-2 pb-2",
				className,
			)}
		>
			<legend className="px-1 text-sm font-bold text-foreground uppercase">
				{legend}
			</legend>
			<UiRadioGroup
				name={name}
				value={value}
				onValueChange={onChange}
				className="gap-0"
			>
				{buttons.map((button) => (
					<div key={button} className="flex h-11 items-center gap-3">
						<RadioGroupItem id={button} value={button} />
						<Label
							htmlFor={button}
							className="cursor-pointer text-sm text-muted-foreground uppercase"
						>
							{button}
						</Label>
					</div>
				))}
			</UiRadioGroup>
		</fieldset>
	);
};

export default RadioGroup;
