import { ComponentPropsWithRef } from "react";
import { ArtifactData } from "../../../common/@types/artifact.types";
import { TrimmedFormState } from "../common/Form/Form.models";

export interface BackendSpecifierPropsModel extends ComponentPropsWithRef<'div'> {
  onFormStateChange?: (formState: TrimmedFormState) => void;
  setDataModelFormState?: (formsDatas: Array<TrimmedFormState>) => void;
  artifactData: ArtifactData | null;
  save: Function;
}