import React, { FunctionComponent, useEffect, useState } from 'react'
import * as FrontendBuilderStyles from './FrontendBuilder.styles'
//types, models
import { FrontendBuilderPropsModel } from './FrontendBuilder.models'
import { TrimmedFormState } from '../common/Form/Form.models'
import { OptionModel } from '../common/Select/Select.models'
//components
import FrontendSpecifier from '../FrontendSpecifier/FrontendSpecifier'
import FrontendPreview from '../FrontendPreview/FrontendPreview'
import Select from '../common/Select/Select'
//hooks
import useRequest from '../../hooks/useRequest'
import { API } from '../../constants/api.constants'

const FrontendBuilder: FunctionComponent<FrontendBuilderPropsModel> = (props): JSX.Element => {
  const { className = '', ...restProps } = props;
  const [formState, setFormState] = useState({});
  const [selectedComponent, setSelectedComponent] = useState('');
  const [dataModelFormState, setDataModelFormState] = useState<Array<TrimmedFormState>>([]);
  const { data, request, errorMessage, loading, setErrorMessage } = useRequest();
  const [successMessage, setSuccessMessage] = useState('');
  const [components, setComponents] = useState<Array<OptionModel>>([]);
  const [componentData, setComponentData] = useState<CommonTypes.ComponentDataModel | null>(null)

  const formStateChangeHandler = (formState: TrimmedFormState) => {
    setFormState(formState)
  }

  const buildComponentData = (): CommonTypes.ComponentDataModel | null => {
    try {
      const { componentName = {} } = (formState || {}) as any;
      if (!componentName.value) {
        return null;
      }
      const componentData: CommonTypes.ComponentDataModel = {
        name: componentName.value,
        schema: {}
      };
      (dataModelFormState || []).forEach(propData => {
        if (propData.propName) {
          componentData.schema[propData.propName as string] = propData._default
        }
      })
      return componentData;
    } catch (error) {
      console.log(`error`, error)
    }
    return null
  }

  const save = async () => {
    const { componentNameToStore = {} } = formState as any;
    if (!componentNameToStore.value) {
      return;
    }
    const componentData = buildComponentData();
    if (!componentData) {
      return;
    }
    setSuccessMessage('');
    try {
      const response = await request({
        requestType: 'post',
        requestBody: {
          api: `${API}/create-component${window.location.pathname}`,
          data: { componentNameToStore: componentNameToStore.value, componentData }
        }
      })
      if (response.status === 'success') {
        setSuccessMessage('Component data saved successfully...')
        if (!components.find(component => component.value === componentNameToStore.value)) {
          setComponents([...components, {
            text: componentNameToStore.value, value: componentNameToStore.value
          }])
        }
      }
    } catch (error) {
      console.log(`error`, error)
    }
  }

  const getComponents = async () => {
    try {
      const projectId = window.location.pathname.slice(1)
      const response = await request({
        requestType: 'get',
        requestBody: { api: `${API}/project/components/${projectId}` }
      })
      setComponents((response.data as Array<string>).map(fileName => ({
        text: fileName.split('.')[0],
        value: fileName.split('.')[0],
      })))
    } catch (error) {
      console.log(`error`, error)
    }
  }

  const ComponentChangeHandler = async (value: string) => {
    if (!value) {
      if (selectedComponent === value) {
        return
      } else {
        setSelectedComponent(value)
        return setComponentData(null)
      }
    }
    const response = await request({
      requestType: 'get',
      requestBody: { api: `${API}/project/components${window.location.pathname}/${value}`, }
    })
    setComponentData(response.data as CommonTypes.ComponentDataModel)
    setSelectedComponent(value)
  }

  useEffect(() => {
    getComponents()
  }, [])

  return (
    <FrontendBuilderStyles.FrontendBuilderStyled
      className={`backend-builder ${className}`}
      {...restProps}
    >
      <div>
        <h2>Frontend Builder</h2>
        <Select
          options={components}
          id="component"
          defaultOptionText='New Component'
          changeHandler={ComponentChangeHandler}
          initialValue={selectedComponent}
        />
        <FrontendSpecifier
          save={save}
          onFormStateChange={formStateChangeHandler}
          setDataModelFormState={setDataModelFormState}
          componentData={componentData}
          componentNameToStore={selectedComponent}
        />
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
      <FrontendPreview formState={formState} dataModelFormState={dataModelFormState} />
    </FrontendBuilderStyles.FrontendBuilderStyled>
  )
}

export default FrontendBuilder