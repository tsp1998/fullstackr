import styled from 'styled-components'
import { BackendPreviewPropsModel } from './BackendPreview.models'

export const BackendPreviewStyled = styled.div<Partial<BackendPreviewPropsModel>>`
  padding: 1rem;

  .accordion-item-heading-wrapper {
    width: 99%;
    display: flex;
    justify-content: space-between;
    background: lightblue;
    margin: .5rem 0;
    padding: .5rem .5rem;

    form {
      flex-direction: row;
      > * {
        margin: 0.5rem;
      }
    }
  }

  .accordion-item-body {
    display: flex;
  }

  .monaco-editor-container {
    height: 30rem;
    width: 100%;
  }
`