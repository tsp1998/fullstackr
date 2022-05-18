import React, { FunctionComponent, useState } from 'react'
//types, models
import { BackendBuilderPropsModel } from './BackendBuilder.models'
import { ArtifactData } from '../../../common/@types/artifact.types'
import * as BackendBuilderStyles from './BackendBuilder.styles'
//components
import BackendPreview from '../BackendPreview/BackendPreview'
import BackendSpecifier from '../BackendSpecifier/BackendSpecifier'
import { TrimmedFormState } from '../common/Form/Form.models'
//hooks
import useRequest from '../../hooks/useRequest'
import { API } from '../../constants/api.constants'

const BackendBuilder: FunctionComponent<BackendBuilderPropsModel> = (props): JSX.Element => {
  const { className = '', ...restProps } = props;
  const [formState, setFormState] = useState({});
  const [dataModelFormState, setDataModelFormState] = useState({});
  const { data, request, errorMessage, loading, setErrorMessage } = useRequest();
  const [successMessage, setSuccessMessage] = useState('');
  const formStateChangeHandler = (formState: TrimmedFormState, formType: 'artifact' | 'data-model') => {
    if (formType === 'artifact') {
      setFormState(formState)
    } else {
      setDataModelFormState(formState)
    }
  }

  const save = async () => {
    const { artifactName = {}, ...restFormState } = formState as any;
    if (!artifactName.value) {
      return;
    }
    const artifactData: ArtifactData = {
      name: artifactName.value,
      itemRoutes: [],
      listRoutes: [],
      schema: {}
    }
    Object.keys(restFormState).forEach(id => {
      if ((restFormState[id as keyof typeof restFormState] as any).value) {
        const [dataType, requestType] = id.split('-') as [ListAndItemTypes.DataType, APITypes.RequestType];
        artifactData[`${dataType}Routes`].push(requestType);
      }
    })
    const dataModelFormStateKeys = Object.keys(dataModelFormState);
    for (let i = 0; i < dataModelFormStateKeys.length / 4; i++) {
      const propName = (dataModelFormState[`propName${i}` as keyof typeof dataModelFormState] as any).value;
      const propDataType = (dataModelFormState[`propDataType${i}` as keyof typeof dataModelFormState] as any).value;
      const propRequired = (dataModelFormState[`propRequired${i}` as keyof typeof dataModelFormState] as any).value;
      const _default = (dataModelFormState[`default${i}` as keyof typeof dataModelFormState] as any).value;
      artifactData.schema[propName] = {
        type: propDataType,
        ...(propRequired ? { required: true } : {}),
        ...(_default ? { default: _default } : {}),
      }
    }
    setSuccessMessage('');
    try {
      const response = await request({
        requestType: 'post',
        requestBody: {
          api: `${API}/create-artifact${window.location.pathname}`,
          data: artifactData
        }
      })
      if (response) {
        setSuccessMessage('Artifact data saved successfully...')
      }
    } catch (error) {
      console.log(`error`, error)
    }
  }

  return (
    <BackendBuilderStyles.BackendBuilderStyled
      className={`backend-builder ${className}`}
      {...restProps}
    >
      <div>
        <BackendSpecifier
          save={save}
          onFormStateChange={formStateChangeHandler}
        />
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
      <BackendPreview formState={formState} />
    </BackendBuilderStyles.BackendBuilderStyled>
  )
}

export default BackendBuilder