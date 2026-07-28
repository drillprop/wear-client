import { Checkbox as UiCheckbox } from "@wear/ui/components/ui/checkbox";
import { Label } from "@wear/ui/components/ui/label";
import { cn } from "@wear/ui/lib/utils";
import type React from "react";

interface Props {
	onCheckedChange?: (checked: boolean) => void;
	checked?: boolean;
	text?: string;
	id?: string;
	className?: string;
}

/**
 * Labelled checkbox: the shadcn (radix) `Checkbox` + `Label` primitives (#84).
 * The old hand-rolled hidden-input/`::after` tick is gone. Radix reports state
 * through `onCheckedChange(boolean)` rather than a native change event, so the
 * former `onChange(event)` prop becomes `onCheckedChange(checked)` — call sites
 * read the boolean directly. Wrapper spacing is overridable through `className`.
 */
const Checkbox: React.FC<Props> = ({
	onCheckedChange,
	checked = false,
	text,
	id,
	className,
}) => {
	return (
		<div className={cn("flex items-center gap-3", className)}>
			<UiCheckbox
				id={id}
				checked={checked}
				onCheckedChange={(state) => onCheckedChange?.(state === true)}
			/>
			<Label
				htmlFor={id}
				className="cursor-pointer text-sm font-bold text-foreground uppercase"
			>
				{text}
			</Label>
		</div>
	);
};

export default Checkbox;
