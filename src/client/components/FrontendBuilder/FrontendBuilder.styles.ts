import styled from 'styled-components'
import { FrontendBuilderPropsModel } from './FrontendBuilder.models'

export const FrontendBuilderStyled = styled.div<Partial<FrontendBuilderPropsModel>>`
  display: flex;
  h2 {
    text-align: center;
    color: darkblue;
  }
  
  > * {
    padding: 1rem;
    width: 50%;
    background: #f0eeeecc;
    height: 85vh;
    margin: 0 1rem;
    overflow-y: scroll;
  }
`