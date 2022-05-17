import React, { FunctionComponent, useState } from 'react'
import { InputPropsModel } from './Input.models'
import * as InputStyles from './Input.styles'

const Input: FunctionComponent<InputPropsModel> = (props): JSX.Element => {
  const { initialValue = '', changeHandler = () => undefined, className = '', ...restProps } = props;
  const [value, setValue] = useState(initialValue || '');

  return (
    <InputStyles.InputStyled
      className={`input ${className}`}
      value={value}
      onChange={event => {
        const { target: { value } } = event;
        setValue(value);
        changeHandler(value, props.id)
      }}
      {...restProps}
    />
  )
}

export default Input