import { createElement, ReactNode } from "react";

type Props = {
  if?: boolean;
  with: Parameters<typeof createElement>[0];
  wrapperProps: Parameters<typeof createElement>[1];
  children: NonNullable<ReactNode>;
};

export function Wrap({
  if: condition,
  with: wrapper,
  wrapperProps,
  children,
}: Props) {
  return condition ? (
    createElement(wrapper, wrapperProps, [children])
  ) : (
    <>{children}</>
  );
}
