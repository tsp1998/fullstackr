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

  const save = async () => {
    // const { ComponentName = {}, ...restFormState } = formState as any;
    // if (!ComponentName.value) {
    //   return;
    // }
    // const ComponentData: ComponentData = {
    //   name: ComponentName.value,
    //   itemRoutes: [],
    //   listRoutes: [],
    //   schema: {}
    // }
    // Object.keys(restFormState).forEach(id => {
    //   if ((restFormState[id as keyof typeof restFormState] as any).value) {
    //     const [dataType, requestType] = id.split('-') as [ListAndItemTypes.DataType, APITypes.RequestType];
    //     ComponentData[`${dataType}Routes`].push(requestType);
    //   }
    // })
    // dataModelFormState.forEach(propData => {
    //   const { propName, propRequired, propDataType, _default } = propData || {};
    //   if (!propName) {
    //     return;
    //   }
    //   ComponentData.schema[propName as string] = {
    //     type: propDataType,
    //     ...(propRequired ? { required: true } : {}),
    //     ...(_default ? { default: _default } : {}),
    //   }
    // })
    // setSuccessMessage('');
    // setComponentData(ComponentData);
    // try {
    //   const response = await request({
    //     requestType: 'post',
    //     requestBody: {
    //       api: `${API}/create-Component${window.location.pathname}`,
    //       data: ComponentData
    //     }
    //   })
    //   if (response.status === 'success') {
    //     setSuccessMessage('Component data saved successfully...')
    //     if (!Components.find(Component => Component.value === ComponentName.value)) {
    //       setComponents([...Components, { text: ComponentName.value, value: ComponentName.value }])
    //     }
    //   }
    // } catch (error) {
    //   console.log(`error`, error)
    // }
  }

  const getComponents = async () => {
    try {
      // const projectId = window.location.pathname.slice(1)
      // const response = await request({
      //   requestType: 'get',
      //   requestBody: { api: `${API}/project/Components/${projectId}` }
      // })
      // setComponents((response.data as Array<string>).map(fileName => ({
      //   text: fileName.split('.')[0],
      //   value: fileName.split('.')[0],
      // })))
    } catch (error) {
      console.log(`error`, error)
    }
  }

  const ComponentChangeHandler = async (value: string) => {
    // if (!value) {
    //   if (selectedComponent === value) {
    //     return
    //   } else {
    //     setSelectedComponent(value)
    //     return setComponentData(null)
    //   }
    // }
    // const response = await request({
    //   requestType: 'get',
    //   requestBody: { api: `${API}/project/Components${window.location.pathname}/${value}`, }
    // })
    // setComponentData(response.data as ComponentData)
    // setSelectedComponent(value)
  }

  useEffect(() => {
    getComponents()
  }, [])

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

  useEffect(() => {
    const componentData = buildComponentData()
    setComponentData(componentData)
  }, [formState, dataModelFormState])

  return (
    <FrontendBuilderStyles.FrontendBuilderStyled
      className={`backend-builder ${className}`}
      {...restProps}
    >
      <div>
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
          componentData={null}
        />
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      </div>
      <FrontendPreview componentData={componentData} />
    </FrontendBuilderStyles.FrontendBuilderStyled>
  )
}

export default FrontendBuilder