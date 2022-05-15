import { ComponentPropsWithRef } from "react";

export interface ItemPropsModel extends ComponentPropsWithRef<'li'> {
  data: string | number | object;
  propName?: string;
}