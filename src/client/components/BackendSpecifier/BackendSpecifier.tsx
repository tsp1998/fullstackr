import React, { FunctionComponent, useRef } from 'react'
import * as BackendSpecifierStyles from './BackendSpecifier.styles'
//models
import { BackendSpecifierPropsModel } from './BackendSpecifier.models'
import { TrimmedFormState } from '../common/Form/Form.models'
//components
import Form from '../common/Form/Form'
import DataModelForm from '../DataModelForm/DataModelForm'
import Button from '../common/Button/Button'

const BackendSpecifier: FunctionComponent<BackendSpecifierPropsModel> = (props): JSX.Element => {
  const { className = '',  ...restProps } = props;
  const artifactName = useRef('');

  const onFormStateChange = (formState: TrimmedFormState) => {
    artifactName.current = (formState.artifactName as any).value;
    props.onFormStateChange!(formState, 'artifact')
  }

  const save = () => {
    props.save()
  }

  return (
    <BackendSpecifierStyles.BackendSpecifierStyled
      className={`backend-specifier ${className}`}
      {...restProps}
    >
      <Form
        formSchema={{
          inputs: [
            { id: 'artifactName', label: 'Artifact Name' },
            { id: 'item-get', type: 'checkbox', label: 'Get' },
            { id: 'item-post', type: 'checkbox', label: 'Post' },
            { id: 'item-patch', type: 'checkbox', label: 'Patch' },
            { id: 'item-delete', type: 'checkbox', label: 'Delete' },
            { id: 'list-get', type: 'checkbox', label: 'Get' },
            { id: 'list-post', type: 'checkbox', label: 'Post' },
            { id: 'list-patch', type: 'checkbox', label: 'Patch' },
            { id: 'list-delete', type: 'checkbox', label: 'Delete' },
          ],
        }}
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
      Data Model ({artifactName.current})
      <DataModelForm onFormStateChange={formState => props.onFormStateChange!(formState, 'data-model')} />
      <Button onClick={save}>Save</Button>
    </BackendSpecifierStyles.BackendSpecifierStyled>
  )
}

export default BackendSpecifier