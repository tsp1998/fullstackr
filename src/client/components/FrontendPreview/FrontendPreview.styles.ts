import styled from 'styled-components'
import { FrontendPreviewPropsModel } from './FrontendPreview.models'

export const FrontendPreviewStyled = styled.div<Partial<FrontendPreviewPropsModel>>`
  padding: 1rem;

  .accordion {
    display: flex;
    flex-direction: column;
    > * {
      order: 2;
    }
    .list-get {
      order: 1;
    }
  }

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