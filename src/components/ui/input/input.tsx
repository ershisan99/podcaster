import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from "react";
import { cn } from "../../../utils";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  onValueChange?: (value: string) => void;
};
type InputRef = ElementRef<"input">;

export const Input = forwardRef<InputRef, InputProps>(
  ({ className, onChange, onValueChange, ...props }, ref) => {
    const classes = cn(
      "w-full rounded-md border border-gray-300 p-2",
      className,
    );

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(e);
      onValueChange?.(e.target.value);
    }

    return (
      <input ref={ref} className={classes} onChange={handleChange} {...props} />
    );
  },
);
