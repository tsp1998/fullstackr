import React, { FunctionComponent } from 'react'
import { ButtonPropsModel } from './Button.models'
import * as ButtonStyles from './Button.styles'
import Spinner from '../Loaders/Spinner'

const Button: FunctionComponent<ButtonPropsModel> = (props): JSX.Element => {
  const { className = '', text, loading = false, ...restProps } = props;
  return (
    <ButtonStyles.ButtonStyled className={`btn ${className}`} {...restProps}>
      {loading ? <Spinner /> : text as JSX.Element}
    </ButtonStyles.ButtonStyled>
  )
}

export default Button