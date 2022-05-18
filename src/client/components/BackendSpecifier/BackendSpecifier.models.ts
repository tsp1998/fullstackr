import { ComponentPropsWithRef } from "react";
import { TrimmedFormState } from "../common/Form/Form.models";

export interface BackendSpecifierPropsModel extends ComponentPropsWithRef<'div'> {
  onFormStateChange?: (formState: TrimmedFormState, formType: 'artifact' | 'data-model') => void;
  save: Function;
}