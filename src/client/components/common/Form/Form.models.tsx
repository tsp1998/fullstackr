import { ComponentPropsWithRef } from 'react';
import { InputModel } from '../Input/Input.models'
import { ButtonModel } from '../Button/Button.models'
import { OptionModel } from '../Select/Select.models';
import { TextareaModel } from '../Textarea/Textarea.models';

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
      options?: Array<OptionModel>
    }>;
    buttons?: Array<ButtonModel>;
  };
  inputsContainerChildren?: JSX.Element;
  buttonsContainerChildren?: JSX.Element;
  submitHandler?: (trimmedFormState: TrimmedFormState) => Promise<boolean>;
  api?: string;
}