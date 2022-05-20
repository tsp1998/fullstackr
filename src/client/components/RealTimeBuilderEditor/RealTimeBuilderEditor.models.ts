import { ComponentPropsWithRef } from "react";

export interface RealTimeBuilderEditorPropsModel extends ComponentPropsWithRef<'div'> {
  changeHandler: (value: string) => void
}