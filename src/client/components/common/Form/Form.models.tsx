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

export interface FormPropsModel extends ComponentPropsWithRef<'form'> {
  formSchema: {
    inputs: Array<CommonTypes.CommonInputProps & {
      inputComponentType?: CommonTypes.inputComponentType;
      options?: Array<OptionModel>;
      type?: HTMLInputTypeAttribute;
    }>;
    buttons?: Array<ButtonModel>;
  };
  inputsContainerChildren?: JSX.Element;
  buttonsContainerChildren?: JSX.Element;
  submitHandler?: (trimmedFormState: TrimmedFormState) => Promise<boolean>;
  api?: string;
  onFormStateChange?: (trimmedFormState: TrimmedFormState) => void;
}