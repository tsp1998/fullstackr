import styled from 'styled-components'
import { BackendBuilderPropsModel } from './BackendBuilder.models'

export const BackendBuilderStyled = styled.div<Partial<BackendBuilderPropsModel>>`
  display: flex;
  > * {
    width: 50%;
    background: #eee;
    height: 85vh;
    margin: 0 1rem;
  }
`