import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { clsx } from "clsx";

type InputProps = ComponentPropsWithoutRef<"input">;
type InputRef = ElementRef<"input">;

export const Input = forwardRef<InputRef, InputProps>(
  ({ className, ...props }, ref) => {
    const classes = clsx(
      "w-1/3 rounded-md border border-gray-300 p-2",
      className,
    );

    return <input ref={ref} className={classes} {...props} />;
  },
);
