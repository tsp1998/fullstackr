import styled from 'styled-components'
import { RealTimeBuilderPropsModel } from './RealTimeBuilder.models'

export const RealTimeBuilderStyled = styled.div<Partial<RealTimeBuilderPropsModel>>`
  display: flex;
  > * {
    width: 50%;
  }
`