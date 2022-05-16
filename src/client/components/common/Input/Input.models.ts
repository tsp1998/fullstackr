import { ComponentPropsWithRef } from "react";

export interface InputModel {
  initialValue?: string;
  id: string;
  label?: string | JSX.Element;
}

export interface InputPropsModel extends ComponentPropsWithRef<'input'>, Omit<InputModel, 'id'> {
  changeHandler?: (value: string, id?: string) => void;
}