import React, { FunctionComponent, useState } from 'react'
import { DataModelFormPropsModel } from './DataModelForm.models'
import * as DataModelFormStyles from './DataModelForm.styles'

const DataModelForm: FunctionComponent<DataModelFormPropsModel> = (props): JSX.Element => {
  const [inputs, setInputs] = useState<Array<CommonTypes.CommonInputProps>>([
    { id: 'propName0' },
    { id: 'propType0' },
    { id: 'propRequired0' },
    { id: 'default0' },
  ]);
  return (
    <DataModelFormStyles.DataModelFormStyled
      className='data-model-form'
      formSchema={{ inputs }}
    >
      <ul>
        <li>Properties</li>
        <li>Name</li>
        <li>Type</li>
        <li>Required</li>
        <li>Default</li>
      </ul>
    </DataModelFormStyles.DataModelFormStyled>
  )
}

export default DataModelForm