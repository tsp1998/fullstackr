import React, { FunctionComponent } from 'react'
import { BackendSpecifierPropsModel } from './BackendSpecifier.models'
import * as BackendSpecifierStyles from './BackendSpecifier.styles'
//components
import Form from '../common/Form/Form'

const BackendSpecifier: FunctionComponent<BackendSpecifierPropsModel> = (props): JSX.Element => {
  return (
    <BackendSpecifierStyles.BackendSpecifierStyled>
      <Form
        formSchema={{
          inputs: [
            { id: 'artifactName', label: 'Artifact Name' },
            { id: 'itemGet', type: 'checkbox', label: 'Get' },
            { id: 'itemPost', type: 'checkbox', label: 'Post' },
            { id: 'itemPatch', type: 'checkbox', label: 'Patch' },
            { id: 'itemDelete', type: 'checkbox', label: 'Delete' },
            { id: 'listGet', type: 'checkbox', label: 'Get' },
            { id: 'listPost', type: 'checkbox', label: 'Post' },
            { id: 'listPatch', type: 'checkbox', label: 'Patch' },
            { id: 'listDelete', type: 'checkbox', label: 'Delete' },
          ],
          buttons: [{ text: 'Create' }]
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
      />
    </BackendSpecifierStyles.BackendSpecifierStyled>
  )
}

export default BackendSpecifier