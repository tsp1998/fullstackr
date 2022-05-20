import { ComponentPropsWithRef } from "react";
import { TrimmedFormState } from "../common/Form/Form.models";

export interface FrontendSpecifierPropsModel extends ComponentPropsWithRef<'div'> {
  onFormStateChange?: (formState: TrimmedFormState) => void;
  setDataModelFormState?: (formsDatas: Array<TrimmedFormState>) => void;
  componentData: CommonTypes.ComponentDataModel | null;
  save: Function;
}