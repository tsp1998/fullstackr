import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import * as BackendSpecifierStyles from './BackendSpecifier.styles'
//models
import { BackendSpecifierPropsModel } from './BackendSpecifier.models'
import { FormInputModel, TrimmedFormState } from '../common/Form/Form.models'
//components
import Form from '../common/Form/Form'
import DataModelForm from '../DataModelForm/DataModelForm'
import Button from '../common/Button/Button'

const getInputs = (artifactName: string, routesInitialValues: { [id: string]: boolean }) => [
  { id: 'artifactName', label: <h3>Artifact Name</h3>, initialValue: artifactName || '' },
  { id: 'item-get', type: 'checkbox', label: 'Get', initialValue: routesInitialValues['item-get'] },
  { id: 'item-post', type: 'checkbox', label: 'Post', initialValue: routesInitialValues['item-post'] },
  { id: 'item-patch', type: 'checkbox', label: 'Patch', initialValue: routesInitialValues['item-patch'] },
  { id: 'item-delete', type: 'checkbox', label: 'Delete', initialValue: routesInitialValues['item-delete'] },
  { id: 'list-get', type: 'checkbox', label: 'Get', initialValue: routesInitialValues['list-get'] },
  { id: 'list-post', type: 'checkbox', label: 'Post', initialValue: routesInitialValues['list-post'] },
  { id: 'list-patch', type: 'checkbox', label: 'Patch', initialValue: routesInitialValues['list-patch'] },
  { id: 'list-delete', type: 'checkbox', label: 'Delete', initialValue: routesInitialValues['list-delete'] },
]

const BackendSpecifier: FunctionComponent<BackendSpecifierPropsModel> = (props): JSX.Element => {
  const { className = '', setDataModelFormState, artifactData, ...restProps } = props;
  const artifactName = useRef('');

  const onFormStateChange = (formState: TrimmedFormState) => {
    artifactName.current = (formState.artifactName as any).value;
    props.onFormStateChange!(formState)
  }

  const save = () => {
    props.save()
  }

  const routesInitialValues: { [id: string]: boolean } = {
    'item-get': (artifactData?.itemRoutes || []).indexOf('get') > -1,
    'item-post': (artifactData?.itemRoutes || []).indexOf('post') > -1,
    'item-patch': (artifactData?.itemRoutes || []).indexOf('patch') > -1,
    'item-delete': (artifactData?.itemRoutes || []).indexOf('delete') > -1,
    'list-get': (artifactData?.listRoutes || []).indexOf('get') > -1,
    'list-post': (artifactData?.listRoutes || []).indexOf('post') > -1,
    'list-patch': (artifactData?.listRoutes || []).indexOf('patch') > -1,
    'list-delete': (artifactData?.listRoutes || []).indexOf('delete') > -1,
  }

  const [inputs, setInputs] = useState<Array<FormInputModel>>(getInputs(artifactData?.name || '', routesInitialValues))

  useEffect(() => {
    const inputs = getInputs(artifactData?.name || '', routesInitialValues);
    setInputs(inputs)
  }, [artifactData])

  return (
    <BackendSpecifierStyles.BackendSpecifierStyled
      className={`backend-specifier ${className}`}
      {...restProps}
    >
      <Form
        formSchema={{ inputs }}
        inputsContainerChildren={(
          <>
            <h3 className='item-request-types-label'>Item Request Types</h3>
            <h3 className='list-request-types-label'>List Request Types</h3>
          </>
        )}
        submitHandler={(formState) => {
          return Promise.resolve(true);
        }}
        onFormStateChange={onFormStateChange}
      />
      <h3>Data Model ({artifactName.current})</h3>
      <DataModelForm data={artifactData} setDataModelFormState={setDataModelFormState} />
      <Button onClick={save} className="save-button">Save</Button>
    </BackendSpecifierStyles.BackendSpecifierStyled>
  )
}

export default BackendSpecifier