import { ComponentPropsWithRef } from "react";

export interface TextareaModel extends CommonTypes.CommonInputProps {
  
}

export interface TextareaPropsModel extends ComponentPropsWithRef<'textarea'>, Omit<TextareaModel, 'id'> {
  changeHandler?: (value: string, id?: string) => void;
}