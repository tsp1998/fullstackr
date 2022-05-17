import React, { FunctionComponent, useEffect, useState } from 'react'
import { SelectPropsModel } from './Select.models'
import * as SelectStyles from './Select.styles'

const Select: FunctionComponent<SelectPropsModel> = (props): JSX.Element => {
  const {
    options = [],
    defaultOptionText,
    initialValue,
    className = '',
    changeHandler = () => undefined,
    ...restProps
  } = props;
  const [value, setValue] = useState(initialValue || '');
  useEffect(() => {
    if (!value && !defaultOptionText) {
      const { value } = options[0]
      setValue(value);
      changeHandler(value, props.id)
    }
  }, [])
  return (
    <SelectStyles.SelectStyled
      className={`select ${className}`}
      value={value}
      onChange={event => {
        const { target: { value } } = event;
        setValue(value);
        changeHandler(value, props.id)
      }}
      {...restProps}
    >
      {defaultOptionText && (
        <SelectStyles.Option value="">
          {defaultOptionText}
        </SelectStyles.Option>
      )}
      {options.map(option => (
        <SelectStyles.Option key={option.value} value={option.value}>
          {option.text}
        </SelectStyles.Option>
      ))}
    </SelectStyles.SelectStyled>
  )
}

export default Select