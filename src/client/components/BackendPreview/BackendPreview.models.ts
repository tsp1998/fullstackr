import { ComponentPropsWithRef } from "react";
import { TrimmedFormState } from "../common/Form/Form.models";

export interface BackendPreviewPropsModel extends ComponentPropsWithRef<'div'> {
  formState: TrimmedFormState;
}