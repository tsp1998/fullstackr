import { ComponentPropsWithRef } from "react";

export interface CardPropsModel extends ComponentPropsWithRef<'div'> {
  heading?: string | JSX.Element;
  footer?: string | JSX.Element;
}