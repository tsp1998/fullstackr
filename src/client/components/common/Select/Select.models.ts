import { ComponentPropsWithRef } from "react";

export interface OptionModel {
  value: string;
  text: string;
}

export interface SelectModel extends CommonTypes.CommonInputProps {
  options: Array<OptionModel>;
  defaultOptionText?: string;
}

export interface SelectPropsModel extends Omit<ComponentPropsWithRef<'select'>, 'id'>, SelectModel {
  changeHandler?: (value: string, id?: string) => void;
}