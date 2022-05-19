import { ComponentPropsWithRef, HTMLInputTypeAttribute } from 'react';
import { ButtonModel } from '../Button/Button.models'
import { OptionModel } from '../Select/Select.models';

export interface FormState {
  [id: string]: {
    value: string;
    errorMessage: string;
  }
}
export interface TrimmedFormState { [id: string]: string | number | boolean }
export type FormInputModel = CommonTypes.CommonInputProps & {
  inputComponentType?: CommonTypes.inputComponentType;
  options?: Array<OptionModel>;
  type?: HTMLInputTypeAttribute;
}

export interface FormPropsModel extends ComponentPropsWithRef<'form'> {
  formId?: string;
  formSchema: {
    inputs: Array<FormInputModel>;
    buttons?: Array<ButtonModel>;
  };
  inputsContainerChildren?: JSX.Element;
  buttonsContainerChildren?: JSX.Element;
  submitHandler?: (trimmedFormState: TrimmedFormState) => Promise<boolean>;
  api?: string;
  onApiTrigger?: (apiRequest: Promise<APITypes.ResponseDataType | null>) => void;
  onFormStateChange?: (trimmedFormState: TrimmedFormState) => void;
  defaultSuccessMessage?: string;
  defaultErrorMessage?: string;
  wantMessage?: boolean;
}