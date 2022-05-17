import { ComponentPropsWithRef } from "react";

export interface InputModel extends CommonTypes.CommonInputProps {
  
}

export interface InputPropsModel extends ComponentPropsWithRef<'input'>, Omit<InputModel, 'id'> {
  changeHandler?: (value: string, id?: string) => void;
}