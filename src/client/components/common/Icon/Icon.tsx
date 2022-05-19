import React, { FunctionComponent } from 'react'
import { IconPropsModel } from './Icon.models'
import * as IconStyles from './Icon.styles'

const Icon: FunctionComponent<IconPropsModel> = (props): JSX.Element => {
  const { className = '', src, ...restProps } = props;
  return (
    <IconStyles.IconStyled
      className={`icon ${className}`}
      src={src}
      {...restProps}
    />
  )
}

export default Icon