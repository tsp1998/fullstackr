import React, { FunctionComponent } from 'react'
import { SpecifierPropsModel } from './Specifier.models'
import * as SpecifierStyles from './Specifier.styles'

const Specifier: FunctionComponent<SpecifierPropsModel> = (props): JSX.Element => {
  return (
    <SpecifierStyles.SpecifierStyled>
      Hello
    </SpecifierStyles.SpecifierStyled>
  )
}

export default Specifier