import React, { FunctionComponent, useState } from 'react'
import { TextareaPropsModel } from './Textarea.models'
import * as TextareaStyles from './Textarea.styles'

const Textarea: FunctionComponent<TextareaPropsModel> = (props): JSX.Element => {
  const { initialValue = '', changeHandler = () => undefined, className = '', ...restProps } = props;
  const [value, setValue] = useState(initialValue || '');

  return (
    <TextareaStyles.TextareaStyled
      className={`Textarea ${className}`}
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

export default Textarea