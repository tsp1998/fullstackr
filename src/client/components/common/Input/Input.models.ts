import { ComponentPropsWithRef, HTMLInputTypeAttribute } from "react";

export interface InputModel extends CommonTypes.CommonInputProps {
  type?: HTMLInputTypeAttribute;
}

export interface InputPropsModel extends ComponentPropsWithRef<'input'>, Omit<InputModel, 'id'> {
  changeHandler?: (value: string | boolean, id?: string) => void;
}