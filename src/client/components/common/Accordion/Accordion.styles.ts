import styled from 'styled-components'
import { AccordionPropsModel } from './Accordion.models'

export const AccordionStyled = styled.ul<Partial<AccordionPropsModel>>`
  list-style: none;
`

export const AccordionItem = styled.li`

`

export const AccordionItemHeading = styled.div`
  display: flex;
  .icon {
    cursor: pointer;
    &.rotate {
      transform: rotate(-90deg);
    }
  }
`

export const AccordionItemBody = styled.div`

`