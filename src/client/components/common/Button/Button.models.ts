import { ComponentPropsWithRef, MouseEvent } from "react";

export interface ButtonModel {
  children: string | JSX.Element;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'submit' | 'reset' | 'button';
}

export interface ButtonPropsModel extends Omit<ComponentPropsWithRef<'button'>, 'children'>, ButtonModel {
  
}