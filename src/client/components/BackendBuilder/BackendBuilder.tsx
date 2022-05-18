import React, { FunctionComponent, useState } from 'react'
import { BackendBuilderPropsModel } from './BackendBuilder.models'
import * as BackendBuilderStyles from './BackendBuilder.styles'
//components
import BackendPreview from '../BackendPreview/BackendPreview'
import BackendSpecifier from '../BackendSpecifier/BackendSpecifier'
import { TrimmedFormState } from '../common/Form/Form.models'

const BackendBuilder: FunctionComponent<BackendBuilderPropsModel> = (props): JSX.Element => {
  const { className = '', ...restProps } = props;
  const [formState, setFormState] = useState({});
  const formStateChangeHandler = (formState: TrimmedFormState) => {
    setFormState(formState)
  }
  return (
    <BackendBuilderStyles.BackendBuilderStyled
      className={`backend-builder ${className}`}
      {...restProps}
    >
      <BackendSpecifier onFormStateChange={formStateChangeHandler} />
      <BackendPreview formState={formState} />
    </BackendBuilderStyles.BackendBuilderStyled>
  )
}

export default BackendBuilder