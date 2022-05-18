import React, { FunctionComponent } from 'react'
import { BackendPreviewPropsModel } from './BackendPreview.models'
import * as BackendPreviewStyles from './BackendPreview.styles'
//components
import Accordion from '../common/Accordion/Accordion'
import { AccordionItemModel } from '../common/Accordion/Accordion.models'
import DataModelForm from '../DataModelForm/DataModelForm'

const BackendPreview: FunctionComponent<BackendPreviewPropsModel> = (props): JSX.Element => {
  const { className = '', formState = {}, ...restProps } = props;
  const { artifactName = {}, ...restFormState } = formState;
  return (
    <BackendPreviewStyles.BackendPreviewStyled
      className={`backend-preview ${className}`}
      {...restProps}
    >
      <Accordion
        items={[
          {
            heading: `Data Model (${(artifactName as any).value})`,
            body: <DataModelForm />
          },
          ...(Object.keys(restFormState).reduce(
            (acc: Array<AccordionItemModel>, id: string): Array<AccordionItemModel> => (restFormState[id] as any).value ? [...acc, { heading: id, body: '' }] : acc,
            []))
        ]}
      />
    </BackendPreviewStyles.BackendPreviewStyled>
  )
}

export default BackendPreview