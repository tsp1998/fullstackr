import styled from 'styled-components'
import { BackendBuilderPropsModel } from './BackendBuilder.models'

export const BackendBuilderStyled = styled.div<Partial<BackendBuilderPropsModel>>`
  display: flex;
  h2 {
    text-align: center;
    color: darkblue;
  }

  > * {
    width: 50%;
    background: #f0eeeecc;
    height: 85vh;
    margin: 0 1rem;
    padding: 1rem;
    overflow-y: scroll;
  }
`