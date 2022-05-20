import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'
import * as FrontendSpecifierStyles from './FrontendSpecifier.styles'
//models
import { FrontendSpecifierPropsModel } from './FrontendSpecifier.models'
import { FormInputModel, TrimmedFormState } from '../common/Form/Form.models'
//components
import Form from '../common/Form/Form'
import DataModelForm from '../DataModelForm/DataModelForm'
import Button from '../common/Button/Button'

const commonComponentNames = [
  'Accordion', 'Button', 'Card', 'Form', 'Icon', 'Input', 'Item', 'List', 'ListWithFetch', 'Spinner', 'Modal', 'BackDrop', 'ModalContainer', 'Select', 'Table', 'Textarea',
]

const getInputs = (componentNameToStore: string, componentName: string): Array<FormInputModel> => [
  {
    id: 'componentName',
    label: 'Component Name',
    inputComponentType: 'select',
    initialValue: componentName || '',
    options: [
      { text: 'Select Component', value: '' },
      ...commonComponentNames.map(componentName => ({
        text: componentName, value: componentName
      }))
    ]
  },
  { id: 'componentNameToStore', label: 'Component Name (To Store)', initialValue: componentNameToStore || '' }
]

const FrontendSpecifier: FunctionComponent<FrontendSpecifierPropsModel> = (props): JSX.Element => {
  const {
    className = '',
    setDataModelFormState,
    componentData,
    componentNameToStore,
    ...restProps
  } = props;


  const onFormStateChange = (formState: TrimmedFormState) => {
    props.onFormStateChange!(formState)
  }

  const save = () => {
    props.save()
  }

  const [inputs, setInputs] = useState<Array<FormInputModel>>(
    getInputs(componentNameToStore || '', componentData ? componentData.name : '')
  )
  
  useEffect(() => {
    const newInputs = getInputs(componentNameToStore || '', componentData ? componentData.name : '');
    setInputs(newInputs)
  }, [componentData])

  return (
    <FrontendSpecifierStyles.FrontendSpecifierStyled
      className={`backend-specifier ${className}`}
      {...restProps}
    >
      <Form
        formSchema={{ inputs }}
        submitHandler={(formState) => {
          return Promise.resolve(true);
        }}
        onFormStateChange={onFormStateChange}
      />
      <DataModelForm data={componentData} setDataModelFormState={setDataModelFormState} />
      <Button onClick={save}>Save</Button>
    </FrontendSpecifierStyles.FrontendSpecifierStyled>
  )
}

export default FrontendSpecifier