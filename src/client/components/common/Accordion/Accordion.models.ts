import { ComponentPropsWithRef } from "react";

export interface AccordionItemModel {
  heading: string | JSX.Element;
  body: string | JSX.Element;
  className?: string;
}

export interface AccordionPropsModel extends ComponentPropsWithRef<'ul'> {
  items: Array<AccordionItemModel>;
  expanedItemIndex?: number;
  noOtherCollapse?: boolean;
}