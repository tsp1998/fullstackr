import { TrimmedFormState } from "../common/Form/Form.models";

export interface DataModelFormPropsModel {
  onFormStateChange?: (formState: TrimmedFormState) => void;
}