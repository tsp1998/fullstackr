import { ComponentPropsWithRef } from "react";

export interface TablePropsModel extends ComponentPropsWithRef<'table'> {
  rows: Array<Array<ListAndItemTypes.Item | JSX.Element>>;
  headingRows?: Array<Array<ListAndItemTypes.Item | JSX.Element>>;
}