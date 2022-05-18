import React, { ChangeEvent, ChangeEventHandler, FunctionComponent, useState } from 'react'
import { useEffect } from 'react';
import { InputPropsModel } from './Input.models'
import * as InputStyles from './Input.styles'

const Input: FunctionComponent<InputPropsModel> = (props): JSX.Element => {
  const { initialValue, type = 'text', changeHandler = () => undefined, className = '', ...restProps } = props;
  const iv: boolean | string = initialValue || type === 'checkbox' ? false : '';
  const [value, setValue] = useState<boolean | string>(iv);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: boolean | string;
    const { target } = event;
    if (type === 'checkbox') {
      value = target.checked;
    } else {
      value = target.value;
    }
    setValue(value);
    changeHandler(value, props.id)
  }

  useEffect(() => {
    changeHandler(value, props.id)
  }, [])

  const propByType = type === 'checkbox' ? { checked: value } : { value }

  return (
    //@ts-ignore
    <InputStyles.InputStyled
      className={`input ${className}`}
      onChange={onChange}
      type={type}
      {...propByType}
      {...restProps}
    />
  )
}

export default Input