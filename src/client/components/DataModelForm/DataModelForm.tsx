import React, { FunctionComponent, useState } from 'react'
import { FormInputModel, TrimmedFormState } from '../common/Form/Form.models';
import { DataModelFormPropsModel } from './DataModelForm.models'
import * as DataModelFormStyles from './DataModelForm.styles'
//components
import Button from '../common/Button/Button';

const getInputsSetForModelProp = (index: number): Array<FormInputModel> => [
  { id: `propName${index}`, placeholder: 'Name' },
  {
    id: `propDataType${index}`,
    inputComponentType: 'select',
    options: [
      { text: 'String', value: 'String' },
      { text: 'Number', value: 'Number' },
      { text: 'Boolean', value: 'Boolean' },
      { text: 'Array', value: 'Array' },
      { text: 'Date', value: 'Date' },
      { text: 'Buffer', value: 'Buffer' },
    ] as Array<{ text: MongooseTypes.DataType, value: MongooseTypes.DataType }>
  },
  { id: `propRequired${index}`, type: 'checkbox' },
  { id: `default${index}`, placeholder: 'Default Value' },
]

const DataModelForm: FunctionComponent<DataModelFormPropsModel> = (props): JSX.Element => {
  const [inputs, setInputs] = useState<Array<FormInputModel>>(getInputsSetForModelProp(0));
  const onFormStateChange = (formState: TrimmedFormState) => {
    props.onFormStateChange!(formState);
  }

  const addPropHandler = () => {
    setInputs([...inputs, ...getInputsSetForModelProp(inputs.length / 4)])
  }

  return (
    <DataModelFormStyles.DataModelFormStyled
      className='data-model-form'
      formSchema={{ inputs }}
      onFormStateChange={onFormStateChange}
    >
      <ul>
        <li>Properties</li>
        <li>Name</li>
        <li>Type</li>
        <li>Required</li>
        <li>Default Value</li>
      </ul>
      <Button onClick={addPropHandler}>Add Prop</Button>
    </DataModelFormStyles.DataModelFormStyled>
  )
}

export default DataModelForm