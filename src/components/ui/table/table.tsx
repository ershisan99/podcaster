import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { clsx } from "clsx";

export const Table = forwardRef<
  HTMLTableElement,
  ComponentPropsWithoutRef<"table">
>(({ className, ...rest }, ref) => {
  const classes = clsx(className, "w-full border-collapse");

  return <table className={classes} {...rest} ref={ref} />;
});
export const TableHead = forwardRef<
  ElementRef<"thead">,
  ComponentPropsWithoutRef<"thead">
>(({ ...rest }, ref) => {
  return <thead {...rest} ref={ref} />;
});

export const TableBody = forwardRef<
  ElementRef<"tbody">,
  ComponentPropsWithoutRef<"tbody">
>(({ ...rest }, ref) => {
  return <tbody {...rest} ref={ref} />;
});

export const TableRow = forwardRef<
  ElementRef<"tr">,
  ComponentPropsWithoutRef<"tr">
>(({ className, ...rest }, ref) => {
  const classes = clsx(className, "odd:bg-gray-100");
  return <tr className={classes} {...rest} ref={ref} />;
});

export const TableHeadCell = forwardRef<
  ElementRef<"th">,
  ComponentPropsWithoutRef<"th">
>(({ children, className, ...rest }, ref) => {
  const classes = clsx(className, "py-3 px-4 text-start");

  return (
    <th className={classes} {...rest} ref={ref}>
      <span>{children}</span>
    </th>
  );
});

export const TableCell = forwardRef<
  ElementRef<"td">,
  ComponentPropsWithoutRef<"td">
>(({ className, ...rest }, ref) => {
  const classes = clsx(className, "py-3 px-4 border-t border-slate-200");

  return <td className={classes} {...rest} ref={ref} />;
});
