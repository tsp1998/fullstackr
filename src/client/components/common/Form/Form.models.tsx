import { ComponentPropsWithRef } from 'react';
import { InputModel } from '../Input/Input.models'
import { ButtonModel } from '../Button/Button.models'

export interface FormState {
  [id: string]: {
    value: string;
    errorMessage: string;
  }
}
export interface TrimmedFormState { [id: string]: string | number | boolean }

export interface FormPropsModel extends ComponentPropsWithRef<'form'> {
  formSchema: {
    inputs: Array<InputModel & { inputComponentType?: CommonTypes.inputComponentType }>;
    buttons?: Array<ButtonModel>;
  };
  inputsContainerChildren?: JSX.Element;
  buttonsContainerChildren?: JSX.Element;
  submitHandler?: (trimmedFormState: TrimmedFormState) => Promise<boolean>;
  api?: string;
}