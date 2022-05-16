import { ComponentPropsWithRef } from "react";

export interface ButtonModel {
  text: ListAndItemTypes.Item | JSX.Element;
  loading?: boolean;
}

export interface ButtonPropsModel extends ComponentPropsWithRef<'button'>, ButtonModel {
  
}