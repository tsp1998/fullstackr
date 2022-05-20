import React, { FunctionComponent, useEffect, useState } from 'react'
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
import Select from '../common/Select/Select'
import { OptionModel } from '../common/Select/Select.models'

const BackendBuilder: FunctionComponent<BackendBuilderPropsModel> = (props): JSX.Element => {
  const { className = '', ...restProps } = props;
  const [formState, setFormState] = useState({});
  const [selectedArtifact, setSelectedArtifact] = useState('');
  const [dataModelFormState, setDataModelFormState] = useState<Array<TrimmedFormState>>([]);
  const { data, request, errorMessage, loading, setErrorMessage } = useRequest();
  const [successMessage, setSuccessMessage] = useState('');
  const [artifacts, setArtifacts] = useState<Array<OptionModel>>([]);
  const [artifactData, setArtifactData] = useState<ArtifactData | null>(null)
  const formStateChangeHandler = (formState: TrimmedFormState) => {
    setFormState(formState)
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
    dataModelFormState.forEach(propData => {
      const { propName, propRequired, propDataType, _default } = propData || {};
      if (!propName) {
        return;
      }
      artifactData.schema[propName as string] = {
        type: propDataType,
        ...(propRequired ? { required: true } : {}),
        ...(_default ? { default: _default } : {}),
      }
    })
    setSuccessMessage('');
    setArtifactData(artifactData);
    try {
      const response = await request({
        requestType: 'post',
        requestBody: {
          api: `${API}/create-artifact${window.location.pathname}`,
          data: artifactData
        }
      })
      if (response.status === 'success') {
        setSuccessMessage('Artifact data saved successfully...')
        if (!artifacts.find(artifact => artifact.value === artifactName.value)) {
          setArtifacts([...artifacts, { text: artifactName.value, value: artifactName.value }])
        }
      }
    } catch (error) {
      console.log(`error`, error)
    }
  }

  const getArtifacts = async () => {
    try {
      const projectId = window.location.pathname.slice(1)
      const response = await request({
        requestType: 'get',
        requestBody: { api: `${API}/project/artifacts/${projectId}` }
      })
      setArtifacts((response.data as Array<string>).map(fileName => ({
        text: fileName.split('.')[0],
        value: fileName.split('.')[0],
      })))
    } catch (error) {
      console.log(`error`, error)
    }
  }

  const artifactChangeHandler = async (value: string) => {
    if (!value) {
      if (selectedArtifact === value) {
        return
      } else {
        setSelectedArtifact(value)
        return setArtifactData(null)
      }
    }
    const response = await request({
      requestType: 'get',
      requestBody: { api: `${API}/project/artifacts${window.location.pathname}/${value}`, }
    })
    setArtifactData(response.data as ArtifactData)
    setSelectedArtifact(value)
  }

  useEffect(() => {
    getArtifacts()
  }, [])

  return (
    <BackendBuilderStyles.BackendBuilderStyled
      className={`backend-builder ${className}`}
      {...restProps}
    >
      <div>
        <h2>Backend Builder</h2>
        <Select
          options={artifacts}
          id="artifact"
          defaultOptionText='New artifact'
          changeHandler={artifactChangeHandler}
          initialValue={selectedArtifact}
        />
        <BackendSpecifier
          save={save}
          onFormStateChange={formStateChangeHandler}
          setDataModelFormState={setDataModelFormState}
          artifactData={artifactData}
        />
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
      <BackendPreview formState={formState} />
    </BackendBuilderStyles.BackendBuilderStyled>
  )
}

export default BackendBuilder