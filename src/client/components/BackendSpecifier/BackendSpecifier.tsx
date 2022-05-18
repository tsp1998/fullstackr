import React, { FunctionComponent } from 'react'
import { BackendSpecifierPropsModel } from './BackendSpecifier.models'
import * as BackendSpecifierStyles from './BackendSpecifier.styles'
//components
import Form from '../common/Form/Form'

const BackendSpecifier: FunctionComponent<BackendSpecifierPropsModel> = (props): JSX.Element => {
  const { className = '', ...restProps } = props;

  return (
    <BackendSpecifierStyles.BackendSpecifierStyled
      className={`backend-specifier ${className}`}
      {...restProps}
    >
      <Form
        formSchema={{
          inputs: [
            { id: 'artifactName', label: 'Artifact Name' },
            { id: 'Item-Get', type: 'checkbox', label: 'Get' },
            { id: 'Item-Post', type: 'checkbox', label: 'Post' },
            { id: 'Item-Patch', type: 'checkbox', label: 'Patch' },
            { id: 'Item-Delete', type: 'checkbox', label: 'Delete' },
            { id: 'List-Get', type: 'checkbox', label: 'Get' },
            { id: 'List-Post', type: 'checkbox', label: 'Post' },
            { id: 'List-Patch', type: 'checkbox', label: 'Patch' },
            { id: 'List-Delete', type: 'checkbox', label: 'Delete' },
          ],
          buttons: [{ text: 'Save' }]
        }}
        inputsContainerChildren={(
          <>
            <div className='item-request-types-label'>Item Request Types</div>
            <div className='list-request-types-label'>List Request Types</div>
          </>
        )}
        submitHandler={(formState) => {
          console.log(`formState`, formState)
          return Promise.resolve(true);
        }}
        onFormStateChange={props.onFormStateChange}
      />
    </BackendSpecifierStyles.BackendSpecifierStyled>
  )
}

export default BackendSpecifier