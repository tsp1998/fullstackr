import React, { FunctionComponent } from 'react'
import { BackendPreviewPropsModel } from './BackendPreview.models'
import * as BackendPreviewStyles from './BackendPreview.styles'
//components
import Accordion from '../common/Accordion/Accordion'
import { AccordionItemModel } from '../common/Accordion/Accordion.models'
import { API } from '../../constants/api.constants'

const getRouteName = (artifactName: string, id: string) => {
  const [dataType, requestType] = id.split('-') as [ListAndItemTypes.DataType, APITypes.RequestType];
  const routeName = `/${artifactName}${dataType === 'list' ? 's' : requestType !== 'post' ? `/:${artifactName}Id` : ''}`;
  return routeName;
}

const BackendPreview: FunctionComponent<BackendPreviewPropsModel> = (props): JSX.Element => {
  const { className = '', formState = {}, ...restProps } = props;
  const { artifactName = {}, ...restFormState } = formState;
  const { pathname } = window.location;
  return (
    <BackendPreviewStyles.BackendPreviewStyled
      className={`backend-preview ${className}`}
      {...restProps}
    >
      <Accordion
        items={
          Object.keys(restFormState).reduce(
            (acc: Array<AccordionItemModel>, id: string): Array<AccordionItemModel> => (restFormState[id] as any).value ? [...acc, {
              heading: `${API}${pathname}${getRouteName((artifactName as any).value, id)}`,
              body: ''
            }] : acc,
            []
          )
        }
      />
    </BackendPreviewStyles.BackendPreviewStyled>
  )
}

export default BackendPreview