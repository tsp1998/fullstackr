import { ComponentPropsWithRef } from "react";

export interface ItemPropsModel extends ComponentPropsWithRef<'li'> {
  data: ListAndItemTypes.Item | JSX.Element;
  dataPropName?: string;
}