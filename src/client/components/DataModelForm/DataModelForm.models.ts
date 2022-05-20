import { ComponentPropsWithRef } from "react";
import { ArtifactData } from "../../../common/@types/artifact.types";
import { TrimmedFormState } from "../common/Form/Form.models";
import { ComponentDataModel } from "../FrontendSpecifier/FrontendSpecifier.models";

export interface DataModelFormPropsModel extends ComponentPropsWithRef<'div'> {
  setDataModelFormState?: (formsDatas: Array<TrimmedFormState>) => void;
  data: ArtifactData | ComponentDataModel | null;
}