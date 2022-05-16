import React, { FunctionComponent, useState } from 'react'
import { InputPropsModel } from './Input.models'
import * as InputStyles from './Input.styles'

const Input: FunctionComponent<InputPropsModel> = (props): JSX.Element => {
  const { initialValue = '', changeHandler = () => undefined, ...restProps } = props;
  const [value, setValue] = useState(initialValue || '');

  return (
    <InputStyles.InputStyled
      value={value}
      onChange={event => changeHandler(event.target.value, props.id)}
      {...restProps}
    />
  )
}

export default Input