import styled from 'styled-components'
import { MonacoEditorPropsModel } from './MonacoEditor.models'

export const MonacoEditorStyled = styled.div<Partial<MonacoEditorPropsModel>>`
  height: 100%;
  position: relative;

  button {
    position: absolute;
    top: 5px;
    right: 20px;
    z-index: 1;
  }
`