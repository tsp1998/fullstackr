import { ComponentPropsWithRef } from "react";

export interface IconPropsModel extends ComponentPropsWithRef<'img'> {
  src: string;
}