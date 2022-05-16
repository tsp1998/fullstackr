import React, { FunctionComponent } from 'react'
import { CardPropsModel } from './Card.models'
import * as CardStyles from './Card.styles'

const Card: FunctionComponent<CardPropsModel> = (props): JSX.Element => {
  const { className = '', heading, footer, children, ...restProps } = props;
  return (
    <CardStyles.CardStyled className={`card ${className}`} {...restProps}>
      {heading && <CardStyles.CardHeader className='card-header'>{heading}</CardStyles.CardHeader>}
      <CardStyles.CardContent>{children}</CardStyles.CardContent>
      {footer && <CardStyles.CardFooter className='card-footer'>{footer}</CardStyles.CardFooter>}
    </CardStyles.CardStyled>
  )
}

export default Card