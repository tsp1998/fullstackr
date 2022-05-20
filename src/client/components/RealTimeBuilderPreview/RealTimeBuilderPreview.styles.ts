import styled from 'styled-components'
import { RealTimeBuilderPreviewPropsModel } from './RealTimeBuilderPreview.models'

export const RealTimeBuilderPreviewStyled = styled.div<Partial<RealTimeBuilderPreviewPropsModel>>`
  iframe {
    height: 100%;
    width: 100%;
  }
`