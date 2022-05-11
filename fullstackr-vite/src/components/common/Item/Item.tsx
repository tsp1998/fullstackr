import React, { FunctionComponent } from 'react'
import { ItemPropsModel } from './Item.models'
import * as ItemStyles from './Item.styles'

const Item: FunctionComponent<ItemPropsModel> = (props): JSX.Element => {
  const { propName = '', className = '', ...restProps } = props;
  try {
    return (
      <ItemStyles.ItemStyled className={`item ${className}`} {...restProps}>
        {
          restProps.data[propName as keyof typeof restProps.data] ||
          restProps.data
        }
      </ItemStyles.ItemStyled>
    )
  } catch (error) {
    console.log(`error`, (error as Error).message)
    return <></>
  }
}

export default Item