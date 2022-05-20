import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
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

const FrontendSpecifier: FunctionComponent<FrontendSpecifierPropsModel> = (props): JSX.Element => {
  const { className = '', setDataModelFormState, componentData, ...restProps } = props;

  const onFormStateChange = (formState: TrimmedFormState) => {
    props.onFormStateChange!(formState)
  }

  const save = () => {
    props.save()
  }

  const [inputs, setInputs] = useState<Array<FormInputModel>>([
    {
      id: 'componentName',
      label: 'Component Name',
      inputComponentType: 'select',
      options: [
        { text: 'Select Component', value: '' },
        ...commonComponentNames.map(componentName => ({
          text: componentName, value: componentName
        }))
      ]
    }
  ])

  // useEffect(() => {
  //   const inputs = getInputs(data?.name || '', routesInitialValues);
  //   setInputs(inputs)
  // }, [data])

  return (
    <FrontendSpecifierStyles.FrontendSpecifierStyled
      className={`backend-specifier ${className}`}
      {...restProps}
    >
      <Form
        formSchema={{ inputs }}
        inputsContainerChildren={(
          <>
            <div className='item-request-types-label'>Item Request Types</div>
            <div className='list-request-types-label'>List Request Types</div>
          </>
        )}
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