import { ComponentPropsWithRef } from "react";
import { TrimmedFormState } from "../common/Form/Form.models";

export interface FrontendPreviewPropsModel extends ComponentPropsWithRef<'div'> {
  formState: TrimmedFormState;
  dataModelFormState: Array<TrimmedFormState>;
}