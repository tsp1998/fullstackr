import React, { FunctionComponent } from 'react'
import { BackendPreviewPropsModel } from './BackendPreview.models'
import * as BackendPreviewStyles from './BackendPreview.styles'

const BackendPreview: FunctionComponent<BackendPreviewPropsModel> = (props): JSX.Element => {
  return (
    <BackendPreviewStyles.BackendPreviewStyled>
      Hello
    </BackendPreviewStyles.BackendPreviewStyled>
  )
}

export default BackendPreview