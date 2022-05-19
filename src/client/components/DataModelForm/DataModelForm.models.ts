import { ComponentPropsWithRef } from "react";
import { ArtifactData } from "../../../common/@types/artifact.types";
import { TrimmedFormState } from "../common/Form/Form.models";

export interface DataModelFormPropsModel extends ComponentPropsWithRef<'div'> {
  setDataModelFormState?: (formsDatas: Array<TrimmedFormState>) => void;
  artifactData: ArtifactData | null;
}