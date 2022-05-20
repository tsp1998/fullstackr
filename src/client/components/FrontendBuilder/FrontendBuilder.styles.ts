import styled from 'styled-components'
import { FrontendBuilderPropsModel } from './FrontendBuilder.models'

export const FrontendBuilderStyled = styled.div<Partial<FrontendBuilderPropsModel>>`
  display: flex;
  > * {
    width: 50%;
    background: #eee;
    height: 85vh;
    margin: 0 1rem;
  }
`