import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { FormInputModel, FormState, TrimmedFormState } from '../common/Form/Form.models';
import { DataModelFormPropsModel } from './DataModelForm.models'
import * as DataModelFormStyles from './DataModelForm.styles'
//components
import Button from '../common/Button/Button';
import Form from '../common/Form/Form';
import MonacoEditor from '../Editor/MonacoEditor/MonacoEditor'

const getInputsSetForModelProp = (index: number): Array<FormInputModel> => [
  { id: `propName${index}`, placeholder: 'Name' },
  {
    id: `propDataType${index}`,
    inputComponentType: 'select',
    initialValue: 'String',
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
  const { className = '', data, setDataModelFormState = () => undefined, ...restProps } = props;
  const [inputsSets, setInputsSets] = useState<Array<Array<FormInputModel>>>([getInputsSetForModelProp(0)]);
  const formsDatas = useRef<Array<TrimmedFormState>>([])
  const [openedEditorsIndexes, setOpenedEditorsIndexes] = useState<Array<number>>([])

  const onFormStateChange = (formState: TrimmedFormState, index: number) => {
    const propName = (formState[`propName0` as keyof typeof formState] as any).value;
    const propDataType = (formState[`propDataType0` as keyof typeof formState] as any).value;
    const propRequired = (formState[`propRequired0` as keyof typeof formState] as any).value;
    const _default = (formState[`default0` as keyof typeof formState] as any).value;
    if (propName) {
      formsDatas.current[index] = { propName, propDataType, propRequired, _default }
    }
    setDataModelFormState([...formsDatas.current])
  }

  const codeEditorChangeHandler = (index: number, value: string) => {
    if (formsDatas.current[index]) {
      formsDatas.current[index]._default = value
      inputsSets[index][3].initialValue = value
      setInputsSets([...inputsSets])
      setDataModelFormState([...formsDatas.current])
    }
  }

  const addPropHandler = () => {
    setInputsSets([...inputsSets, getInputsSetForModelProp(0)])
  }

  useEffect(() => {
    const { schema = {} } = data || {}
    const inputsSets = Object.keys(schema).reduce((acc: Array<Array<FormInputModel>>, propName: string): Array<Array<FormInputModel>> => {
      const inputsSet = getInputsSetForModelProp(0);
      inputsSet[0].initialValue = propName;
      inputsSet[1].initialValue = (schema[propName] as any).type;
      inputsSet[2].initialValue = (schema[propName] as any).required;
      inputsSet[3].initialValue = (schema[propName] as any).default;
      return [...acc, inputsSet]
    }, [])
    formsDatas.current = []
    setInputsSets(inputsSets.length ? inputsSets : [getInputsSetForModelProp(0)])
  }, [data])

  const toggleEditor = (index: number) => {
    const newOpenedEditorsIndexes = openedEditorsIndexes;
    const i = newOpenedEditorsIndexes.indexOf(index)
    if (i > -1) {
      newOpenedEditorsIndexes.splice(i, 1)
    } else {
      newOpenedEditorsIndexes.push(index)
    }
    setOpenedEditorsIndexes([...newOpenedEditorsIndexes])
  }

  return (
    <DataModelFormStyles.DataModelFormStyled className='data-model-form'>
      <ul className='properties-list'>
        <li>Properties</li>
        <li>Name</li>
        <li>Type</li>
        <li>Required</li>
        <li>Value</li>
      </ul>
      {inputsSets.map((inputsSet, i) => (
        <Form
          key={i}
          formSchema={{
            inputs: inputsSet,
            buttons: [{ children: 'Open Editor', onClick: () => toggleEditor(i) }]
          }}
          onFormStateChange={formState => onFormStateChange(formState, i)}
        >
          {openedEditorsIndexes.indexOf(i) > -1 && (
            <MonacoEditor
              initialValue={formsDatas.current[i] && formsDatas.current[i]._default as string}
              syntaxValidation={false}
              changeHandler={value => codeEditorChangeHandler(i, value)}
            />
          )}
        </Form>
      ))}
      <Button onClick={addPropHandler}>Add Prop</Button>
    </DataModelFormStyles.DataModelFormStyled>
  )
}

export default DataModelForm