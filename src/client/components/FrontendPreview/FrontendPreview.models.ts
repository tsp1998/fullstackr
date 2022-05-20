import { ComponentPropsWithRef } from "react";
import { TrimmedFormState } from "../common/Form/Form.models";

export interface FrontendPreviewPropsModel extends ComponentPropsWithRef<'div'> {
  componentData: CommonTypes.ComponentDataModel | null;
}