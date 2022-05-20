import styled from 'styled-components'
import { RealTimeBuilderEditorPropsModel } from './RealTimeBuilderEditor.models'

export const RealTimeBuilderEditorStyled = styled.div<Partial<RealTimeBuilderEditorPropsModel>>`
  .monaco-editor-container {
    height: 90vh;
  }
`