import { ComponentPropsWithRef, MouseEvent } from "react";

export interface ButtonModel {
  text: ListAndItemTypes.Item | JSX.Element;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export interface ButtonPropsModel extends ComponentPropsWithRef<'button'>, ButtonModel {
  
}