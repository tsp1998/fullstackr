import React, { FunctionComponent } from 'react'
import { ItemPropsModel } from './Item.models'
import * as ItemStyles from './Item.styles'

const Item: FunctionComponent<ItemPropsModel> = (props): JSX.Element => {
  const { dataPropName = '', className = '', data: dataFromProps, ...restProps } = props;
  let data: ListAndItemTypes.Item | JSX.Element = '';
  try {
    data = dataFromProps[dataPropName as keyof typeof dataFromProps]
  } catch (error) {
    console.log(`error`, (error as Error).message)
  }
  data = data || dataFromProps || ''
  return data ? (
    <ItemStyles.ItemStyled className={`item ${className}`} {...restProps}>
      {data as JSX.Element}
    </ItemStyles.ItemStyled>
  ) : <></>
}

export default Item