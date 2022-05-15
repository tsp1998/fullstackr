import React, { ComponentPropsWithRef } from 'react'
import { ItemPropsModel } from '../Item/Item.models'

export interface ListPropsModel extends ComponentPropsWithRef<'ul'> {
  heading?: string;
  Header?: React.ElementType<any>
  HeaderJSX?: JSX.Element;
  items: Array<ListAndItemTypes.Item | JSX.Element>;
  dataPropName?: string;
  loading?: boolean;
}