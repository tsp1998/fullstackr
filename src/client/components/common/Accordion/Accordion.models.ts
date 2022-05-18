import { ComponentPropsWithRef } from "react";

export interface AccordionItemModel {
  heading: string | JSX.Element;
  body: string | JSX.Element;
}

export interface AccordionPropsModel extends ComponentPropsWithRef<'ul'> {
  items: Array<AccordionItemModel>
}