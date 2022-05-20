import { ComponentPropsWithRef } from "react";

export interface RealTimeBuilderPreviewPropsModel extends ComponentPropsWithRef<'div'> {
  errorMessage: string;
  code: string;
}