import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { FrontendPreviewPropsModel } from './FrontendPreview.models'
import * as FrontendPreviewStyles from './FrontendPreview.styles'
//constants
import { API } from '../../constants/api.constants'
//components
import Utilizer from '../Utilizer/Utilizer'

const getRouteName = (artifactName: string, id: string) => {
  const [dataType, requestType] = id.split('-') as [ListAndItemTypes.DataType, APITypes.RequestType];
  const routeName = `/${artifactName}${dataType === 'list' ? 's' : requestType !== 'post' ? `/:${artifactName}Id` : ''}`;
  return routeName;
}

const FrontendPreview: FunctionComponent<FrontendPreviewPropsModel> = (props): JSX.Element => {
  const { className = '', formState, dataModelFormState, ...restProps } = props;
  let componentData: CommonTypes.ComponentDataModel;
  try {
    componentData = {
      name: (formState.componentName as any).value,
      schema: dataModelFormState.reduce((acc, propData) => ({
        ...acc,
        [propData.propName as string]: propData._default
      }), {})
    }
  } catch (error) {
    console.log(`error`, error)
  }

  return (
    <FrontendPreviewStyles.FrontendPreviewStyled
      className={`backend-preview ${className}`}
      {...restProps}
    >
      {componentData! ? (
        <Utilizer componentData={componentData} />
      ) : (
        <h2>No Component Data / Invalid Component Data</h2>
      )}
    </FrontendPreviewStyles.FrontendPreviewStyled>
  )
}

export default FrontendPreview