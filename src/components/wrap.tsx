import { createElement, ReactNode } from "react";

type Props = {
  if?: boolean;
  with: (typeof createElement.arguments)[0];
  wrapperProps: (typeof createElement.arguments)[1];
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
