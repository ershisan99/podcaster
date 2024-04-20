import {
  ComponentPropsWithoutRef,
  createElement,
  ElementType,
  ReactNode,
} from "react";

type Props<T extends ElementType> = {
  if?: boolean;
  with: T;
  wrapperProps: ComponentPropsWithoutRef<T>;
  children: NonNullable<ReactNode>;
};

export function Wrap<T extends ElementType>({
  if: condition,
  with: wrapper,
  wrapperProps,
  children,
}: Props<T>) {
  return condition ? (
    createElement(wrapper, wrapperProps, [children])
  ) : (
    <>{children}</>
  );
}
